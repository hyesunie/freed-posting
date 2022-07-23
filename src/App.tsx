import React, {useEffect} from 'react';
import { Reset } from 'styled-reset';
import './App.css';
import { readPostInfo } from './api';
import Home from './pages/Home';
import useAsync,{FetchState} from './Hooks/useAsync';


function App(): ReactElement  {

   const[state] = useAsync(readPostInfo)

  return (
    <>
    <Reset />
    <Home />
  </>
  );
}

export default App;
