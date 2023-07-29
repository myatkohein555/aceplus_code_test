import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';

const UpdateCompany = () => {
    const navigate = new useNavigate();
    const {id} = useParams();
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState({
        id:null,
        name:'',
        email:'',
        address:'',
    });

    useEffect(() => {
        fetchData();
      }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/companies/${id}`);
          setData(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const UpdateCompany = async(e) => {
        e.preventDefault();
        if(data.id){
            const response = await axios.put(`http://localhost:8000/api/companies/${data.id}`, data);
            navigate('/company');
        }

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
        <h2 className='mb-3'>Edit Company</h2>
            <Form onSubmit={UpdateCompany} className='form-control'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name"  value={data.name} onChange={(e) => setData({...data, name:e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={data.email} onChange={(e) => setData({...data, email:e.target.value})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="address" value={data.address} onChange={(e) => setData({...data, address:e.target.value})}/>
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

export default UpdateCompany
