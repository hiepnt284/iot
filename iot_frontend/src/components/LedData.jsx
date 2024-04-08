import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import DatePicker from 'react-datepicker';
import moment from 'moment';  // Import moment library
import 'react-datepicker/dist/react-datepicker.css';
import '../sensor.css';

const LedData = () => {
    const [ledData, setLedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedDate, setSelectedDate] = useState(null);

    const itemsPerPage = 10;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8081/getAllAction');
            if (response.ok) {
                const data = await response.json();
                setLedData(data);
            } else {
                console.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const renderTableHeader = () => {
        return (
            <>
                <th key={"1"}>ID</th>
                <th key={"2"}>Time</th>
                <th key={"3"}>Device</th>
                <th key={"4"}>Action</th>
            </>
        );
    };

    const renderTableData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        // Filter data based on selected date
        const filteredData = selectedDate
            ? ledData.filter(
                (data) =>
                    moment(data.createdAt).format("YYYY-MM-DD") === moment(selectedDate).format("YYYY-MM-DD")
            )
            : ledData;

        return filteredData.slice(startIndex, endIndex).map((data) => {
            const { id, deviceName, action, createdAt } = data;
            const formattedDate = moment(createdAt).format('YYYY-MM-DD HH:mm:ss'); // Format date using moment
            return (
                <tr key={data.id}>
                    <td style={{ width: '150px' }}>{id}</td>
                    <td style={{ width: '150px' }}>{formattedDate}</td>
                    <td style={{ width: '150px' }}>{deviceName}</td>
                    <td style={{ width: '150px' }}>{action}</td>
                </tr>
            );
        });
    };

    const pageCount = Math.ceil(ledData.length / itemsPerPage);

    return (
        <>
            <div className='label'>DEVICE DATA</div>
            <div className='datepicker-container'>
                <label>Select Date: </label>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat='yyyy-MM-dd'
                />
            </div>
            <div className='sensor-container'>

                <table id='sensorData'>
                    <thead>{renderTableHeader()}</thead>
                    <tbody>{renderTableData()}</tbody>
                </table>
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    breakLabel={'...'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages'}
                    activeClassName={'active'}
                />
            </div>
        </>
    );
};

export default LedData;
