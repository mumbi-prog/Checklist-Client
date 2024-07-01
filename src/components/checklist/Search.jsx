import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/Api';
import logo from '../logo.png';
import './checklist.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function SearchChecklist({ setUser }) {
  const [date, setDate] = useState('');
  const [checklist, setChecklist] = useState(null);
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const handleSearch = async () => {
    try {
      const response = await api.get(`/checklists/${date}`);
      setChecklist(response.data);
    } catch (error) {
      console.error('Error fetching checklist:', error);
      setChecklist(null);
    }
  };

  const generatePDF = () => {
    const input = contentRef.current;

    html2canvas(input, {
      scale: 3,
      ignoreElements: (element) => {
        if (element.classList.contains('search-wrapper')) {
          return true;
        }
        if (element.classList.contains('auth-btn') || element.classList.contains('new-record-btn')) {
          return true;
        }
        return false;
      },
    }).then((canvas) => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'px', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdf.internal.pageSize.getHeight();

    while (heightLeft > 0) {
      position -= pdf.internal.pageSize.getHeight();
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();
    }

    pdf.save('checklist.pdf');
    });
  };

  return (
    <div>
      <div className="search-content-table" ref={contentRef}>
              <nav className='nav-bar'>
        <img src={logo} alt="logo_image" className='w-[80px] h-auto pointer' onClick={() => navigate('/new-checklist')} />
        <div className='nav-titles text-xl font-bold'>
          <h3>Dakawou Transport Limited</h3>
          <h3>Daily ICT Checklist</h3>
        </div>
      </nav>
      <div >
        <div className='search-wrapper'>
          <h2 className='search-heading'>Search Checklist by Date</h2>
          <div className='search-container flex justify-center align-center w-[30%] mt-[15px] justify-around'>
            <p>Enter date: </p>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className='date-picker w-[200px] border-2 border-button-color rounded pointer text-center italic placeholder-italic placeholder-gray-400' />
            <button className='search-button' onClick={handleSearch}>Search</button>
          </div>
          <button className='new-record-btn  bg-button-color border-white text-white h-[35px] w-[170px] rounded-full align-center mb-[25px] transition-transform transform hover:scale-101 transition duration-300 ease-in hover:bg-white hover:text-button-color pointer ease-in absolute right-[1%]' onClick={() => navigate('/new-checklist')}>Create new record</button>
        </div>

        {checklist && (
          <div>
            <h3 className='h3 text-center color:button-color underline mt-[12px] font-medium'>Checklist for {checklist.date}</h3>
            <table className='search-table mb-[50px]'>
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
      </div>
      <button className='generate-pdf-btn bg-button-color border-white text-white h-[35px] w-[130px] rounded-full align-center mb-[25px] transition-transform transform hover:scale-101 transition duration-300 ease-in hover:bg-white hover:text-button-color pointer ease-in' onClick={generatePDF}>Generate PDF</button>
    </div>
  );
}

export default SearchChecklist;
