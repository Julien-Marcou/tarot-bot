import type { Bid } from './bid';
import type { Card } from './card';
import type { DiscardableCards } from './discardable-cards';
import type { Suit } from './suit';

export type PlayerState = {
  isBidding: boolean;
  isCallingPartner: boolean;
  isMakingAside: boolean;
  isPlayingCard: boolean;
  validBids?: Partial<Record<Bid, boolean>>;
  callableCards?: ReadonlyArray<Card>;
  discardableCards?: DiscardableCards;
  playableCards?: ReadonlyArray<Card>;
  aside: Array<Card>;
  isAsideValid: boolean;
  discardedTrumpCount: number;
  disabledCards: Record<Suit, Record<number, boolean>>;
};
