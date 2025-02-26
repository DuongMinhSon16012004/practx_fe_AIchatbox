import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';


export default function Messages({ message, isNewConversation, isThinking }) {

    function getTimeString(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();

        const time = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
        if (date.getDate() !== now.getDate()) {
            const day = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}`;
            return `${day} ${time} `;
        } else {
            return `${time}`;
        }
    }


    return (
        <React.Fragment>
            {isNewConversation && (
                <div className="text-center text-sm text-gray-400 relative mb-5 mt-2">
                    <span className="absolute left-1/2 bottom-1 -translate-x-1/2 translate-y-1/2 px-2 bg-gray-100">
                        {getTimeString(message.startedAt)}
                    </span>
                    <hr className="border border-gray-200 my-7" />
                </div>
            )}
            {message && (
                <div className={message.sender === "user" ? "flex justify-end" : ""}>
                    <p className={`w-fit max-w-[80%] p-2 ${message.sender === "user" ? "bg-[#DDCBEB]" : "bg-[#C1D3F5]"} rounded-lg break-words text-sm`}>
                        {/* {message.message.split("\n").map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))} */}
                        <ReactMarkdown>{message.message.replace(/\n/g, "  \n")}</ReactMarkdown>
                    </p>
                </div>
            )}
            {isThinking && (
                <div className="flex">
                    <div className="max-w-[80%] p-2 bg-[#C1D3F5] rounded-lg break-words text-sm flex space-x-2 justify-center items-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )

    // return (
    //     messages.map((msg, index) => {
    //         const isNewConversation = msg.conversationId !== lastConversationId;
    //         lastConversationId = msg.conversationId; // Cập nhật conversationId

    //         return (
    //             <React.Fragment key={index}>
    //                 {isNewConversation && (
    //                     <div className="text-center text-sm text-gray-400 relative mb-5 mt-2">
    //                         <span className="absolute left-1/2 bottom-1 -translate-x-1/2 translate-y-1/2 px-2 bg-gray-100">
    //                             {getTimeString(msg.startedAt)}
    //                         </span>
    //                         <hr className="border border-gray-200 my-7" />
    //                     </div>
    //                 )}
    //                 <div className={msg.sender === "user" ? "flex justify-end" : ""}>
    //                     <p className={`max-w-[80%] p-2 ${msg.sender === "user" ? "bg-[#DDCBEB]" : "bg-[#C1D3F5]"} rounded-lg break-words text-sm`}>
    //                         {msg.message.split("\n").map((line, index) => (
    //                             <React.Fragment key={index}>
    //                                 {line}
    //                                 <br />
    //                             </React.Fragment>
    //                         ))}
    //                     </p>
    //                 </div>
    //             </React.Fragment>
    //         );
    //     })

    // )

}
