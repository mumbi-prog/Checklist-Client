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
      <h2>Search Checklist by Date</h2>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <button onClick={handleSearch}>Search</button>

      {checklist && (
        <div>
          <h3>Checklist for {checklist.date}</h3>
          <table>
            <thead>
                <tr>
                    <th className='items-header'>Items</th>
                    <th className='status-header'>Status</th>
                    <th className='remarks-header'>Remarks</th>
                </tr>
            </thead>
            <tbody>
              {checklist.categories.map((category) => (
                <React.Fragment key={category.id}>
                  <tr>
                    <td colSpan="3"><strong>{category.name}</strong></td>
                  </tr>
                  {category.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                      <td>{item.remark}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchChecklist;
