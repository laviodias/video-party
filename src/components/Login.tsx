import { useUser } from "@/context/UserContext";
import React, { useState } from "react";

export default function Login() {
  const [name, setName] = useState("");
  const {
    setUser,
    modalLoginCallback,
    setModalLoginOpen,
    setModalLoginCallback,
  } = useUser();
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
      onClick={() => setModalLoginOpen(false)}
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
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Informe seu nome"
        />

        <button
          style={{ marginTop: "1rem" }}
          onClick={() => {
            setUser(name);
            setModalLoginOpen(false);
            if (modalLoginCallback) {
              modalLoginCallback();
              setModalLoginCallback(null);
            }
          }}
          disabled={name.length === 0}
        >
          Confirmar
        </button>
      </div>
    </div>
  );
}
