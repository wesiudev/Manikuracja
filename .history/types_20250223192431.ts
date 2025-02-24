export interface IService {
  flatten_name: string;
  real_name: string;
  price: number;
  duration: number;
  description: string;
  isCustomService: boolean;
}
export interface Payment {
  amount: number;
  date: string;
  result: string;
}
export type PortfolioImage = {
  src: string;
  text: string;
};
export type User = {
  uid: string;
  name: string;
  email: string;
  description: string;
  logo: string;

  seek: boolean;
  emailVerified: boolean;
  configured: boolean;
  active: boolean;
  profileComments: string[];
  password: string;

  portfolioImages: PortfolioImage[];
  payments: Payment[];
  services: IService[];
  location: { lng: number; lat: number; address: string };
  phoneNumber: string;
};

export interface ICity {
  id: string;
  name: string;
}
export type PostSample = {
  url: string;
  id: string;
  type: string;
  title: string;
  shortDesc: string;
  tags: string;
  image: string;
  text1Title: string;
  text1Desc: string;
  text2Title: string;
  text2Desc: string;
  text3Title: string;
  text3Desc: string;
  text4Title: string;
  text4Desc: string;
  text5Title: string;
  text5Desc: string;
  text6Title: string;
  text6Desc: string;
  text7Title: string;
  text7Desc: string;
};
