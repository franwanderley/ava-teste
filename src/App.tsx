import React from 'react';
import { ActivityProvider } from './providers/ActivityContext';
import { Home } from './pages/Home';
import './styles/global.css';

function App() {
  return (
    <ActivityProvider>
     <Home/>
    </ActivityProvider>
  );
}

export default App;
