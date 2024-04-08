import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import '../sensor.css';
import moment from 'moment';  // Import moment library

const SensorData = () => {
    const [sensorData, setSensorData] = useState([]);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });
    const [selectedColumn, setSelectedColumn] = useState('All');
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8081/getAllSensor');
                const data = await response.json();
                setSensorData(data);
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures that the effect runs once after the initial render

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = () => {
        const sortedArray = [...sensorData];
        if (sortConfig.key !== null) {
            sortedArray.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortedArray;
    };

    const renderTableHeader = () => {
        const header =
            sensorData.length > 0
                ? selectedColumn === 'All'
                    ? Object.keys(sensorData[0])
                    : ['id', 'time', selectedColumn]
                : [];

        return header.map((key, index) => (
            <th key={index} onClick={() => handleSort(key)}>
                {key.toUpperCase()}
                {sortConfig.key === key && (
                    <span>{sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}</span>
                )}
            </th>
        ));
    };

    const renderTableData = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        const visibleColumns =
            sensorData && sensorData.length > 0
                ? selectedColumn === 'All'
                    ? Object.keys(sensorData[0])
                    : ['id', 'createdAt', selectedColumn]
                : [];

        return sortedData()
            .slice(startIndex, endIndex)
            .map((data) => {
                return (
                    <tr key={data.id}>
                        {visibleColumns.map((column, index) => (
                            <td key={index} style={{ width: '150px' }}>
                                {column == "createdAt" ? moment(data[column]).format('YYYY-MM-DD HH:mm:ss') : data[column]}
                            </td>
                        ))}
                    </tr>
                );
            });
    };

    const pageCount = Math.ceil(sensorData.length / itemsPerPage);

    return (
        <>
            <div className='label'>SENSOR DATA</div>
            <div className="select-container">
                <div>
                    <label>Show Column:</label>
                    <select
                        value={selectedColumn}
                        onChange={(e) => setSelectedColumn(e.target.value)}
                    >
                        <option value='All'>All</option>
                        <option value='temperature'>Temperature</option>
                        <option value='humidity'>Humidity</option>
                        <option value='light'>Light</option>
                    </select>
                </div>
            </div>

            <div className='sensor-container'>

                <table id='sensorData'>
                    <thead>
                        <tr>{renderTableHeader()}</tr>
                    </thead>
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

export default SensorData;








