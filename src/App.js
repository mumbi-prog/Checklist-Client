import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Authenticationfiles/Login';
import NewChecklist from './components/checklist/NewChecklist';
import SearchChecklist from './components/checklist/Search';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/new-checklist" element={<NewChecklist setUser={setUser} />} />
        <Route path="/search-checklist" element={<SearchChecklist setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
