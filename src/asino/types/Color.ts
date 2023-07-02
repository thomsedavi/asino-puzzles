export type AsinoColor = string | AsinoColorReference;

export type AsinoColorReference = {
  id?: string; // id of this color
  name?: string; // name of this color
  value?: AsinoColor;
}
