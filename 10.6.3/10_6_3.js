const wsUri = " wss://echo-ws-service.herokuapp.com";

const input = document.querySelector('.input_message');
const btnSend = document.querySelector('.btn_send');
const btnGeo = document.querySelector('.btn_geo');
const userMessages = document.querySelector('.user_messages');
const serverMessages = document.querySelector('.server_messages');

function writeToScreen(message, position='flex-end') {
	let element = `
        <p class='messages' style='align-self: ${position}'>
            ${message}
        </p>
    `;
	userMessages.innerHTML += element;
  }

 let websocket = new WebSocket(wsUri); 
	websocket.onopen = function(evt) {
		console.log("CONNECTED");
	};
	websocket.onmessage = function(evt) {
		writeToScreen(`ответ сервера: ${evt.data}`, 'flex-start');
	};
	websocket.onerror = function(evt) {
		writeToScreen(`server: ${evt.data}`, 'flex-start');
	};
  
  btnSend.addEventListener('click', () => {
	let message = input.value;
	websocket.send(message);
	writeToScreen(`Вы: ${message}`);
	input.value = ''

  });


const error = () => {
	let textErr0r = 'Невозможно получить ваше местоположение';
	writeToScreen(textErr0r);
  };
  
  const success = (position) => {
	let latitude  = position.coords.latitude;
	let longitude = position.coords.longitude;
	let geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
	writeToScreen(`<a  href='${geoLink}' target='_blank'>Ваша гео-локация</a>`);
  };
  
  btnGeo.addEventListener('click', () => {
	if (!navigator.geolocation) {
	  console.log('Geolocation не поддерживается вашим браузером');
	} else {
	  navigator.geolocation.getCurrentPosition(success, error);
	}
  });