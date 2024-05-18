import React, { useState, useEffect } from 'react';
import api from '../api/Api';
import logo from '../logo.png'

function NewChecklist(){
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState({});
  const [remarks, setRemarks] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        console.log('Fetched categories successfully:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Cannot fetch the categories, try again later:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleStatusChange = (itemId, value) => {
    setStatus((prevStatus) => ({ ...prevStatus, [itemId]: value }));
  };

  const handleRemarkChange = (itemId, value) => {
    setRemarks((prevRemarks) => ({ ...prevRemarks, [itemId]: value }));
  };

  const handleSubmit = async () => {
    const checklist = {
      checklist: { date },
      items: categories.reduce((acc, category) => {
        category.items.forEach((item) => {
          acc[item.id] = {
            status: status[item.id] || 'OK',
            remark: remarks[item.id] || ''
          };
        });
        return acc;
      }, {})
    };

    try {
      await api.post('/checklists', checklist);
      alert('Checklist has been saved to database.');
      setDate('');
      setStatus({});
      setRemarks({});
    } catch (error) {
      console.error('Error saving checklist, try again later.:', error);
    }
  };

  return (
    <div>
      <nav className='w-full p-[10px] justify-between'>
        <img src={logo} alt="logo_image" className='w-[100px] h-auto '/>
        <div>
          <h3>Dakawou Transport Limited</h3>
          <h3>Daily ICT Checklist</h3>
        </div>
      </nav>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </label>
      <table>
        <thead>
         <tr>
            <th className='items-header'>Items</th>
            <th className='status-header'>Status</th>
            <th className='remarks-header'>Remarks</th>
          </tr>
        </thead>
        <tbody>
          {categories && categories.length > 0 && categories.map((category) => (
            <React.Fragment key={category.id}>
              <tr>
                <td colSpan="3"><strong>{category.name}</strong></td>
              </tr>
              {category.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>
                    <select value={status[item.id] || 'OK'} onChange={(e) => handleStatusChange(item.id, e.target.value)}>
                      <option value="OK">OK</option>
                      <option value="NOT_OK">NOT OK</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="Remark"
                      value={remarks[item.id] || ''}
                      onChange={(e) => handleRemarkChange(item.id, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default NewChecklist;
