import React, { useState } from "react";
import AssistantIcon from "./AssistantIcon";

export default function ChatIcon({ dataFirstPatient, setDataFirstPatient, messages, setMessages, isOnChatbox, setIsOnChatbox }) {

    const [isIconVisible, setIsIconVisible] = useState(true);
    const [isTriggerHover, setTriggerHover] = useState(true);
    const [isTriggerLoading, setIsTriggerLoading] = useState(false);
    const [isTriggerChat, setIsTriggerChat] = useState(false);
    

    let dailyMessage = '';

    function toggleChatBox() {
        setIsIconVisible(!isIconVisible);
        setIsTriggerLoading(false);
        setIsTriggerChat(false);
        setIsOnChatbox(!isOnChatbox);
        const messagesDiv = document.getElementById('messages');
        setTimeout(() => {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 10);
    }

    async function showTrigger() {
        dailyMessage = await setDailyMessages('84be4ed1-c2a8-46a3-b4ff-7892d28f35a3');
        if (dailyMessage === '') {
            setIsTriggerChat(false);
            setIsTriggerLoading(false);
            setTriggerHover(false);
        } else {
            setIsTriggerLoading(true);
            setTriggerHover(false);
            setTimeout(() => {
                setIsTriggerLoading(false);
                setIsTriggerChat(true);
            }, 1000)
        }

        await loadMessageHistory('84be4ed1-c2a8-46a3-b4ff-7892d28f35a3');

    }

    async function loadMessageHistory(userId) {
        const response = await fetch('http://localhost:8080/api/history-messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId }),
        })

        const data = await response.json();
        data.forEach(message => {
            let mess = {
                id: message.id,
                sender: message.sender,
                message: message.message,
                conversationId: message.conversationId,
                startedAt: message.startedAt
            };
            setMessages(prevMessage => [...prevMessage, mess]);
        });
    }

    async function setDailyMessages(userId) {
        const response = await fetch('http://localhost:8080/api/daily-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: userId })
        })

        const data = await response.text();
        return data;
    }

    function TriggerChat() {
        return (
            <div className="p-4 bg-gray-100 rounded-md shadow-md w-fit mb-2 text-sm transition ease-in-out duration-200">
                <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
                <div>
                    {isTriggerChat &&
                        <p>Good afternoon Dr.Mike, how can I help you today?</p>
                    }
                </div>
            </div>
        )
    }

    function TriggerLoad() {
        return (
            <div id="trigger-load"
                className="absolute -top-5 w-full h-7 bg-slate-200 rounded drop-shadow-lg -translate-y-5 z-50 flex space-x-2 justify-center items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            </div>
        )
    }

    function ButtonHiddenChatBox() {
        return (
            <div className="flex items-center justify-center w-10 h-10 rounded-full p-8 cursor-pointer bg-[#C1D3F5] text-3xl text-white hover:bg-red-200 transition ease-in-out duration-200">
                <i className="fa-solid fa-x"></i>
            </div >
        )
    }


    return (
        <div id="chat" onClick={toggleChatBox} onMouseOver={isTriggerHover ? showTrigger : null} className="flex flex-col items-end">
            {isTriggerChat && <TriggerChat />}
            {isTriggerLoading && <TriggerLoad />}
            {isIconVisible ? <AssistantIcon /> : <ButtonHiddenChatBox />}
        </div >
    )
}
