import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";
import login from "../../public/login.png";
import Login from "./Login";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const [roomId, setRoomId] = useState("");
  const [screenWidth, setScreenWidth] = useState(0);
  const { user, setUser, setModalLoginOpen, modalLoginOpen } = useUser();

  const showSearchBar = screenWidth > 720;

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

  function redirectToRoom() {
    window.location.href = `/room/${roomId}`;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 3rem",
        alignItems: "center",
        backgroundColor: "white",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          display: "flex",
          cursor: "pointer",
          alignItems: "center",
          gap: "1rem",
        }}
        onClick={() => window.open("/", "_self")}
      >
        <Image src={logo} alt="Logo" width={40} height={40} />
        <p
          style={{
            fontWeight: "bold",
          }}
        >
          Video Party
        </p>
      </div>
      {showSearchBar && (
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Informe o ID da sala"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={redirectToRoom}>Entrar</button>
        </div>
      )}
      {user ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <h3>Olá, {user.split(" ")[0]}</h3>
          <p
            style={{ fontSize: "0.8rem" }}
            onClick={() => {
              setUser(null);
            }}
          >
            Sair
          </p>
        </div>
      ) : (
        <button
          style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
          onClick={() => setModalLoginOpen(true)}
        >
          <Image src={login} alt="Logo" width={20} height={20} />
          Entrar
        </button>
      )}
      {modalLoginOpen && <Login />}
    </div>
  );
}
