const token = localStorage.getItem("token");

const socket = new WebSocket(
  `ws://localhost:5000?token=${token}`
);

export default socket;