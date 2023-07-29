import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Col, Form } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Employee = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchItem, setSearchItem] = useState('');
    const [searchType, setsearchType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const type = localStorage.getItem('TYPE');

    useEffect(() => {
        fetchData(currentPage);
      }, [currentPage]);

    const fetchData = async (page) => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/employee?page=${page}`);
          setData(response.data.data.data);
          setCurrentPage(response.data.data.current_page);
          setTotalPages(response.data.data.last_page);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const onDeleteEmployee = async(employee) => {
        if(!window.confirm("Are u sure?")){
            return
        }

        const response = await axios.delete(`http://localhost:8000/api/employee/${employee.id}`);
        fetchData();
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        try {
            if(searchItem !== ''){
                const filterResult = await axios.get(`http://localhost:8000/api/filterByEmployee?searchItem=${searchItem}&searchType=${searchType}`);
                setData(filterResult.data.data.data);
                setSearchItem('');
                setLoading(false);
            }
            } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };

  return (

    <div>
        <div className="row mt-5">
            <h4>Employee Lists</h4>
        </div>
        <div className="row ">
            <div className="col-6">
            <Row className="mb-3">
                <Col md={4}>
                <Form.Control
                    as="select"
                    value={searchType}
                    onChange={(e) => setsearchType(e.target.value)}
                >
                    <option value="">Select an option...</option>
                    <option value="employee">Employee Name</option>
                    <option value="department">Department Name</option>
                    <option value="staff">Staff Id</option>
                </Form.Control>
                </Col>
                <Col md={4}>
                <Form.Control
                    type="text"
                    placeholder="Enter text..."
                    name='Name'
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    required/>
                </Col>
                <Col md={2}>
                    <Button onClick={handleSearch} variant='secondary'>Search</Button>
                </Col>
                <Col md={2}>
                    <Button onClick={fetchData} variant='secondary'>Reset</Button>
                </Col>
            </Row>
            </div>
            {type === 'admin' &&
                <div className="col-6 text-end">
                    <Link to="/employee/create" className='btn btn-success mb-3'>Create Empoyee</Link>
                </div>
            }
        </div>
        {data.length > 0 ?
        <>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>Frist Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Emial</th>
            <th>Department</th>
            </tr>
        </thead>
        <tbody>
            {data.map((employee,index) => (
            <tr key={employee.id}>
                <td>{index+1}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>{employee.departments}</td>
                {type === 'admin' &&
                <>
                    <td>
                        <Link className="btn btn-info" to={'/employee/'+employee.id} >View</Link>
                    </td>
                    <td>
                        <Link className="btn btn-warning" to={'/employee/edit/'+employee.id} >Edit</Link>
                    </td>
                    <td>
                    <Button variant="danger" onClick={() => onDeleteEmployee(employee)}>
                        Delete
                    </Button>
                    </td>
                </>
                }
            </tr>
            ))}
        </tbody>
        </Table>
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li
                key={page}
                className={`page-item${page === currentPage ? ' active' : ''}`}
                >
                <button
                    className="page-link"
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
                </li>
            ))}
            </ul>
        </nav>
        </>
        :
        <h4>Data Not Found ...</h4>
        }
    </div>
  );
};

export default Employee;
