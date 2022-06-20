import type { Bid } from './bid';
import type { Card } from './card';
import type { Player, PlayerPosition } from './player';

export type Round = {
  leadPosition: PlayerPosition;
  currentPosition: PlayerPosition;
  trick?: Array<Card>;
  bids?: Array<Bid>;
  trickWinner?: Player;
  foolReceiver?: Player;
};
