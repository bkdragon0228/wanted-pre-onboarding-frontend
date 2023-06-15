import React from 'react';

import { useRoutes } from 'react-router-dom';
import { routes } from './routes';

function App() {
  const elem = useRoutes(routes)

  return (
    <div className="App">
        {elem}
    </div>
  );
}

export default App;
