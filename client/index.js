// importujemy bibliotekę signalr
import * as signalR from "@microsoft/signalr";

// tworzymy nowe połączenie signalR
const connection = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Debug)
    .withUrl("http://localhost:56325/activity", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
    .build();

// nasłuchiwanie wiadomości od serwera
connection.on('ReceiveMessage', (user, message) => {
    console.log(`${user} mówi: ${message}`);
});

// nawiązywanie połączenia z serwerem
connection.start().then(() => {
    console.log("Połączenie z serwerem nawiązane.");
    fun();
}).catch((err) => {
    console.log(`Nie można nawiązać połączenia z serwerem: ${err}`);
});

// wysyłanie wiadomości do serwera
function fun(){
const user = 'Przykladowy uzytkownik';
const message = 'Czesc, jak sie masz?';

connection.invoke('NewMessage', user , message).catch((err) => {
    console.error(`Nie udało się wysłać wiadomości: ${err}`);
});
}
