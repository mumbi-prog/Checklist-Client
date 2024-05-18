import React, { useState } from 'react';
import api from '../api/Api';
import checklist from './checklist.css';
import logo from '../logo.png';

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
        <nav className='nav-bar'>
        <img src={logo} alt="logo_image" className='w-[80px] h-auto '/>
        <div className='nav-titles text-xl font-bold'>
          <h3>Dakawou Transport Limited</h3>
          <h3>Daily ICT Checklist</h3>
        </div>
        <button className='logout-btn bg-button-color border-white text-white h-[35px] w-[130px] rounded-full align-center mt-[20px] mb-[25px] transition-transform transform hover:scale-105 hover:bg-white hover:text-button-color pointer'>Logout</button>
      </nav>
      
      <div className='search-wrapper'>
        <h2 className='search-heading'>Search Checklist by Date</h2>
        <label >
            Date:
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>
     

      {checklist && (
        <div>
          <h3 className='h3 text-center color:button-color underline mt-[12px] font-medium' >Checklist for {checklist.date}</h3>
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
