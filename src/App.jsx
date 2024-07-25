import { useState, useRef, useEffect } from 'react';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import rickVideo from "../src/assets/Rick Astley - Never Gonna Give You Up (Official Music Video).mp4"

function App() {
  const [userGuess, setUserGuess] = useState(0);
  const [guessCount, setGuessCount] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [result, setResult] = useState(null);
  const videoRef = useRef(null);

  const guessValStore = (event) => {
    setUserGuess(Number(event.target.value));
  }

  const guessing = () => {
    const randomNumber = Math.floor(Math.random() * 10 + 1);
    setResult(randomNumber);
    setGuessCount(prevCount => prevCount + 1);

    if (userGuess === randomNumber) {
      setCorrect(true);
      toast.success(`${randomNumber} is the number, it took ${guessCount + 1} guesses to get the answer`);
    } else if (userGuess > randomNumber) {
      toast.error("large value 😭");
    } else {
      toast.error("small value 😭");
    }
  }

  useEffect(() => {
    if (correct && videoRef.current) {
      videoRef.current.play();
    }
  }, [correct]);

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-[#1d1d1d] rounded-[20px]  p-6 text-center">
          <h1 className="text-white text-4xl font-extrabold font-serif mb-2">Number Guessing Game</h1>
          <h3 className="text-white  text-1xl font-mono">Enter your guess between 1-10</h3>
          <input type="number" value={userGuess} onChange={guessValStore} className="p-2 mb-4" />
          <input type="submit" onClick={guessing} className="p-2 m-4 bg-[#353535]  text-white cursor-pointer" />
          {correct && result && (
            <div>
              <video ref={videoRef} width="500" controls>
                <source src={rickVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;