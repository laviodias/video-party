import { IRoom } from "@/interfaces/Rooms";
import React from "react";
import VideoCard from "./VideoCard";

interface IProps {
  rooms: IRoom[];
}

export default function WrapList({ rooms }: IProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        gap: "1rem",
        padding: "2rem",
        flexWrap: "wrap",
      }}
    >
      <h1 style={{ width: "100%", textAlign: "center" }}>
        Ou escolha uma sala recente
      </h1>
      {rooms.map((room) => (
        <div key={room.id}>
          <VideoCard {...room.fields} id={room.id} />
        </div>
      ))}
    </div>
  );
}
