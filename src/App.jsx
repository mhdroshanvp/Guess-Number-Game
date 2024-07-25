import { useState, useRef, useEffect } from 'react';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import rickVideo from "../src/assets/Rick Astley - Never Gonna Give You Up (Official Music Video).mp4";
import ReactConfetti from 'react-confetti';

function App() {
  const [userGuess, setUserGuess] = useState('');
  const [guessCount, setGuessCount] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);

  const guessValStore = (event) => {
    const value = Number(event.target.value);
    setUserGuess(value);
  }

  const guessing = () => {
    if (userGuess < 1 || userGuess > 10) {
      toast.error("Please enter a number between 1 and 10.");
      return;
    }

    const randomNumber = Math.floor(Math.random() * 10 + 1);
    setResult(randomNumber);
    setGuessCount(prevCount => prevCount + 1);

    if (userGuess === randomNumber) {
      setCorrect(true);
      toast.success(`${randomNumber} is the number, it took ${guessCount + 1} guesses to get the answer`);
    } else if (userGuess > randomNumber) {
      toast.error("Large value 😭");
    } else if (userGuess < randomNumber) {
      toast.error("Small value 😭");
    }
  }

  useEffect(() => {
    if (correct && videoRef.current) {
      videoRef.current.play();
    }
  }, [correct]);

  const refreshPage = () => {
    window.location.reload();
  }

  return (
    <>
      <Toaster />
      {correct && <ReactConfetti />}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#1d1d1d] rounded-[20px] p-6 text-center">
          <h1 className="text-white text-4xl font-extrabold font-serif mb-2">Number Guessing Game</h1>
          <h3 className="text-white text-1xl font-mono">Enter your guess between 1-10</h3>
          <input
            type="number"
            value={userGuess}
            onChange={guessValStore}
            className="p-2 mb-4"
            min="1"
            max="10"
            step="1"
            placeholder='0-10'
          />
          <input
            type="submit"
            onClick={guessing}
            className="p-2 m-4 bg-[#353535] text-white cursor-pointer rounded-[10px]"
          />
          {correct && result && (
            <div>
              <video ref={videoRef} width="500" controls>
                <source src={rickVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          <button
            onClick={refreshPage}
            className="mt-4 p-2 bg-[#323232] text-white rounded-[10px]"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
