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
     
    
    </div>
  );
};

export default NewChecklist;
