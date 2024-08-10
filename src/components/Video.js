import React, { useRef, useEffect, useState } from 'react';
import gondolavid from '../assets/gondolavid.mp4';
import play from '../assets/play.png';

function Video() {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const videoElement = videoRef.current;

        const handleIntersection = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    videoElement.muted = false;
                    videoElement.play().then(() => {
                        setIsPlaying(true);
                    }).catch(error => {
                        console.error('Autoplay failed:', error);
                        setIsPlaying(false); // Show play button if autoplay fails
                    });
                } else {
                    videoElement.muted = true;
                    videoElement.pause();
                    setIsPlaying(false); // Show play button when paused
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersection, {
            threshold: 0.5,
        });

        if (videoElement) {
            observer.observe(videoElement);
            videoElement.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error('Initial play failed:', error);
                setIsPlaying(false); // Show play button if initial play fails
            });
        }

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    const handlePlayButtonClick = () => {
        const videoElement = videoRef.current;
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
                src={gondolavid}
                autoPlay
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
