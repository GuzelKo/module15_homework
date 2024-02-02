const wsUrl = "wss://echo-ws-service.herokuapp.com"
//const wsUrl = "wss://websocket-echo.glitch.me";
//const wsUrl = "ws://echo.websocket.org";

const btnSend = document.querySelector('.button-send');
const btnGeoloc = document.querySelector('.button-geolocation')
const input = document.querySelector('.input');
const output = document.querySelector('.output');

let latitude;
let longitude;

const websocket = new WebSocket(wsUrl);

const mapLink = document.createElement('a');
mapLink.setAttribute('target', '_blank');

if ("geolocation" in navigator) {
	navigator.geolocation.getCurrentPosition((position) => {
		latitude = position.coords.latitude;
		longitude = position.coords.longitude;

		mapLink.href = `https://www.openstreetmap.org/#map=11/${latitude}/${longitude}`;
		mapLink.innerHTML = mapLink.href;
	});
};


websocket.onopen = function (evt) {
	writeToScreen("CONNECTED");
	console.log('connected')
};

websocket.onerror = function (evt) {
	writeToScreen(
		'<span style="color:red;">ERROR:</span>' + evt.data
	);
};

websocket.onclose = function (evt) {
	writeToScreen("DISCONNECTED");
};


function writeToScreen(message, self = false) {
	let paragraph = document.createElement('p');
	paragraph.innerHTML = message;
	paragraph.classList.add("message");
	if (self) paragraph.classList.add("self");
	output.appendChild(paragraph);
};

btnSend.addEventListener('click', () => {
	let message = input.value;
	writeToScreen(`<span>SENT: ${message}</span>`, true);
	websocket.send(message);

	websocket.onmessage = function (evt) {
		writeToScreen(`<span>RESPONSE: ${evt.data}</span>`);
	};


	input.value = "";
});

btnGeoloc.addEventListener('click', () => {
	output.appendChild(mapLink);
	writeToScreen(`Your latitude: ${latitude}, your longitude: ${longitude}`);
})


//input.addEventListener('submit', (e) => {
//e.target.reset();
//})

