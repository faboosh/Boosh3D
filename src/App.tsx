import React, { useEffect } from 'react';
import init from './engine';


function App() {
  useEffect(() => {
    const game = init();
    game.setScene('test')
  }, [])
  return (
    <div className="App">
      <canvas id="render"></canvas>
    </div>
  );
}

export default App;
