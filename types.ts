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
  seek: boolean;
  emailVerified: boolean;
  profileComments: string[];
  services: string[];
};
