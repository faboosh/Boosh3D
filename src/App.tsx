import React, { useEffect, useContext } from 'react';
import Boosh3D, { Scene } from './engine/lib/boosh3D';
import main from './engine/scenes/main';
import test from './engine/scenes/test';
import { rendererContext } from './contexts/rendererContext';
import DebugMenu from './components/DebugMenu';

function App() {
  const { renderer, setRenderer } = useContext(rendererContext);
  useEffect(() => {
    setRenderer(new Boosh3D());
  }, [])

  useEffect(() => {
    if (renderer) {
      renderer.mount('#render')
      renderer.addScene('main', main);
      renderer.addScene('test', test);

      renderer.setScene('main')
    }
  }, [renderer])
  return (
    <div className="App">
      <DebugMenu />
    </div>
  );
}

export default App;
