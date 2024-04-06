import { useState } from "react";
import "./App.css";

function App() {
  const [wordApi, setWordApi] = useState("");
  const [synAnt, setSynAnt] = useState({});

  const urlWord = "https://api.api-ninjas.com/v1/randomword";
  const options = {
    method: "GET",
    headers: { "X-Api-Key": import.meta.env.VITE_APP_API_KEY },
  };

  const setArray = (word) => {
    const urlSynAnt = `https://api.api-ninjas.com/v1/thesaurus?word=${word}`;
    fetch(urlSynAnt, options)
      .then((response) => response.json())
      .then((data) => {
        setSynAnt(data);
      });
  };

  const getWord = () =>
    fetch(urlWord, options)
      .then((response) => response.json())
      .then((data) => {
        setWordApi(data.word);
        setArray(data.word);
      });


  return (
    <>
      <button onClick={() => getWord()}>Start game</button>
      <p>Guess this word:</p>
      {wordApi}
      {synAnt.synonyms}
    </>
  );
}

export default App;
