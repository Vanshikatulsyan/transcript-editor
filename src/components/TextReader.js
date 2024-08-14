import React, { useState, useEffect } from "react";
import "./TextReader.css"; // Import custom styles for the TextReader component

const TextReader = ({ initialText, duration }) => {
  const [text, setText] = useState(initialText);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [newWord, setNewWord] = useState("");

  const words = text.split(" ");

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentWordIndex((prevIndex) => {
          if (prevIndex < words.length - 1) {
            return prevIndex + 1;
          } else {
            clearInterval(interval);
            setIsPlaying(false);
            return prevIndex;
          }
        });
      }, duration);
    }

    return () => clearInterval(interval);
  }, [isPlaying, duration, words.length]);

  const handlePlay = () => {
    setCurrentWordIndex(0); // Reset the index to start from the beginning
    setIsPlaying(true);
  };

  const handleAddWord = () => {
    if (newWord.trim()) {
      setText((prevText) => `${prevText} ${newWord}`);
      setNewWord(""); // Clear the input field after adding the word
    }
  };

  return (
    <div className="text-reader">
      <div className="text-content">
        {words.map((word, index) => (
          <span
            key={index}
            style={{
              backgroundColor:
                index === currentWordIndex ? "purple" : "transparent",
              marginRight: "4px",
            }}
            contentEditable={true}
          >
            {word}
          </span>
        ))}
      </div>
      <button onClick={handlePlay} disabled={isPlaying} className="play-button">
        {isPlaying ? "Playing..." : "Play"}
      </button>
      <div className="add-word">
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="Type a new word"
          className="new-word-input"
        />
        <button onClick={handleAddWord} className="add-word-button">
          Add Word
        </button>
      </div>
    </div>
  );
};

export default TextReader;
