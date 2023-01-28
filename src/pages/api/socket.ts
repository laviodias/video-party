import { Server, Socket } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  io.on("connection", (socket: Socket) => {
    console.log("New connection", socket.id);

    socket.on("send_message", (data) => {
      socket.to(data.room).emit("receive_message", data);
    });

    socket.on("leave_room", (data) => {
      socket.leave(data);
      io.in(data).allSockets().then((result) => {
        socket.to(data).emit("total_users", result.size);
      });
    });

    socket.on("join_room", (data) => {
      socket.join(data);
       io.in(data).allSockets().then((result) => {
        socket.to(data).emit("total_users", result.size);
        socket.emit("total_users", result.size);
      });
    });

  });

  res.end();
}
