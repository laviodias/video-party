import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Chat from "@/components/Chat";
import Head from "next/head";
import { useUser } from "@/context/UserContext";
import RoomNotFound from "@/components/RoomNotFound";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface IProps {
  url: string;
  author: string;
  room: string;
  title: string;
}

async function deleteRoom(id: string) {
  const res = await fetch(`/api/database`, {
    method: "PATCH",
    body: JSON.stringify({
      deleted: true,
      id,
    }),
  });
  window.open("/", "_self");
}

export default function Room({ url, author, room, title }: IProps) {
  const [error, setError] = useState(false);
  const [playerWidth, setPlayerWidth] = useState<string | number>(0);
  const { user } = useUser();

  useEffect(() => {
    setPlayerWidth(window.innerWidth > 800 ? "600px" : "90vw");
    window.addEventListener("resize", () => {
      setPlayerWidth(window.innerWidth > 800 ? "600px" : "90vw");
    });

    return () => {
      window.removeEventListener("resize", () => {
        setPlayerWidth(window.innerWidth > 800 ? "600px" : "90vw");
      });
    };
  }, []);

  if (url == "") return <RoomNotFound />;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link copiado para a área de transferência");
            }}
          >
            Compartilhar sala
          </button>
          {author === user && (
            <button onClick={() => deleteRoom(room)}>Excluir sala</button>
          )}
        </div>
        <h1 style={{ margin: "3rem 2rem" }}>
          {title} - por {author}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          {error ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  maxWidth: "400px",
                  fontSize: "1.2rem",
                  textAlign: "center",
                }}
              >
                Oops! Parece que este vídeo não está disponível no momento.
                Tente novamente mais tarde
              </p>
              <button onClick={() => window.open("/", "_self")}>
                Voltar à página inicial
              </button>
            </div>
          ) : (
            <ReactPlayer
              width={playerWidth}
              url={url}
              onError={() => setError(true)}
            />
          )}
          <Chat room={room} />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  const res = await fetch(`${process.env.BASE_URL}/api/database?id=${id}`);
  if (!res.ok) {
    return {
      props: {
        url: "",
        author: "",
      },
    };
  }
  const result = await res.json();
  const { url, author, title } = result.fields;

  return {
    props: {
      url,
      author,
      title,
      room: id,
    },
  };
}
