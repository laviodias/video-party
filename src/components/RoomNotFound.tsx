import React from "react";

export default function RoomNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 124px)",
        padding: "2rem",
        backgroundColor: "rgba(216, 223, 160, 0.5)",
      }}
    >
      <h1>Oops! Parece que essa sala não existe.</h1>
    </div>
  );
}
