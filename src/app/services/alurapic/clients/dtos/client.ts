import City from "../../cities/dtos/city";

export default interface Client {
  id?: string;
  name: string;
  city: City;
  createdAt: Date;
  updatedAt: Date;
}
