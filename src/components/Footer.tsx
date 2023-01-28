import React from "react";
import linkedin from "../../public/linkedin.png";
import github from "../../public/github.png";
import instagram from "../../public/instagram.png";
import Image from "next/image";

export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: "rgba(216, 223, 160, 0.8)",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <p>Criado por Lávio Vale</p>
      <p>-</p>
      <a href="https://www.linkedin.com/in/laviovale/" target={"_blank"}>
        <Image src={linkedin} alt="linkedin" width={16} height={16}/>
      </a>
      <a href="https://www.github.com/laviodias" target={"_blank"}>
        <Image src={github} alt="github" width={16} height={16}/>
      </a>
      <a href="https://www.instagram.com/laviovale" target={"_blank"}>
        <Image src={instagram} alt="instagram" width={16} height={16}/>
      </a>
    </div>
  );
}
