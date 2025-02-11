import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/messages").then((res) => {
            setMessages(res.data.reverse());
        });

        socket.on("receiveMessage", (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => socket.off("receiveMessage");
    }, []);

    const sendMessage = () => {
        if (input.trim()) {
            socket.emit("sendMessage", { sender: username, message: input });
            setInput("");
        }
    };

    return (
        <div>
            <h2>Chat App</h2>
            <input
                type="text"
                placeholder="Enter your name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <div style={{ height: "300px", overflowY: "auto", border: "1px solid black" }}>
                {messages.map((msg, index) => (
                    <p key={index}><b>{msg.sender}</b>: {msg.message}</p>
                ))}
            </div>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;
