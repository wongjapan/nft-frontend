const BASE_API = 'https://teleadmin.edscomp.com/metadata/info/';

export const fetch_metadata = async (id) => {
  const response = await fetch(BASE_API + id);
  const data = await response.json();
  return data;
}