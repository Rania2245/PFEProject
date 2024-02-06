import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";
import RequestList from "./CustomRequest/RequestList";
import RequestAdd from "./CustomRequest/RequestAdd";
import RequestModify from "./CustomRequest/RequestModify";
import RequestItem from "./CustomRequest/RequestItem";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/request" element={<RequestAdd />} />
        <Route path="/request/:id" element={<RequestModify />} />
        <Route path="/selectedRequest/:id" element={<RequestItem />} />
      </Routes>
    </div>
  );
}

export default App;
