import React from "react";

export default function Message({
  isSelf,
  text,
  author,
}: {
  isSelf: boolean;
  text: string;
  author: string;
}) {
  return (
    <div
      style={{
        backgroundColor: isSelf ? "#f0f0f0" : "#e0e0e0",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        marginBottom: "0.5rem",
        minWidth: "30%",
        maxWidth: "80%",
        overflowWrap: "anywhere",
        alignSelf: isSelf ? "flex-end" : "flex-start",
      }}
    >
      <p style={{ fontSize: "0.8rem", color: "#666" }}>{author}</p>
      <p>{text}</p>
    </div>
  );
}
