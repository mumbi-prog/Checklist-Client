import React, { useState } from 'react';
import api from '../api/Api';

function SearchChecklist(){
  const [date, setDate] = useState('');
  const [checklist, setChecklist] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/checklists/${date}`);
      setChecklist(response.data);
    } catch (error) {
      console.error('Error fetching checklist:', error);
      setChecklist(null);
    }
  };

  return (
    <div>
      </div>
  );
};

export default SearchChecklist;
