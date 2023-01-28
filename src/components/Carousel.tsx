import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import arrow from "../../public/arrow.png";
import Image from "next/image";
import { IRoom } from "@/interfaces/Rooms";

interface IProps {
  rooms: IRoom[];
}

export default function Carousel({ rooms }: IProps) {
  const [scroll, setScroll] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setScreenWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setScreenWidth(window.innerWidth);
      });
    };
  }, []);

  const cardsPerScreen = screenWidth > 1500 ? 4 : 3;

  return (
    <div>
      <h1 style={{ width: "100%", textAlign: "center" }}>
        Ou escolha uma sala recente
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          gap: "1rem",
          overflow: "hidden",
          padding: "2rem",
        }}
      >
        <button
          style={{ padding: "4px", transform: "rotate(180deg)" }}
          disabled={scroll === 0}
          onClick={() => setScroll(scroll - 1)}
        >
          <Image src={arrow} alt="Arrow" height={50} width={40} />
        </button>

        {rooms.slice(scroll, scroll + cardsPerScreen).map((room) => (
          <div key={room.id}>
            <VideoCard {...room.fields} id={room.id} />
          </div>
        ))}

        <button
          style={{ padding: "4px" }}
          disabled={scroll === rooms.length - cardsPerScreen}
          onClick={() => setScroll(scroll + 1)}
        >
          <Image src={arrow} alt="Arrow" height={50} width={40} />
        </button>
      </div>
    </div>
  );
}
