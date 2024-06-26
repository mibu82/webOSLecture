window.onload = function () {
  const url = 'ws://localhost:8080';  // WebSocket 서버의 주소
  const ws = new WebSocket(url);
  
  ws.onopen = () => {
    ws.send("Hi Server! It's client!");
  };
  
  ws.onerror = (error) => {
    console.log("WebSocket error: " + error);
  };
  
  ws.onmessage = (message) => {
    console.log(message.data);
    printMessage(message.data);
  };
  
  ws.onclose = function(event) {
    if (event.wasClean) { // WebSocket close handshake를 통해 연결을 종료한 경우
      printMessage("WebSocket connection is closed normally. (code: " + event.code + ", reason: " + event.reason + "}");
    } else {
      printMessage("Something wrong!");
    }
  }
  
  function printMessage(msg) {
    let responseWindow = document.getElementById('client-window');
    responseWindow.innerHTML += msg + "<br />";
  }
  
  // putKind method 호출을 위한 event listener
  const sendMessage = document.getElementById("message-btn");
  sendMessage.addEventListener('click', function (e) { // 'e'란 무엇인가? (https://stackoverflow.com/questions/35936365/what-exactly-is-the-parameter-e-event-and-why-pass-it-to-javascript-functions)
    console.log("Send button is clicked. Send a message to the server!");
  
    const message = document.getElementById("message-input").value;
    ws.send(message);
  });
}