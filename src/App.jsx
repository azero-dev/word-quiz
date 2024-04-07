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
  const [count, setCount] = useState(0);
  const [isCorrect, setIsCorrect] = useState(0);
  const inputRef = useRef();

  // control user input focus
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);

    return () => clearTimeout(timer);
  });

  //reset user input
  const reset = () => {
    setInputWord("");
  };

  // Select the word mode
  const selectWordMode = () => {
    reset();
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
      if (data.synonyms.length > 0 && data.antonyms.length > 0 && data.synonyms[0] !== "" && data.antonyms[0] !== ""){
        setSynAnt(data);
        setWordReady(true);
        console.log("Yes, you can see the correct answer here: ", data);
      } else {
        handleFetchRandomWord();
      }
    });
  };

  //Check counter
  const checkCounter = () => {
    if (count < 9) {
      setCount(count + 1);
      selectWordMode()
    } else {
      if (isCorrect < 5) {
        alert("You lose the game!");
      } else {
        alert("You win the game!");
      }
      setCount(0);
      setGameStarted(false);
    }
  };

  // Submit the word from form
  const submitWord = (event) => {
    event.preventDefault();
    // console.log("submitWord", inputWord, synAnt[wordMode]);
    setWordReady(false);
    if (synAnt[wordMode].includes(inputWord.toLowerCase())) {
      alert("Correct!");
      setIsCorrect(isCorrect + 1);
    } else {
      alert("Oops! wrong answer.");
      // console.log(synAnt[wordMode]);
    }
    checkCounter();
  };

  return (
    <>
      {!gameStarted
        ? <button onClick={handleGameStart}>Start game</button>
        : !wordReady
          ? <p>Searching for complex word...</p>
          : null
      }

      {!wordReady || !gameStarted
        ? null
        :
          <>
            <p>
              Guess this word&apos;s{" "}
              <span style={{ textDecoration: "underline" }}>
                {wordMode.slice(0, -1)}
              </span>:
            </p>
            <p>{wordApi}</p>
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
            <p>Correct answers: {isCorrect}</p>
            <p>Turn: {count + 1}/10</p>
          </>
      }
    </>
  );
}

export default App;
