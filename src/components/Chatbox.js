import React, { useState, useEffect, useRef } from "react";
import AssistantIcon from "./AssistantIcon";
import Messages from "./Messages";


export default function Chatbox({ dataFirstPatient, messages, setMessages, isOnChatbox }) {

    const [typingMessage, setTypingMessage] = useState(null);
    const [botResponse, setBotResponse] = useState(null);
    const [isThinking, setIsThinking] = useState(false);

    const [messagesToShow, setMessagesToShow] = useState(10);
    const [displayMessages, setDisplayMessages] = useState([]);
    const messagesEndRef = useRef(null);
    const messagesContainerRef = useRef(null);


    let lastConversationId = '';

    const loadMoreMessages = () => {

        if (!messagesContainerRef.current) return;

        // Lưu vị trí scroll trước khi thêm tin nhắn mới
        const prevScrollHeight = messagesContainerRef.current.scrollHeight;
        const prevScrollTop = messagesContainerRef.current.scrollTop;

        // Tăng số tin nhắn hiển thị
        setMessagesToShow((prev) => prev + 10);
        setDisplayMessages(messages.slice(-messagesToShow - 10));

        // Sau khi render xong, đặt lại vị trí scroll
        setTimeout(() => {
            if (messagesContainerRef.current) {
                messagesContainerRef.current.scrollTop =
                    messagesContainerRef.current.scrollHeight - prevScrollHeight + prevScrollTop;
            }
        }, 10);
    };

    function handleKeyDown(event) {
        if (event.key === 'Enter' && event.shiftKey) {
            // Nếu nhấn Shift + Enter thì chặn hành vi mặc định và thêm xuống dòng
            event.preventDefault(); // Ngăn không cho gửi form hoặc hành vi mặc định
            const textarea = event.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            // Thêm ký tự xuống dòng tại vị trí con trỏ
            const value = textarea.value;
            textarea.value = value.substring(0, start) + "\n" + value.substring(end);

            // Đặt lại vị trí con trỏ sau ký tự xuống dòng
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        } else if (event.key === 'Enter') {
            // Nếu chỉ nhấn Enter thì gửi tin nhắn
            event.preventDefault(); // Ngăn không cho xuống dòng
            sendMessage();
        }
    }

    function saveMessage(message) {
        let mess = {
            id: message.id,
            sender: message.sender,
            message: message.message,
            conversationId: message.conversationId,
            startedAt: message.startedAt
        };
        setMessages(prevMessage => [...prevMessage, mess]);
    }

    async function returnResponseBot() {
        return new Promise((resolve) => {
            const randomThinkingTime = Math.floor(Math.random() * (1500 - 500) + 500);
            setTimeout(() => {
                resolve(responseSample[sampleIndex]);
            }, randomThinkingTime);
            setSampleIndex(sampleIndex + 1);
        });
    }

    const handleTypingEffect = (response) => {
        const words = response.message.split(" ");
        let index = 0;
        let currentMessage = "";

        setTypingMessage({ ...response, message: "" });

        const interval = setInterval(() => {
            const messagesDiv = document.getElementById('messages');
            if (index < words.length) {
                currentMessage += (index > 0 ? " " : "") + words[index]; // Thêm từ mới vào
                setTypingMessage((prev) => ({ ...prev, message: currentMessage }));
                index++;
            } else {
                clearInterval(interval);
                setMessages((prev) => [...prev, response]); // Khi hoàn thành, thêm vào messages
                setTypingMessage(null);
            }
            setTimeout(() => {
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }, 10);
        }, 50);

    };

    const resetChatbox = () => {
        setDisplayMessages(messages.slice(-10));
        setMessagesToShow(10);
    };


    const [sampleIndex, setSampleIndex] = useState(0);
    const responseSample = [
        `Hello, *Doctor Mike!* 
        I’m PracTee, your Virtual Practitioner Assistant within the PracTX system. I’m here to help you manage your clinic efficiently—whether it’s accessing patient records, scheduling, assisting with diagnoses, or generating reports. Let me know how I can assist you today! 😊`,
        `Your last patient is Rina Tan, a 30-year-old female who was admitted on November 19, 2024, with a chief complaint of chest tightness and shortness of breath.\nSummary of the Encounter:\n**Primary Diagnosis:** Acute asthma exacerbation\n**Secondary Issues:** Generalized anxiety disorder (well-managed) and a history of seasonal allergic rhinitis\n\nWould you like more detailed information on her treatment, lab results, or financial details?`,
        `Here are the detailed treatments for Rina Tan, based on her encounter:
        **1. Nebulized Bronchodilator Therapy:**
        - Medication: Salbutamol
        - Dosage: Administered every 4 hours
        - Purpose: To relieve airway constriction and improve breathing during the acute asthma exacerbation.
        **2. Oral Corticosteroids:**
        - Medication: Prednisolone
        - Dosage: Prescribed as part of the asthma management for the flare-up (exact dosage not provided in the notes).
        - Purpose: To reduce inflammation in the airways and prevent further exacerbation.
        **3. Monitoring:**
        Continuous monitoring of oxygen saturation and respiratory rate to assess the effectiveness of the treatment.
        **4. Follow-Up Care:**
        Pulmonary Specialist: Follow-up appointment in 1 week to evaluate asthma management and recovery.
        Instructions: Return to the hospital if symptoms worsen or do not improve with the prescribed treatment.`,
        `Here are the detailed medications for Rina Tan, based on her encounter:
        **1. Aspirin**
        Dosage: 100 mg daily
        Purpose: For heart health.
        **2. Propranolol**
        Dosage: 20 mg daily
        Purpose: To manage generalized anxiety disorder effectively.
        Would you like me to focus on her upcoming follow-up, possible drug interactions, or any additional details?`,
        `Great! If you need more information about Rina Tan’s follow-up, medication details, or anything else, just let me know. I’m here to assist you, Doctor Mike! 😊`
    ];

    async function sendMessage() {
        const userInput = document.getElementById('user-input').value;
        document.getElementById('user-input').value = '';
        if (!userInput)
            return;

        const messagesDiv = document.getElementById('messages');

        setTimeout(() => {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 50);


        saveMessage({
            id: messages.length + 1,
            sender: 'user',
            message: userInput,
            conversationId: '84be4ed1-c2a8-46a3-b4ff-7892d28f35a3',
            startedAt: new Date().toISOString()
        })

        setIsThinking(true);
        const response = await returnResponseBot();
        setIsThinking(false);

        setBotResponse({
            id: messages.length + 1,
            sender: 'bot',
            message: response,
            conversationId: '84be4ed1-c2a8-46a3-b4ff-7892d28f35a3',
            startedAt: new Date().toISOString()
        });


        // await fetch('http://localhost:8080/api/save', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         sender: 'user',
        //         userId: '84be4ed1-c2a8-46a3-b4ff-7892d28f35a3',
        //         messageContent: userInput,
        //         messageType: 'text'
        //     })
        // })
        //     .then(response => response.json())
        //     .then(userChat => saveMessage(userChat))

        // setIsThinking(true);
        // // const responseChat = await fetch('https://6c51-113-190-44-93.ngrok-free.app/chat', {
        // //     method: 'POST',
        // //     headers: { 'Content-Type': 'application/json' },
        // //     body: JSON.stringify({
        // //         query: userInput
        // //     })
        // // })
        // // const chatData = await responseChat.json();
        // // const botChat = chatData.response;
        // const botChat = await returnResponseBot();
        // setIsThinking(false);

        // await fetch('http://localhost:8080/api/save', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         sender: 'bot',
        //         userId: '84be4ed1-c2a8-46a3-b4ff-7892d28f35a3',
        //         messageContent: botChat,
        //         messageType: 'text'
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         setBotResponse({
        //             id: data.id,
        //             sender: data.sender,
        //             message: data.message,
        //             conversationId: data.conversationId,
        //             startedAt: data.startedAt
        //         });
        //     })


        setTimeout(() => {
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        }, 50);
    }

    const handleInputChange = (e) => {
        // Tự động tăng chiều cao textarea
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
    };

    const handleScroll = (e) => {
        const maxRem = 10;
        if (e.target.scrollHeight > maxRem * 16) {
            e.target.style.overflowY = "auto"; // Chỉ bật thanh cuộn khi vượt maxHeight
        } else {
            e.target.style.overflowY = "hidden";
        }
    }

    useEffect(() => {
        if (botResponse) {
            handleTypingEffect(botResponse);
        }
    }, [botResponse]);

    useEffect(() => {
        const handleScrollTop = () => {
            if (messagesContainerRef.current) {
                if (messagesContainerRef.current.scrollTop === 0) {
                    loadMoreMessages(); // Load thêm khi cuộn lên đầu
                }
            }
        };

        const container = messagesContainerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScrollTop);
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScrollTop);
            }
        };
    }, [messagesToShow, messages]);

    useEffect(() => {
        setDisplayMessages(messages.slice(-messagesToShow));
    }, [messages])

    useEffect(() => {
        if (!isOnChatbox) {
            resetChatbox();
        } else {
            document.getElementById('user-input').focus();
        }
    }, [isOnChatbox])




    return (
        <div id="chatBox"
            className={`lg:w-96 sm:w-80 h-[calc(100vh-12rem)] bg-gray-100 mb-3 rounded-lg border border-gray-200 shadow-lg z-50 font-sans text-black ${isOnChatbox ? '' : 'hidden'} flex flex-col justify-between`}>
            <div className="relative h-10 w-full bg-custom-gradient rounded-t-lg text-white text-sm flex justify-center items-center">
                PracTee - Your Virtual Assistant
                <div className="absolute bottom-0 left-2 translate-y-1/2">
                    <AssistantIcon size={4} />
                </div>
            </div>
            <div id="messages" ref={messagesContainerRef} className="p-5 h-full overflow-y-auto border-gray-300 mb-4 space-y-3 no-scrollbar">
                {displayMessages.map((msg, index) => {
                    const isNewConservation = lastConversationId !== msg.conversationId;
                    lastConversationId = msg.conversationId;
                    return (
                        <Messages message={msg} key={index} isNewConversation={isNewConservation} />
                    )
                })}
                {typingMessage && <Messages message={typingMessage} />}
                {isThinking && <Messages isThinking={isThinking} />}
                <div ref={messagesEndRef}></div>
            </div>
            <div className="relative flex gap-2 items-center">
                <textarea
                    id="user-input"
                    onKeyDown={handleKeyDown}
                    onChange={handleInputChange}
                    onScroll={handleScroll}
                    rows={1}
                    placeholder="Ask something..."
                    className="overflow-y-hidden w-full px-2 py-3 rounded-t-none border-t border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 max-h-40 resize-none"
                />
                <div className="absolute right-2 text-gray-300 flex gap-2">
                    <button className="hover:text-blue-400">
                        <i className="fa-solid fa-microphone"></i>
                    </button>
                    <button onClick={sendMessage} className="hover:text-blue-400">
                        <i className="fa-regular fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}