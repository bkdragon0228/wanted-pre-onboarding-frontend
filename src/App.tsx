import React from 'react';

import { useRoutes } from 'react-router-dom';
import { routes } from './routes';
import Gnb from './components/gnb';

function App() {
  const elem = useRoutes(routes)

  return (
    <div className="App">
      <Gnb />
      <main>
        {elem}
      </main>
    </div>
  );
}

export default App;
