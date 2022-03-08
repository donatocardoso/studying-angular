import City from "../../cities/dtos/city";

export default interface Client {
  id?: string;
  name: string;
  city: City;
  created_at: Date;
  updated_at: Date;
}
