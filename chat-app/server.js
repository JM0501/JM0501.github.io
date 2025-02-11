require("dotenv").config();
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const db = require("./db");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// API: Get Chat History
app.get("/messages", (req, res) => {
    db.query("SELECT * FROM messages ORDER BY timestamp DESC", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// WebSocket: Handle Real-Time Chat
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("sendMessage", (data) => {
        const { sender, message } = data;
        db.query(
            "INSERT INTO messages (sender, message) VALUES (?, ?)",
            [sender, message],
            (err, result) => {
                if (err) return console.error("Error saving message:", err);
                io.emit("receiveMessage", { sender, message, timestamp: new Date() });
            }
        );
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
