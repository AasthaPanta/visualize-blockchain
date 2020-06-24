import React from 'react';
import MainRouter from './router';
import { BrowserRouter} from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
