import { useUser } from "@/context/UserContext";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "./Message";

let socket: any;

type Message = {
  author: string;
  text: string;
  room: string;
};

export default function Chat({ room }: { room: string }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [totalUsers, setTotalUsers] = useState(1);
  const { user, setModalLoginOpen, modalLoginOpen } = useUser();

  useEffect(() => {
    socketInitializer();
    window.addEventListener("beforeunload", () => {
      socket.emit("leave_room", room);
    });
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");

    socket = io();

    if (room) {
      socket.emit("join_room", room);
    }

    socket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("total_users", (total: number) => {
      setTotalUsers(total);
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: "20rem",
        height: "360px",
        position: "relative",
        boxShadow: "0 0 0.5rem rgba(0, 0, 0, 0.5)",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        backgroundColor: "#fff",
        zIndex: modalLoginOpen ? -1 : 1,
      }}
    >
      <div
        style={{
          overflowY: "scroll",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {totalUsers > 0 && (
          <h3
            style={{
              textAlign: "right",
              position: "absolute",
              right: 4,
              top: -24,
            }}
          >
            {totalUsers} usuário{totalUsers > 1 ? "s" : ""}
          </h3>
        )}
        {messages.map((msg: Message, index: number) => (
          <Message key={index} isSelf={msg.author === user} {...msg} />
        ))}
      </div>
      <div
        style={{
          position: "sticky",
          bottom: 0,
          padding: "0.4rem",
          backgroundColor: "white",
        }}
      >
        {user ? (
          <input
            style={{
              width: "100%",
              backgroundColor: "white",
              border: "1px solid #ccc",
              color: "black",
            }}
            disabled={!user}
            type="text"
            placeholder="Digite sua mensagem"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
            value={message}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                socket.emit("send_message", {
                  text: e.target.value,
                  room,
                  author: user,
                });
                setMessages((prev) => [
                  ...prev,
                  {
                    text: e.target.value,
                    room,
                    author: user,
                  },
                ]);
                setMessage("");
              }
            }}
          />
        ) : (
          <button
            onClick={() => {
              setModalLoginOpen(true);
            }}
          >
            Entre para enviar uma mensagem
          </button>
        )}
      </div>
    </div>
  );
}
