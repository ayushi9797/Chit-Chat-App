import { Route,Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import ChatPage from './Pages/ChatPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<HomePage/> }/> 
       <Route path="/chats" element={<ChatPage/> } exact/> 
      {/* <Route path="/chats"/> */}
      </Routes>
    </div>
  );
}

export default App;
