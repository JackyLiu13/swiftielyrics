import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import lyrics from '../data/lyrics.json';
import TimerBar from '../components/TimerBar';

const Game = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60); // 60 seconds game
  const [maxTime, setMaxTime] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [currentLyric, setCurrentLyric] = useState(null);
  const [userGuess, setUserGuess] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [hintLyrics, setHintLyrics] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [difficulty, setDifficulty] = useState('medium');
  const [skippedCount, setSkippedCount] = useState(0);
  const [skippedSongs, setSkippedSongs] = useState([]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !gameOver) {
      endGame();
    }
  }, [timeLeft, gameOver]);

  const endGame = () => {
    setGameOver(true);
  };

  useEffect(() => {
    newRound();
  }, []);

  const getRandomLyric = () => {
    const albums = Object.keys(lyrics);
    if (!albums.length) return null;
    
    const randomAlbum = albums[Math.floor(Math.random() * albums.length)];
    const songs = Object.keys(lyrics[randomAlbum]);
    if (!songs.length) return null;
    
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    const songLyrics = lyrics[randomAlbum][randomSong];
    if (!songLyrics.length) return null;
    
    const randomLyricIndex = Math.floor(Math.random() * songLyrics.length);
    const randomLyric = songLyrics[randomLyricIndex];

    return {
      title: randomSong,
      album: randomAlbum,
      prompt: randomLyric.lyric,
      answer: randomLyric.next,
      prev: randomLyric.prev
    };
  };

  const checkAnswer = (userGuess) => {
    if (!currentLyric) return;
    
    const isCorrect = userGuess.toLowerCase().trim() === currentLyric.answer.toLowerCase().trim();
    
    if (isCorrect) {
      setScore(prev => prev + (10 * (streak + 1) * getDifficultyMultiplier()));
      setStreak(prev => prev + 1);
      setIsCorrect(true);
      setTimeLeft(prev => Math.min(prev + 20, maxTime));
      setTimeout(newRound, 2000);
    } else {
      setStreak(0);
      addHint();
    }
  };

  const addHint = () => {
    if (!currentLyric) return;

    // First show album
    if (hintLyrics.length === 0) {
      setHintLyrics([`Album: ${currentLyric.album}`]);
      return;
    }

    // Keep track of already shown lyrics to avoid duplicates
    const shownLyrics = new Set(hintLyrics);
    
    // Find current lyric's index
    const currentIndex = lyrics[currentLyric.album][currentLyric.title].findIndex(
      line => line.lyric === currentLyric.prompt
    );

    // Try to add previous lyrics first
    let index = currentIndex - 1;
    while (index >= 0) {
      const prevLyric = lyrics[currentLyric.album][currentLyric.title][index].lyric;
      if (!shownLyrics.has(prevLyric)) {
        setHintLyrics(prev => [...prev, prevLyric]);
        return;
      }
      index--;
    }

    // If no more previous lyrics, try next lyrics
    index = currentIndex + 2; // Skip the answer lyric
    while (index < lyrics[currentLyric.album][currentLyric.title].length) {
      const nextLyric = lyrics[currentLyric.album][currentLyric.title][index].lyric;
      if (!shownLyrics.has(nextLyric)) {
        setHintLyrics(prev => [...prev, nextLyric]);
        return;
      }
      index++;
    }
  };

  const newRound = () => {
    setCurrentLyric(getRandomLyric());
    setUserGuess('');
    setShowTitle(false);
    setHintLyrics([]);
    setIsCorrect(false);
  };

  const getDifficultyMultiplier = () => {
    switch(difficulty) {
      case 'easy': return 1;
      case 'medium': return 1.5;
      case 'hard': return 2;
      default: return 1;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkAnswer(userGuess);
    }
  };

  const handleSkip = () => {
    setSkippedSongs(prev => [...prev, {
      title: currentLyric.title,
      album: currentLyric.album,
      prompt: currentLyric.prompt,
      answer: currentLyric.answer
    }]);
    setSkippedCount(prev => prev + 1);
    newRound();
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center p-4">
        <div className="bg-white border-4 border-black shadow-brutal p-8 max-w-md w-full space-y-6">
          <h2 className="text-4xl font-bold text-gray-800 border-b-4 border-black pb-4 text-center">
            Game Over!
          </h2>
          <div className="text-6xl font-bold text-pink-500 my-8 text-center">
            {score}
          </div>
          
          {skippedSongs.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 border-b-2 border-black pb-2">
                Skipped Songs ({skippedCount})
              </h3>
              <div className="space-y-4 max-h-60 overflow-y-auto">
                {skippedSongs.map((song, index) => (
                  <div key={index} className="p-4 bg-gray-50 border-2 border-black shadow-brutal">
                    <div className="font-bold">{song.title}</div>
                    <div className="text-sm text-gray-600">Album: {song.album}</div>
                    <div className="mt-2 text-sm">
                      <div className="font-medium">Prompt:</div>
                      <div className="italic">{song.prompt}</div>
                      <div className="font-medium mt-1">Answer:</div>
                      <div className="italic">{song.answer}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-pink-400 border-4 border-black text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-transform shadow-brutal"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full py-4 bg-yellow-200 border-4 border-black text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-transform shadow-brutal"
            >
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentLyric) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <div className="text-xl border-2 border-black p-4 bg-white shadow-brutal">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 border-4 border-black p-4 bg-white shadow-brutal inline-block w-2/3" 
              style={{ fontFamily: "'Bodoni MT', serif" }}>
            Swifties Lyrics
          </h1>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl border-2 border-black p-4 bg-white shadow-brutal">
            Score: {score}
          </div>
          <div className="flex-1 mx-4">
            <div className="text-center mb-2 text-lg font-bold">
              {timeLeft}s
            </div>
            <TimerBar timeLeft={timeLeft} maxTime={maxTime} />
          </div>
          <button
            onClick={() => setShowTitle(!showTitle)}
            className="px-4 py-2 bg-yellow-200 border-2 border-black shadow-brutal"
          >
            {showTitle ? currentLyric.title : 'Reveal Song Title'}
          </button>
        </div>

        <div className="space-y-4">
          {hintLyrics.map((hint, i) => (
            <div key={i} className="p-4 bg-white border-2 border-black shadow-brutal">
              {hint}
            </div>
          ))}
          
          <div className="p-6 bg-pink-300 border-4 border-black text-xl font-bold shadow-brutal">
            {currentLyric.prompt}
          </div>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full p-4 border-4 border-black text-lg shadow-brutal"
            placeholder="Type the next line..."
          />
          <div className="flex gap-4">
            <button
              onClick={() => checkAnswer(userGuess)}
              className="w-3/4 py-4 bg-pink-400 border-4 border-black text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-transform shadow-brutal"
            >
              Submit Guess
            </button>
            <button
              onClick={handleSkip}
              className="w-1/4 py-4 bg-gray-300 border-4 border-black text-xl font-bold hover:translate-x-1 hover:translate-y-1 transition-transform shadow-brutal"
            >
              Skip
            </button>
          </div>
        </div>

        {isCorrect && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-300 border-4 border-black p-8 text-2xl font-bold shadow-brutal">
            ✨ Correct! ✨
          </div>
        )}
      </div>
    </div>
  );
};

export default Game; 