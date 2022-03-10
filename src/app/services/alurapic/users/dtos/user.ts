import UserType from 'src/app/enums/UserType';

export default interface User {
  id?: string;
  username: string;
  password: string;
  userType?: UserType;
  createdAt?: Date;
  updatedAt?: Date;
}
