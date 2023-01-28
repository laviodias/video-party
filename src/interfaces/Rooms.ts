export interface IRoom {
  id: string;
  fields: IFields;
}

export interface IFields {
  name: string;
  url: string;
  author: string;
  title: string;
  id?: string;
}
