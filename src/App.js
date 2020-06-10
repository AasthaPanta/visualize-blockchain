import React from 'react';
import MainRouter from './router';
import { BrowserRouter} from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
