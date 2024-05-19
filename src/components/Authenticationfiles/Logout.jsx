import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import NewChecklist from './components/NewChecklist';
import SearchChecklist from './components/SearchChecklist';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login setUser={setUser} />} />
          <Route
            path="/new-checklist"
            element={user ? <NewChecklist setUser={setUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/search-checklist"
            element={user ? <SearchChecklist setUser={setUser} /> : <Navigate to="/" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
