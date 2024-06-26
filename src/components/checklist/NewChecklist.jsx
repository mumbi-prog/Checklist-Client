import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api';
import logo from '../logo.png';
import './checklist.css';

function NewChecklist({ setUser }) {
  const [date, setDate] = useState('');
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState({});
  const [remarks, setRemarks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
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
      alert('Checklist has been saved.');
      setDate('');
      setStatus({});
      setRemarks({});
    } catch (error) {
      console.error('Error saving checklist, try again later.:', error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div>
        <nav className='nav-bar'>
          <img src={logo} alt="logo_image" className='w-[80px] h-auto pointer' onClick={() => navigate('/new-checklist')} />
          <div className='nav-titles text-xl font-bold'>
            <h3>Dakawou Transport Limited</h3>
            <h3>Daily ICT Checklist</h3>
          </div>
          <button className='auth-btn bg-button-color border-white text-white h-[35px] w-[130px] rounded-full align-center mt-[20px] mb-[25px] transition-transform transform hover:scale-101 transition duration-300 ease-in hover:bg-white hover:text-button-color pointer ease-in' onClick={handleLogout}>Logout</button>
        </nav>
       <div className='w-[100%] bg-yellow no-wrap flex justify-center relative'>
         <label className='list-date flex items-center'>
           Enter date:
           <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='date-input ml-2 w-[200px] border-2 border-button-color rounded pointer text-center italic placeholder-italic placeholder-gray-400' />
         </label>
         <button className='find-record-btn  bg-button-color border-white text-white h-[35px] w-[130px] rounded-full align-center mb-[25px] transition-transform transform hover:scale-101 transition duration-300 ease-in hover:bg-white hover:text-button-color pointer ease-in absolute right-[1%]' onClick={() => navigate('/search-checklist')}>Find record</button>
       </div>
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
                    <select value={status[item.id] || 'OK'} onChange={(e) => handleStatusChange(item.id, e.target.value)} className='px-[18%] outline-none'>
                      <option value="OK">OK</option>
                      <option value="NOT_OK">NOT OK</option>
                    </select>
                  </td>
                  <td>
                    <input type="text" value={remarks[item.id] || ''} onChange={(e) => handleRemarkChange(item.id, e.target.value)} className='w-[95%] mx-[2%] outline-none' />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit} className='save-btn bg-button-color text-white h-[35px] w-[130px] rounded-full mt-0 align-center ml-[40%] mb-[25px] transition-transform transform hover:scale-105'>Save</button>
    </div>
  );
}

export default NewChecklist;

