const urlWord = "https://api.api-ninjas.com/v1/randomword";
const options = {
  method: "GET",
  headers: { "X-Api-Key": import.meta.env.VITE_APP_API_KEY },
};

export const fetchRandomWord = () => 
  fetch(urlWord, options)
    .then((response) => response.json());

export const fetchSynonymsAndAntonyms = (word) => {
  const urlSynAnt = `https://api.api-ninjas.com/v1/thesaurus?word=${word}`;
  return fetch(urlSynAnt, options)
    .then((response) => response.json());
};
