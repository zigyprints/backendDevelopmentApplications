import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, BrowserRouter, Routes } from "react-router-dom";
import Home from './components/home';
import Chats from './components/chats';
import ChatProvider from './Context/ChatProvider';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ChatProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chats" element={<Chats />} />
      </Routes>
      </ChatProvider>
    </BrowserRouter>
    </div>
  );
}

export default App;
