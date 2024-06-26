const WebSocket = require('ws');
const cron = require('node-cron');

const wss = new WebSocket.WebSocketServer({ port: 8080 });

let clientCnt = 0; // 접속한 client의 수를 세기 위한 변수

wss.on('connection', (wsClient, handshakeRequest) => {
  
  // 접속한 client 수를 통해 Client별 고유 ID를 생성
  const clientId = clientCnt;
  clientCnt += 1;
  
  // console.log(handshakeRequest.rawHeaders); // HTTP Handshake 시 client가 전송한 header를 확인할 수 있음
  // 출처: https://curryyou.tistory.com/348 [카레유:티스토리]
  const clientIp = handshakeRequest.headers['x-forwarded-for'] || handshakeRequest.socket.remoteAddress;

  // 최초 연결 시 client로 메시지를 보냄
  wsClient.send("Hello, WebSocket client! It's your server! Your client ID is " + clientId);
  console.log("====================================");
  console.log("WebSocket Connection is established!");
  console.log("IP: " + clientIp);
  console.log("====================================");

  // 10초 마다 연결 유지 시간 출력
  let elapsedTime = 10; 
  let tenSecsReminder = cron.schedule('*/10 * * * * *', function () {

    if (elapsedTime == 300) { // 300초 이상 연결 유지 시 종료
      tenSecsReminder.stop();
      wsClient.close();
    }

    console.log("Client " + clientId + " 접속 시간 " + elapsedTime + "초 경과");
    wsClient.send("Client " + clientId + " 접속 시간 " + elapsedTime + "초 경과");

    elapsedTime += 10;
  },
  {
    schedule: false
  });

  // 연결 유지 시간 출력 프로세스 시작
  tenSecsReminder.start();

  wsClient.on('close', () => {
    console.log('Client: [' + clientId + '] is disconnected.');
    tenSecsReminder.stop();
  });

  wsClient.on('message', message => {
    const msgFromClient = message;

    console.log("Message from Client[" + clientId + "]:" + msgFromClient);
  });
});