import { Card } from "./Card.model";

export interface PlayerCard extends Card {
  index: number;
  show: boolean;
}
