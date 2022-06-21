import { ArtificialIntelligence } from './artificial-intelligence';
import { Client } from './client';
import { RoomSettings } from './models/dto/create-room.dto';
import { WinConditionType } from './models/tarot/win-condition';

export class Game {

  private readonly client = new Client({
    userPseudo: 'Tarot Bot',
    userAvatar: 'bee',
  });

  private readonly roomSettings: RoomSettings = {
    roomId: 'ai-test',
    roomName: 'AI Test',
    roomPassword: 'AI Password',
    gameSize: 4,
    gameWinConditionValue: 1,
    gameWinConditionType: WinConditionType.GamesPlayed,
  };

  private readonly artificialIntelligence = new ArtificialIntelligence();

  async start(): Promise<void> {
    await this.client.createOrJoinRoom(this.roomSettings);

    this.client.socket.on('game.bidRequest', (validBids) => {
      this.client.socket.emit('game.makeBid', this.artificialIntelligence.makeBid(validBids));
    });

    this.client.socket.on('game.partnerCallRequest', (callableCards) => {
      this.client.socket.emit('game.callPartner', this.artificialIntelligence.callPartner(callableCards));
    });

    this.client.socket.on('game.asideRequest', (discardableCards) => {
      this.client.socket.emit('game.setAside', this.artificialIntelligence.setAside(discardableCards));
    });

    this.client.socket.on('game.cardRequest', (playableCards) => {
      this.client.socket.emit('game.playCard', this.artificialIntelligence.playCard(playableCards));
    });

    this.client.socket.on('game.handReceived', (hand) => {
      console.log(hand);
    });
  }

  stop(): void {
    this.client.socket.close();
  }

}
