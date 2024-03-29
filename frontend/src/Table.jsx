import React, { useEffect, useState } from 'react';

export default function Table() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [numberOfDays, setNumberOfDays] = useState('');
  const [datesExcluded, setDatesExcluded] = useState([]); // Initialize as an array
  const [leadCount, setLeadCount] = useState('');
  const [expectedDrr, setExpectedDrr] = useState('');
  const [savedData, setSavedData] = useState([]);
  const [startMonth, setStartMonth] = useState('');
  const [startYear, setStartYear] = useState('');

  const generateRandomId = (length) => {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    calculateDateDifference(e.target.value, endDate);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    calculateDateDifference(startDate, e.target.value);
  };

  const calculateDateDifference = (start, end) => {
    const startDateObj = new Date(start);
    const endDateObj = new Date(end);

    if (!isNaN(startDateObj) && !isNaN(endDateObj)) {
      const timeDifference = endDateObj - startDateObj;
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const years = Math.floor(days / 365);
      const months = Math.floor((days % 365) / 30);
      const remainingDays = days - (years * 365) - (months * 30);
      
      setNumberOfDays(remainingDays);
      setStartMonth(startDateObj.getMonth() + 1);
      setStartYear(startDateObj.getFullYear());
      
    } else {
      setNumberOfDays('');
      setStartMonth('');
      setStartYear('');
      setExpectedDrr('');
    }
  };
  // const Drr = leadCount / numberOfDays;

  const handleSaveData = () => {
    const currentDate = new Date();
    const lastUpdate = currentDate.toLocaleString();
    const randomId = generateRandomId(2);
    const Drr = leadCount / numberOfDays;
    
    const newRow = {
      id: randomId,
      startDate,
      endDate,
      monthYear,
      startMonth,
      startYear,
      datesExcluded,
      numberOfDays,
      leadCount,
      Drr,
      lastUpdate,
    };


    // fetch('https://hunt-mediass.vercel.app/api/saveData', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(newRow),
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       // If the request was successful, you can clear the form and update the UI.
    //       setSavedData([...savedData, newRow]);
    //       setStartDate('');
    //       setEndDate('');
    //       setMonthYear('');
    //       setLeadCount('');
    //       setExpectedDrr('');
    //       setDatesExcluded([]);
    //     } else {
    //       // Handle the error case if needed
    //       console.error('Failed to save data');
    //     }
    //   })
    //   .catch((error) => {
    //     console.error('Error while saving data:', error);
    //   });



    setSavedData([...savedData, newRow]);

    // Clear the form
    setStartDate('');
    setEndDate('');
    setMonthYear('');
    setLeadCount('');
    setExpectedDrr('');
    setDatesExcluded([]);
  };
  console.log(savedData)




  
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <td>Action</td>
          <td>ID</td>
          <td>Start Date</td>
          <td>End Date</td>
          <td>Month, Year</td>
          <td>Dates Excluded</td>
          <td>Number of days</td>
          <td>Lead Count</td>
          <td>Expected DRR</td>
          <td>Last Update</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
          <td></td>
          <td>
            <input
              type="date"
              className="form-control datepicker"
              value={startDate}
              onChange={handleStartDateChange}
            />
          </td>
          <td>
            <input
              type="date"
              className="form-control datepicker"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </td>
          <td>{startMonth},{startYear}</td>
          <td>{/* Display datesExcluded here */}</td>
          <td>{numberOfDays}</td>
          <td>
            <input
              type="number"
              value={leadCount}
              className="form-control"
              onChange={(e) => setLeadCount(e.target.value)}
            />
          </td>
          <td>
            
          </td>
          <td className="d-flex gap-2">
            <button className="btn btn-success" onClick={handleSaveData}>
              Save
            </button>
            <button className="btn btn-danger">Cancel</button>
          </td>
        </tr>
        {
          savedData.map((data,index)=>(
            <tr key={index}>
              <td></td>
              <td>{data.id}</td>
              <td>{data.startDate}</td>
              <td>{data.endDate}</td>
              <td>{data.startMonth},{data.startYear}</td>
              <td>{data.datesExcluded}</td>
              <td>{data.numberOfDays}</td>
              <td>{data.leadCount}</td>
              <td>{data.Drr}</td>
              <td>{data.lastUpdate}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
