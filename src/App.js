import React from "react";
import TextReader from "./components/TextReader";
import "./App.css";

function App() {
  const initialText =
    "This is a sample text that will be highlighted word by word.";
  const duration = 500; // Duration in milliseconds for each word

  return (
    <div className="App">
      <h1>Editable Text Reader</h1>
      <TextReader initialText={initialText} duration={duration} />
    </div>
  );
}

export default App;
