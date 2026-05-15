// src/types/index.ts
export interface User {
  _id: string;
  username: string;
  email: string;
  country: string;
  isAdmin: boolean;
}

export interface Gig {
  _id: string;
  title: string;
  package_price: number;
  category: string;
  user: {
    username: string;
  };
}