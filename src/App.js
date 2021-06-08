import React from 'react';
import './App.css';
import RecieverComponent from './components/RecieverComponent';
import SenderComponent from './components/SenderComponent';

function App() {

  return (
    <div className="App">
      <SenderComponent />
      <RecieverComponent/>
    </div>
  );
}

export default App;
