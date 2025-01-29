export const fetchEpisodes = async () => {
  const res = await fetch("https://rickandmortyapi.com/api/episode");
  return res.json();
};
