const BASE_API = 'https://arborbotadmin.arborswap.org/metadata/info/';

export const fetch_metadata = async (id) => {
  const response = await fetch(BASE_API + id);
  const data = await response.json();
  return data;
}