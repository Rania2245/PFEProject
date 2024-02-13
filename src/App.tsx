import { Routes, Route } from "react-router-dom";

import RequestList from "./CustomRequest/RequestList";
import RequestAdd from "./CustomRequest/RequestAdd";
import RequestModify from "./CustomRequest/RequestModify";
import RequestItem from "./CustomRequest/RequestItem";
import "./App.css";
import Chatbot from "./CustomRequest/ChatBot";

import Login from "./Login/LogIn";
import PrivateRoutes from "./PrivateRoutes";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Login />} />
        {
          <Route element={<PrivateRoutes />}>
            <Route path="/requests" element={<RequestList />} />
            <Route path="/request/:id" element={<RequestModify />} />
            <Route path="/selectedRequest/:id" element={<RequestItem />} />
            <Route path="/addRequest" element={<RequestAdd />} />
            <Route path="/chatbot" element={<Chatbot />} />
          </Route>
        }
      </Routes>
    </div>
  );
}

export default App;
