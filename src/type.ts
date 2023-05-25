export interface IItem {
  id: number;
  title: string;
  status: StatusEnum;
}

export enum StatusEnum {
  TO_DO = "To DO",
  IN_PROGRESS = "In Progress",
  DONE = "Done",
}
