import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Authenticationfiles/Login';
import NewChecklist from './components/checklist/NewChecklist';
import SearchChecklist from './components/checklist/Search';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Login setUser={setUser} />} />
            <Route path="/new-checklist" element={<NewChecklist setUser={setUser} />} />
            <Route path="/search-checklist" element={<SearchChecklist setUser={setUser} />} />
          </Routes>
        </div>
        <hr />
        <footer className="py-2 bg-gray-200 text-center text-xs font-semibold">
          <p>&copy; 2024 DTL. All rights reserved. Site created by Sylvia Mumbi.</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;
