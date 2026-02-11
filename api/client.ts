const BASE_URL = 'https://pokeapi.co/api/v2';

export async function request(url: string) {
  const res = await fetch(BASE_URL + url);

  if (!res.ok) {
    throw new Error('A problem with requesting of data');
  }
  return res.json();
}
