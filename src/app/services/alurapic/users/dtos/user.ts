import UserType from 'src/app/enums/UserType';

export default interface User {
  id?: string;
  username: string;
  password: string;
  user_type?: UserType;
  created_at?: Date;
  updated_at?: Date;
}
