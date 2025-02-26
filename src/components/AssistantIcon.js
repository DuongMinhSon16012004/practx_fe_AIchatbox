import React, { useState } from "react";

export default function AssistantIcon({ size = 10 }) {


    const [isHovered, setIsHovered] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const handleVideoLoaded = () => {
        setIsLoaded(true); // Cập nhật trạng thái khi video đã load xong
      };

    switch (size) {
        case 10:
            return (
                <div
                    className="relative overflow-hidden flex items-center justify-center p-8 w-10 h-10 rounded-full cursor-pointer border border-black text-black transition ease-in-out duration-200"
                >
                    <img src="/aiAssistant.jpg" alt="Animated Assistant" className="absolute top-1/2 left-1/2 w-[150%] h-[150%] transform -translate-x-1/2 -translate-y-1/2 object-cover"/>
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] transform -translate-x-1/2 -translate-y-1/2 object-cover"
                        src="/aiAssistant.mp4" // Đường dẫn đến video của bạn
                        disablePictureInPicture
                        onCanPlayThrough={handleVideoLoaded}
                    ></video>
                </div>
            )
        case 4:
            return (
                <div
                    className="relative overflow-hidden flex items-center justify-center w-4 h-4 rounded-full p-4 border border-black text-black transition ease-in-out duration-200"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={isHovered ? "/aiAssistant.gif" : "/aiAssistant.jpg"} // GIF khi hover, ảnh tĩnh khi không hover
                        alt="Animated Assistant"
                        className="absolute top-1/2 left-1/2 w-[150%] h-[150%] transform -translate-x-1/2 -translate-y-1/2 object-cover"
                    />
                </div>
            )
        default: return null;
    }
}