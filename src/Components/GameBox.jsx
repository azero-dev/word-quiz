import { PropTypes } from 'prop-types';

function GameBox({ wordMode, wordApi, inputWord, setInputWord, submitWord, count, isCorrect, inputRef}) {
  return (
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
  );
}

export default GameBox;

// props validation
GameBox.propTypes = {
  wordMode: PropTypes.string.isRequired,
  wordApi: PropTypes.string.isRequired,
  inputWord: PropTypes.string.isRequired,
  setInputWord: PropTypes.func.isRequired,
  submitWord: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  isCorrect: PropTypes.number.isRequired,
  inputRef: PropTypes.object.isRequired,
};