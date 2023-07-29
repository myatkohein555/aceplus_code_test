import React, { useState } from 'react'
import { Form,Button, Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const ExportEmployee = () => {
    const navigate = new useNavigate();
    const [searchItem, setSearchItem] = useState('');
    const [searchType, setsearchType] = useState('');

    const handleExport = async(e) => {
        e.preventDefault();
        if(!window.confirm("Are u sure?")){
            return
        }
        console.log(searchItem,searchType);
            const link = `http://localhost:8000/api/export-employee?searchItem=${searchItem}&searchType=${searchType}`;
            window.open(link);
            navigate('/');

    }
  return (
    <>
        <div className="row mt-5">
        <h3 className='mb-3'>Export CSV</h3>

            <div className="col-4">
            <Row className="mb-3">
                <Col md={5}>
                <Form.Control
                    as="select"
                    value={searchType}
                    onChange={(e) => setsearchType(e.target.value)}
                >
                    <option value="">Select an option...</option>
                    <option value="all">All</option>
                    <option value="company">Company Name</option>
                    <option value="department">Department Name</option>
                </Form.Control>
                </Col>
                <Col md={5}>
                <Form.Control
                    type="text"
                    placeholder="Enter text..."
                    name='Name'
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                required/>
                </Col>
                <Col md={2}>
                    <Button onClick={handleExport} variant='secondary'>Export</Button>
                </Col>
            </Row>
            </div>
            <div className="col-6 text-end">
            </div>
        </div>
    </>
  )
}

export default ExportEmployee
