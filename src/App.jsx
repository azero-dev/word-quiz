import { useState } from "react";
import "./App.css";
import { fetchRandomWord, fetchSynonymsAndAntonyms } from "./Api";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordMode, setWordMode] = useState("");
  const [wordApi, setWordApi] = useState("");
  const [synAnt, setSynAnt] = useState({});
  const [inputWord, setInputWord] = useState("");
  
  const reset = () => {
    setInputWord("")
  }

  const selectWordMode = () => {
    reset()
    const random = Math.floor(Math.random() * 2)
    setWordMode(random === 0 ? "synonyms" : "antonyms")
    handleFetchRandomWord()
  }

  const handleGameStart = () => {
    setGameStarted(true)
    selectWordMode()
  };
  
  // Fecth the word
  const handleFetchRandomWord = () => {
    fetchRandomWord().then((data) => {
      setWordApi(data.word);
      handleFetchSynonymsAndAntonyms(data.word);
    });
  };

  // Fetch the synonyms and antonyms
  const handleFetchSynonymsAndAntonyms = (word) => {
    fetchSynonymsAndAntonyms(word).then((data) => {
      if (data.synonyms.length > 0 && data.antonyms.length > 0) {
        setSynAnt(data);
        console.log("fetchSynonymsAndAntonyms", data);
      } else {
        handleFetchRandomWord();
      }
    });
  };

  // Submit the word from form
  const submitWord = (event) => {
    event.preventDefault();
    console.log("submitWord", inputWord, synAnt[wordMode]);

    if (synAnt[wordMode].includes(inputWord)) {
      alert("Correct!");
      selectWordMode();
    } else {
      alert("Try again!");
      console.log(synAnt[wordMode]);
      selectWordMode();
    }
  };

  return (
    <>
      {!gameStarted ? (<button onClick={handleGameStart}>Start game</button>) : null}
      {!gameStarted ? null : (<p>Guess this word&apos;s {wordMode}:</p>)}
      {wordApi}
      <form onSubmit={submitWord}>
        <input type="text" name="query" onChange={e => setInputWord(e.target.value)} />
        <button type="submit">Go!</button>
      </form>
    </>
  )
}

export default App;
