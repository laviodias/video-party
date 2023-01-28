import Head from "next/head";
import { useEffect, useState } from "react";
import Dialog from "@/components/Dialog";
import Carousel from "@/components/Carousel";
import WrapList from "@/components/WrapList";

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState({
    open: false,
    dialog: "create" as "create" | "join",
  });
  const [loading, setLoading] = useState(true);
  const [roomList, setRoomList] = useState([]);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  async function getRoomList() {
    const response = await fetch("/api/database");
    const data = await response.json();
    setRoomList(data);
    setLoading(false);
  }

  useEffect(() => {
    getRoomList();
    if (window.innerWidth < 1260) setIsSmallScreen(true);
    window.addEventListener("resize", () => {
      setIsSmallScreen(window.innerWidth < 1260);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setIsSmallScreen(window.innerWidth < 1260);
      });
    };
  }, []);

  return (
    <>
      <Head>
        <title>Video Party</title>
        <meta
          name="description"
          content="Junte-se aos seus amigos para assistir e comentar vídeos"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
          minHeight: "calc(100vh - 124px)",
          padding: "2rem",
          backgroundColor: "rgba(216, 223, 160, 0.5)",
        }}
      >
        {loading && <div>Carregando...</div>}
        <div style={{ display: "flex", gap: "2rem" }}>
          <button
            onClick={() =>
              setDialogOpen({
                open: true,
                dialog: "join",
              })
            }
          >
            Informe um código
          </button>

          <div>
            <button
              onClick={() =>
                setDialogOpen({
                  open: true,
                  dialog: "create",
                })
              }
            >
              Crie uma sala
            </button>
          </div>
        </div>
        <div
          style={{
            maxWidth: "90vw",
            display: "flex",
            gap: "4rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {roomList?.length > 0 ? (
            isSmallScreen || roomList.length <= 4 ? (
              <WrapList rooms={roomList} />
            ) : (
              <Carousel rooms={roomList} />
            )
          ) : (
            !loading && <div>Nenhuma sala encontrada</div>
          )}
        </div>

        {dialogOpen.open && (
          <Dialog
            onClose={() =>
              setDialogOpen({
                open: false,
                dialog: "create",
              })
            }
            type={dialogOpen.dialog}
          />
        )}
      </main>
    </>
  );
}
