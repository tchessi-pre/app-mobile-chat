// import io from 'socket.io-client';

// const SOCKET_SERVER_URL = 'http://localhost:3000';

// class WSService {
//     initializeSocket = async () => {
//         try {
//             this.socket = io(SOCKET_SERVER_URL, {
//                 transports: ['websocket']
//             })
//             console.log('Socket initialized', this.socket);

//             this.socket.on('connect', (data) => {
//                 console.log('Socket connected')
//             })

//             this.socket.on('disconnect', (data) => {
//                 console.log('Socket disconnected')
//             })

//             this.socket.on('error', (data) => {
//                 console.log('Socket error', data)
//             })

//         } catch (error) {
//             console.log('Error initializing socket', error);
//         }
//     }

//     emit(event, data = {}) {
//         this.socket.emit(event, data);
//     }
//     emit(event, cb = {}) {
//         this.socket.emonit(event, data);
//     }
//     removeListener(listenerName) {
//         this.socket.removeListener(listenerName);
//     }
// }

// const socketService = new WSService();
// export default socketService;