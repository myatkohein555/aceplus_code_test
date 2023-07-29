import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';

const CreateCompany = () => {
    const navigate = new useNavigate();
    const {id} = useParams();
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        id:null,
        name:'',
        email:'',
        address:'',
    });

    const createCompany = async(e) => {
        e.preventDefault();
        const response = await axios.post(`http://localhost:8000/api/companies/`, data);
        navigate('/company');
    }

  return (
    <>
    {loading && (
        <div>loading ...</div>
    )}
    {!loading &&
    <Container className='h-100'>
        <div className="row h-100 justify-content-center  align-items-center">
            <div className="col-8">
            <h2 className='mb-3'>Create Company</h2>
            <Form onSubmit={createCompany} className='form-control'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name"  value={data.name} onChange={(e) => setData({...data, name:e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={data.email} onChange={(e) => setData({...data, email:e.target.value})} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="address" value={data.address} onChange={(e) => setData({...data, address:e.target.value})} />
                </Form.Group>
                <div className="row justify-content-center mb-3">
                    <div className="col-4">
                        <Link to="/company" className='btn btn-primary mb-3 mt-3 text-center form-control'>Back</Link>
                    </div>
                    <div className="col-4">
                        <Button type="submit" className="mt-3 form-control">Save</Button>
                    </div>
                </div>
            </Form>
            </div>
        </div>
    </Container>
    }
    </>
  )
}

export default CreateCompany
