import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Auth from './pages/Auth';

function App() {
   return (
      <BrowserRouter>
         <Routes>
            <Route path="" element={<Home />} />
            <Route path="auth" element={<Auth />} />
            <Route path="chat" element={<Chat />} />
         </Routes>
      </BrowserRouter>
   );
}

export default App;
