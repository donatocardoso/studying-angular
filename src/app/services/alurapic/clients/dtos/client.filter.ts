export default interface ClientFilter {
  id?: string;
  name_like?: string;
  cityId?: string;  
  createdAt_gte?: string;
  createdAt_lte?: string;
  updatedAt_gte?: string;
  updatedAt_lte?: string;
}
