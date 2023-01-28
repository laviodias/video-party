import { useUser } from "@/context/UserContext";
import React, { useState } from "react";
import ReactPlayer from "react-player";

interface IProps {
  onClose: () => void;
  type: "create" | "join";
}

export default function Dialog({ onClose, type }: IProps) {
  const { user, setUser } = useUser();
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  const createNewRoom = async () => {
    if (!user && username) {
      setUser(username);
    }
    const res = await fetch("/api/database", {
      method: "POST",
      body: JSON.stringify({
        author: user ? user : username,
        url,
        title,
      }),
    });
    const result = await res.json();

    window.open(`/room/${result.id}`, "_self");
    return result.id;
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "1.5rem 2rem",
          borderRadius: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          alignItems: "center",
          minWidth: "20rem",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {type === "join" ? (
          <input
            type="text"
            onChange={(e) => setRoom(e.target.value)}
            placeholder="ID da Sala"
          />
        ) : (
          <>
            <input
              type="text"
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Url do Vídeo"
            />
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título da Sala"
            />
          </>
        )}
        {!user && (
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Seu Nome"
          />
        )}
        <button
          style={{ marginTop: "1rem" }}
          onClick={() => {
            type === "join"
              ? window.open(`/room/${room}`, "_self")
              : createNewRoom();
          }}
          disabled={
            type === "join"
              ? !room
              : !ReactPlayer.canPlay(url) || (!user && !username) || !title
          }
        >
          {type === "join" ? "Entrar" : "Criar Sala"}
        </button>
      </div>
    </div>
  );
}
