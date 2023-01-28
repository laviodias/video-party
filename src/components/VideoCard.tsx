import React from "react";
import dynamic from "next/dynamic";
import { useUser } from "@/context/UserContext";
import { IFields } from "@/interfaces/Rooms";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

function formatTitleSize(title: string) {
  if (title.length > 24) {
    return title.slice(0, 24) + "...";
  }
  return title;
}

export default function VideoCard({ url, id, title }: IFields) {
  const { user, setModalLoginOpen, setModalLoginCallback } = useUser();

  function redirecToRoom() {
    if (user) {
      window.open(`/room/${id}`, "_self");
    } else {
      window.scrollTo(0, 0);
      window.document.body.style.overflow = "hidden";      
      setModalLoginOpen(true);
      setModalLoginCallback(() => {
        return () => {
          window.document.body.style.overflow = "auto";
          window.open(`/room/${id}`, "_self");
        };
      });
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
        padding: "1rem",
        borderRadius: "1rem",
        backgroundColor: "white",
        zIndex: 1,
      }}
    >
      <ReactPlayer
        url={url}
        light={true}
        width={280}
        height={190}
        playIcon={<></>}
        onClickPreview={(e) => {
          e.preventDefault();
          redirecToRoom();
        }}
      />
      <h4>{formatTitleSize(title)}</h4>
      <button onClick={() => redirecToRoom()}>Entrar na sala</button>
    </div>
  );
}
