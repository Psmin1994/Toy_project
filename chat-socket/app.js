import wsModule, { WebSocketServer } from "ws";
import express from "express";

const app = express();

const HTTPServer = app.listen(8008, () => {
  console.log("Server run at post 8008");
});

const wss = new WebSocketServer({
  server: HTTPServer, // WebSocket서버에 연결할 HTTP서버를 지정
  // port: 30001 // WebSocket연결에 사용할 port를 지정 (생략시, http서버와 동일한 port 공유 사용)
});

let user_id = 0; // 클라이언트에게 부여되는 고유 값
let ALL_WS = []; // 전체 유저들을 통제할 수 있도록 각 유저에 대한 webSocket, user_id를 저장

wss.on("connection", (ws, req) => {
  // webSocket 은 클라이언트와 연결하는 수단
  console.log(`CONNECT USER - ${++user_id}`);

  ALL_WS.push({
    ws: ws,
    user_id: user_id,
    user_name: "",
  });

  sendUserId(user_id);

  ws.on("close", (code, reason) => {
    ALL_WS.forEach((element, index) => {
      // 접속이 끊긴 유저
      if (element.ws == ws) {
        ALL_WS.splice(index, 1); // 배열의 제거 메소드
      }
    });
    sendAllUsers();
  });

  ws.on("message", (message) => {
    console.log(JSON.parse(message));
    message = JSON.parse(message);

    switch (message.code) {
      case "new_user": {
        // 사용자 추가
        ALL_WS.forEach((element, index) => {
          if (element.user_id == message.user_id) {
            element.user_name = message.name;
          }
        });
        sendAllUsers();
        break;
      }
      case "send_message": {
        ALL_WS.forEach((element, index) => {
          let data = {
            code: "chat_message",
            sender_name: message.name,
            msg: message.msg,
          };

          element.ws.send(JSON.stringify(data));
        });
        break;
      }
    }
  });

  function sendAllUsers() {
    let data = {
      code: "all_users",
      msg: JSON.stringify(ALL_WS),
    };

    ALL_WS.forEach((element, index) => {
      element.ws.send(JSON.stringify(data));
    });
  }

  function sendUserId(user_id) {
    let data = {
      code: "my_user_id",
      msg: user_id,
    };
    ws.send(JSON.stringify(data)); // data 객체를 문자열로 클라이언트로 보내기
  }
});
