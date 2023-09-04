export interface StyleClass {
  id?: string;
  fill?: string;
  fillDark?: string;
  stroke?: string;
  strokeDark?: string;
}

export interface Solution {
  selectedClasses?: { objectId: string, classId: string }[]; // keep track of user selections
}
