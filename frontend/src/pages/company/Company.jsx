import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Company = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchData(currentPage);
      }, [currentPage]);

    const fetchData = async (page) => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/companies?page=${page}`);

          setCurrentPage(response.data.data.current_page);
          setTotalPages(response.data.data.last_page);

          setData(response.data.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const onDeleteCompany = async(company) => {
        if(!window.confirm("Are u sure?")){
            return
        }
        const response = await axios.delete(`http://localhost:8000/api/companies/${company.id}`);
        fetchData();
    }

    const handleSearch = async(e) => {
        e.preventDefault();
        try {
            if(companyName !== ''){
                const filterByCompanyName = await axios.get(`http://localhost:8000/api/filterByCompanyName?name=${companyName}`);
                setData(filterByCompanyName.data.data.data);
                setCompanyName('');
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
            <h4>Company Lists</h4>
        </div>
        <div className="row ">
            <div className="col-4">
            <Row className="mb-3">
                {/* <Col>
                <Form.Control
                    as="select"
                >
                    <option value="">Select an option...</option>
                    <option value="option1">Company Name</option>
                </Form.Control>
                </Col> */}
                <Col md={8}>
                <Form.Control
                    type="text"
                    placeholder="Enter text..."
                    name='companyName'
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
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
            <div className="col-8 text-end">
                <Link to="/company/create" className='btn btn-success mb-3'>Create Compnay</Link>
            </div>
        </div>

        {data.length > 0 ?
        <>
        <Table striped bordered hover>
        <thead>
            <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {data.map((company,index) => (
            <tr key={company.id}>
                <td>{index+1}</td>
                <td>{company.name}</td>
                <td>{company.email}</td>
                <td>{company.address}</td>
                <td>
                    <Link className="btn btn-info" to={'/company/'+company.id} >View</Link>
                </td>
                <td>
                    <Link className="btn btn-warning" to={'/company/edit/'+company.id} >Edit</Link>
                </td>
                <td>
                <Button variant="danger" onClick={() => onDeleteCompany(company)}>
                    Delete
                </Button>
                </td>
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

export default Company;
