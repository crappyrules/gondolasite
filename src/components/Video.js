import React, { useRef, useEffect, useState } from 'react';
import gondolavid from '../assets/gondolavid.mp4';
import play from '../assets/play.png';

function Video() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) {
            return;
        }

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setShouldLoadVideo(true);
                    setIsInView(true);
                } else {
                    setIsInView(false);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        observer.observe(videoElement);

        return () => {
            observer.unobserve(videoElement);
        };
    }, []);

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement || !shouldLoadVideo) {
            return;
        }

        if (isInView) {
            videoElement.muted = false;
            videoElement.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error('Autoplay failed:', error);
                setIsPlaying(false);
            });
        } else {
            videoElement.muted = true;
            videoElement.pause();
            setIsPlaying(false);
        }
    }, [isInView, shouldLoadVideo]);

    const handlePlayButtonClick = () => {
        const videoElement = videoRef.current;
        setShouldLoadVideo(true);
        videoElement.muted = false;
        videoElement.play().then(() => {
            setIsPlaying(true);
        }).catch(error => {
            console.error('Play button failed:', error);
        });
    };

    return (
        <div className='lg:absolute z-10 flex justify-center items-center'>
            <video
                ref={videoRef}
                src={shouldLoadVideo ? gondolavid : undefined}
                preload="none"
                loop
                muted
                playsInline
                className='w-96 lg:w-8/12 border-2x border-whitex lg:mt-10 rounded-xl'>
            </video>
            {!isPlaying && (
                <button
                    onClick={handlePlayButtonClick}
                    className='absolute bg-black bg-opacity-50 text-white p-2 rounded-md'>
                    <img src={play} alt="" className='lg:m-20d' />
                </button>
            )}
        </div>
    );
}

export default Video;
