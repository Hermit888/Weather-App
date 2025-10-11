import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Main from "./pages/main";
import DB from "./pages/db";
import "./App.css"

function App() {
  return(
    <Router>
      <div className="topbar">
        <nav className="tabs">
          <Link to="/main">🌦️Weather</Link>
          <Link to="/db">🛢Weather Database</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/main" element={<Main/>}/>
        <Route path='/db' element={<DB/>}/>
      </Routes>
    </Router>
  );
}

export default App;