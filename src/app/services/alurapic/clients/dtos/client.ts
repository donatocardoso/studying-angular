import City from '../../cities/dtos/city';

export default interface Client {
  id?: number;
  name: string;
  cityId: number;
  createdAt?: Date;
  updatedAt?: Date;

  city?: City;
}
