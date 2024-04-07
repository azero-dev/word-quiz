import { useState, useEffect, useRef } from "react";
import "./App.css";
import { fetchRandomWord, fetchSynonymsAndAntonyms } from "./Api";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordMode, setWordMode] = useState("");
  const [wordApi, setWordApi] = useState("");
  const [wordReady, setWordReady] = useState(false);
  const [synAnt, setSynAnt] = useState({});
  const [inputWord, setInputWord] = useState("");
  const inputRef = useRef();

  // control user input focus 
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0)

    return () => clearTimeout(timer);
  })

  const reset = () => {
    setInputWord("");
  };

  // Select the word mode
  const selectWordMode = () => {
    reset();
    setWordReady(false);
    const random = Math.floor(Math.random() * 2);
    setWordMode(random === 0 ? "synonyms" : "antonyms");
    handleFetchRandomWord();
  };

  // Start the game
  const handleGameStart = () => {
    setGameStarted(true);
    selectWordMode();
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
        setWordReady(true);
        console.log("Yes, you can see the correct answer here: ", data);
      } else {
        handleFetchRandomWord();
      }
    });
  };

  // Submit the word from form
  const submitWord = (event) => {
    event.preventDefault();
    // console.log("submitWord", inputWord, synAnt[wordMode]);

    if (synAnt[wordMode].includes(inputWord.toLowerCase())) {
      alert("Correct!");
      selectWordMode();
    } else {
      alert("Oops! wrong answer. Try again!");
      // console.log(synAnt[wordMode]);
      selectWordMode();
    }
  };

  return (
    <>
      {!gameStarted
        ? (<button onClick={handleGameStart}>Start game</button>) 
        : null
      }

      {!gameStarted
        ? null
        : (<p>Guess this word&apos;s <span style={{textDecoration: "underline"}}>{wordMode}</span>:</p>)
      }

      {!wordReady && gameStarted
        ? (<p>Searching for complex word...</p>)
        : (<p>{wordApi}</p>)}

      {!wordReady && !gameStarted
        ? null
        : (
          <form onSubmit={submitWord}>
            <input
              ref={inputRef}
              type="text"
              name="query"
              value={inputWord}
              onChange={(e) => setInputWord(e.target.value)}
            />
            <button type="submit">Go!</button>
          </form>
        )}
    </>
  );
}

export default App;
