import { v4 as uuidv4 } from 'uuid';
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContextProvider } from './Context/UserContext';
import ChatRoom from "./Components/ChatRoom";
import NotFound404 from './Components/NotFound404';


export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/chat/:id" element={<ChatRoom />} />
        <Route path="/" index element={<Navigate to={`/chat/${uuidv4()}`} />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </UserContextProvider>
  )
}

