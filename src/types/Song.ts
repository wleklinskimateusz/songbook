export interface Song {
  id?: string;
  title: string;
  filename: string;
  artist?: string;
  rating?: number;
  addedBy?: string;
  modified?: Date;
}
