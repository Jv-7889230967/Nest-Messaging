import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message_to_individual')
  handleMessage(
    @MessageBody() data: { sender: string; message: string },
    @ConnectedSocket() client: Socket,
  ): void {
    console.log(`Received message: ${data.message} from ${data.sender}`);
    this.server.emit('message', data);
  }
}
