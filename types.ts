export interface IService {
  flatten_name: string;
  real_name: string;
}
export type User = {
  uid: string;
  name: string;
  email: string;
  photoURL: string;
  city: string;
  description: string;
  logo: string;
  seek: boolean;
  emailVerified: boolean;
  configured: boolean;
  profileComments: string[];
  services: IService[];
  location: { lng: number; lat: number; address: string };
};

export interface ICity {
  id: string;
  name: string;
}
