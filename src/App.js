import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Game from './routes/Game';

function App() {
  return (
    <Router basename="/swiftielyrics">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
