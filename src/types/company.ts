export type Company = {
  _id: number | string;
  name: string;
  description: string;
  website: string;
  location: string;
  logo?: string; // URL string
};
