export default interface CityFilter {
  id?: string;
  name_like?: string;
  state_like?: string;
  country_like?: string;
  createdAt_gte?: string;
  createdAt_lte?: string;
  updatedAt_gte?: string;
  updatedAt_lte?: string;
}
