import { io, Socket } from 'socket.io-client';
import { assertEventError } from './models/events/events';
import type { AuthenticateUserDto } from './models/dto/authenticate-user.dto';
import type { RoomDto, RoomSettings } from './models/dto/create-room.dto';
import type { EmitEvents } from './models/events/emit.events';
import type { ListenEvents } from './models/events/listen.events';
import type { Room, RoomId } from './models/room';

export class Client {

  private static readonly SocketEndpoint = 'https://tarot-mania.io/';

  public readonly socket: Socket<ListenEvents, EmitEvents>;

  public readonly connected$: Promise<void>;

  constructor(public readonly authProfile: AuthenticateUserDto) {
    this.socket = io(Client.SocketEndpoint, {
      transports: ['websocket'],
      auth: this.authProfile,
    });

    this.connected$ = new Promise((resolve) => {
      this.socket.on('connect', () => {
        resolve();
      });
      this.socket.on('connect_error', (error) => {
        throw error;
      });
    });
  }

  async createOrJoinRoom(room: RoomDto): Promise<void> {
    const roomSettings: RoomSettings = {
      roomId: this.getRoomId(room.roomName),
      ...room,
    };
    await this.connected$;
    try {
      await this.createRoom(roomSettings);
    }
    catch (createError) {
      assertEventError(createError);
      if (createError.errors?.['roomName']?.code === 'roomName.alreadyExists') {
        try {
          await this.joinRoom(roomSettings.roomId, roomSettings.roomPassword);
        }
        catch (error) {
          console.error(error);
          throw new Error('Unable to join the test room');
        }
      }
      else {
        console.error(createError);
        throw new Error('Unable to create the test room');
      }
    }
  }

  async createRoom(roomDto: RoomDto): Promise<Room> {
    return new Promise((resolve, reject) => {
      const createRoomDto = {
        ...this.authProfile,
        ...roomDto,
      };
      this.socket.emit('room.create', createRoomDto, (ack) => {
        if (ack.success) {
          resolve(ack.data);
        }
        else {
          reject(ack.error);
        }
      });
    });
  }

  async joinRoom(id: RoomId, password?: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const joinRoomDto = {
        ...this.authProfile,
        roomId: id,
        roomPassword: password,
      };
      this.socket.emit('room.join', joinRoomDto, (ack) => {
        if (ack.success) {
          resolve(ack.data);
        }
        else {
          reject(ack.error);
        }
      });
    });
  }

  private getRoomId(roomName: string): string {
    return roomName
      .trim()
      .toLocaleLowerCase()
      .replace(/(\s|\/|\\|\(|\)|\?|#|'|")/g, '-')
      .replace(/-+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

}
