const PERF_DEBUG_QUERY_KEY = 'perfDebug';
const PERF_DEBUG_STORAGE_KEY = 'gondola:perfDebug';
const IMAGE_EXTENSION_PATTERN = /\.(avif|webp|png|jpe?g|gif|svg)(?:$|[?#])/i;
const SLOW_IMAGE_DURATION_MS = 250;
const LATE_IMAGE_DISCOVERY_MS = 250;
const LAYOUT_SHIFT_ENTRY_WARN_THRESHOLD = 0.02;
const TOTAL_CLS_WARN_THRESHOLD = 0.1;
const INIT_FLAG = '__GONDOLA_IMAGE_PERF_DIAGNOSTICS_INIT__';

const round = (value, digits = 1) => {
  if (typeof value !== 'number' || Number.isNaN(value)) {
    return 0;
  }
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
};

const normalizeUrl = (url) => {
  if (!url) {
    return '';
  }
  try {
    const parsed = new URL(url, window.location.href);
    return `${parsed.origin}${parsed.pathname}${parsed.search}`;
  } catch (error) {
    return String(url);
  }
};

const shortUrl = (url) => {
  if (!url) {
    return '';
  }
  try {
    const parsed = new URL(url, window.location.href);
    if (parsed.origin === window.location.origin) {
      return `${parsed.pathname}${parsed.search}`;
    }
    return `${parsed.hostname}${parsed.pathname}${parsed.search}`;
  } catch (error) {
    return String(url);
  }
};

const isImageResource = (resourceName, initiatorType) => {
  if (!resourceName || resourceName.startsWith('data:image/')) {
    return false;
  }
  if (initiatorType === 'img') {
    return true;
  }
  return IMAGE_EXTENSION_PATTERN.test(resourceName);
};

const toElementLabel = (element) => {
  if (!element || !element.tagName) {
    return 'unknown';
  }

  const tag = element.tagName.toLowerCase();
  const id = element.id ? `#${element.id}` : '';
  const classNames = String(element.className || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  const classLabel = classNames.length ? `.${classNames.join('.')}` : '';

  return `${tag}${id}${classLabel}`;
};

const isPerfDebugEnabled = () => {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const query = new URLSearchParams(window.location.search).get(PERF_DEBUG_QUERY_KEY);
    if (query === '1') {
      window.localStorage.setItem(PERF_DEBUG_STORAGE_KEY, '1');
      return true;
    }
    if (query === '0') {
      window.localStorage.removeItem(PERF_DEBUG_STORAGE_KEY);
      return false;
    }
    return window.localStorage.getItem(PERF_DEBUG_STORAGE_KEY) === '1';
  } catch (error) {
    return false;
  }
};

const initImagePerfDiagnostics = ({ enabled = isPerfDebugEnabled() } = {}) => {
  if (!enabled || typeof window === 'undefined' || typeof performance === 'undefined') {
    return;
  }

  if (window[INIT_FLAG]) {
    return;
  }
  window[INIT_FLAG] = true;

  const resourceByUrl = new Map();
  let cumulativeLayoutShift = 0;
  let finalLcpEntry = null;

  const storeResourceEntry = (entry) => {
    if (!isImageResource(entry.name, entry.initiatorType)) {
      return;
    }

    const normalized = normalizeUrl(entry.name);
    const resource = {
      url: normalized,
      shortUrl: shortUrl(normalized),
      initiatorType: entry.initiatorType || 'unknown',
      startMs: round(entry.startTime),
      responseStartMs: round(entry.responseStart || 0),
      endMs: round(entry.responseEnd || 0),
      durationMs: round(entry.duration || 0),
      transferKB: round((entry.transferSize || 0) / 1024, 2),
      encodedKB: round((entry.encodedBodySize || 0) / 1024, 2),
      decodedKB: round((entry.decodedBodySize || 0) / 1024, 2),
      fromCache: (entry.transferSize || 0) === 0 && (entry.decodedBodySize || 0) > 0,
      protocol: entry.nextHopProtocol || 'unknown',
    };

    resourceByUrl.set(normalized, resource);
  };

  const onImageElementLoad = (event) => {
    const element = event.target;
    if (!(element instanceof HTMLImageElement)) {
      return;
    }

    const currentSrc = normalizeUrl(element.currentSrc || element.src);
    const resource = resourceByUrl.get(currentSrc);
    const renderedRect = element.getBoundingClientRect();
    const payload = {
      src: shortUrl(currentSrc),
      element: toElementLabel(element),
      loading: element.loading || 'eager',
      fetchPriority: element.fetchPriority || 'auto',
      decoding: element.decoding || 'auto',
      completeAtMs: round(performance.now()),
      natural: `${element.naturalWidth}x${element.naturalHeight}`,
      rendered: `${round(renderedRect.width)}x${round(renderedRect.height)}`,
      resource,
    };

    if (resource && resource.durationMs >= SLOW_IMAGE_DURATION_MS) {
      console.warn('[perf:image-load:slow]', payload);
      return;
    }

    console.info('[perf:image-load]', payload);
  };

  const onImageElementError = (event) => {
    const element = event.target;
    if (!(element instanceof HTMLImageElement)) {
      return;
    }
    console.error('[perf:image-load:error]', {
      src: shortUrl(normalizeUrl(element.currentSrc || element.src)),
      element: toElementLabel(element),
      loading: element.loading || 'eager',
      fetchPriority: element.fetchPriority || 'auto',
      decoding: element.decoding || 'auto',
      atMs: round(performance.now()),
    });
  };

  const resourceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach(storeResourceEntry);
  });
  resourceObserver.observe({ type: 'resource', buffered: true });
  performance.getEntriesByType('resource').forEach(storeResourceEntry);

  const lcpObserver = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    if (entries.length > 0) {
      finalLcpEntry = entries[entries.length - 1];
    }
  });
  lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

  const clsObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.hadRecentInput) {
        return;
      }

      cumulativeLayoutShift += entry.value;

      if (entry.value < LAYOUT_SHIFT_ENTRY_WARN_THRESHOLD) {
        return;
      }

      const sources = (entry.sources || [])
        .map((source) => {
          if (!source || !source.node) {
            return 'unknown';
          }

          if (source.node instanceof HTMLImageElement) {
            return `img:${shortUrl(normalizeUrl(source.node.currentSrc || source.node.src))}`;
          }

          return toElementLabel(source.node);
        })
        .slice(0, 3);

      console.warn('[perf:layout-shift]', {
        shiftValue: round(entry.value, 4),
        cumulative: round(cumulativeLayoutShift, 4),
        startMs: round(entry.startTime),
        sources,
      });
    });
  });
  clsObserver.observe({ type: 'layout-shift', buffered: true });

  document.addEventListener('load', onImageElementLoad, true);
  document.addEventListener('error', onImageElementError, true);

  const printSummary = () => {
    const resources = Array.from(resourceByUrl.values());
    const sortedByDuration = [...resources].sort((a, b) => b.durationMs - a.durationMs);
    const slowImages = sortedByDuration.filter((resource) => resource.durationMs >= SLOW_IMAGE_DURATION_MS);
    const lateDiscovered = resources
      .filter((resource) => resource.startMs >= LATE_IMAGE_DISCOVERY_MS)
      .sort((a, b) => b.startMs - a.startMs);

    console.groupCollapsed(
      `[perf:image-summary] total=${resources.length} slow=${slowImages.length} late=${lateDiscovered.length} cls=${round(cumulativeLayoutShift, 4)}`
    );
    console.table(sortedByDuration.slice(0, 25));

    if (lateDiscovered.length > 0) {
      console.info('[perf:image-summary:late-discovery]', lateDiscovered.slice(0, 25));
    }

    if (finalLcpEntry) {
      const lcpElement = finalLcpEntry.element;
      const lcpSrc =
        lcpElement && lcpElement instanceof HTMLImageElement
          ? normalizeUrl(lcpElement.currentSrc || lcpElement.src)
          : '';
      const lcpResource = lcpSrc ? resourceByUrl.get(lcpSrc) : null;
      const lcpPayload = {
        valueMs: round(finalLcpEntry.startTime),
        size: round(finalLcpEntry.size),
        element: toElementLabel(lcpElement),
        src: shortUrl(lcpSrc),
        resource: lcpResource || null,
      };

      if (lcpResource && lcpResource.startMs >= LATE_IMAGE_DISCOVERY_MS) {
        console.warn('[perf:lcp:late-discovery]', lcpPayload);
      } else {
        console.info('[perf:lcp]', lcpPayload);
      }
    }

    if (cumulativeLayoutShift >= TOTAL_CLS_WARN_THRESHOLD) {
      console.warn('[perf:cls:high]', {
        cumulativeLayoutShift: round(cumulativeLayoutShift, 4),
        threshold: TOTAL_CLS_WARN_THRESHOLD,
      });
    } else {
      console.info('[perf:cls]', { cumulativeLayoutShift: round(cumulativeLayoutShift, 4) });
    }
    console.groupEnd();
  };

  window.addEventListener(
    'load',
    () => {
      setTimeout(printSummary, 0);
    },
    { once: true }
  );

  window.addEventListener(
    'pagehide',
    () => {
      printSummary();
      resourceObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      document.removeEventListener('load', onImageElementLoad, true);
      document.removeEventListener('error', onImageElementError, true);
    },
    { once: true }
  );

  console.info('[perf] image diagnostics enabled', {
    enableParam: `?${PERF_DEBUG_QUERY_KEY}=1`,
    disableParam: `?${PERF_DEBUG_QUERY_KEY}=0`,
  });
};

// Self-initialize when perf debugging is enabled via ?perfDebug=1 (or stored flag).
if (typeof window !== 'undefined' && isPerfDebugEnabled()) {
  initImagePerfDiagnostics({ enabled: true });
}
