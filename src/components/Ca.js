import React, { useState } from 'react';
import CA from '../assets/CA.png';
import copiedImg from '../assets/copied.png';

function Ca() {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("0xd43fba1f38d9b306aeef9d78ad177d51ef802b46");
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset copied state after 2 seconds
    };

    return (
        <div className="relative w-full justify-center items-center flex mb-20 lg:mb-96 flex-col">
            <img
                src={CA}
                alt=""
                className={`z-20 w-96 lg:w-8/12 transition-transform duration-200 ease-in-out transform hover:scale-95 active:scale-90 cursor-pointer`}
                onClick={handleCopy}
            />
            {isCopied && <img src={copiedImg} alt="Copied!" className="absolute top-5 lg:top-14 z-30 w-20 lg:w-32" />}
        </div>
    );
}

export default Ca;
