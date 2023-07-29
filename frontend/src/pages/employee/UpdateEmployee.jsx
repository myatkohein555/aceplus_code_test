import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';

const UpdateEmployee = () => {
    const navigate = new useNavigate();
    const {id} = useParams();
    const [loading,setLoading] = useState(false);
    const [company,setCompany] = useState([]);
    const [data,setData] = useState({
        id:null,
        firstName:'',
        lastName:'',
        staffId:'',
        company:'',
        departments:'',
        email:'',
        phone:'',
        address:'',
    });

    useEffect(() => {
        fetchData();
        fetchCompany();
      }, []);

      const fetchCompany = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/companies`);
          setCompany(response.data.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:8000/api/employee/${id}`);
          setData(response.data.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    };

    const UpdateEmployee = async(e) => {
        e.preventDefault();
        if(data.id){
            const response = await axios.put(`http://localhost:8000/api/employee/${data.id}`, data);
            navigate('/employee');
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
            <h2 className='mb-3'>Create Employee</h2>
            <Form onSubmit={UpdateEmployee} className='form-control'>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="First Name"  value={data.firstName} onChange={(e) => setData({...data, firstName:e.target.value})} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Last Name"  value={data.lastName} onChange={(e) => setData({...data, lastName:e.target.value})} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Staff ID</Form.Label>
                    <Form.Control type="number" placeholder="12345" value={data.staffId} onChange={(e) => setData({...data, staffId:e.target.value})} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={data.email} onChange={(e) => setData({...data, email:e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="number" placeholder="09xxxxxx" value={data.phone} onChange={(e) => setData({...data, phone:e.target.value})} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Department</Form.Label>
                    <Form.Control type="text" placeholder="Department" value={data.departments} onChange={(e) => setData({...data, departments:e.target.value})} />
                </Form.Group>

                {!loading &&
                    <>
                        <Form.Label>Select Company</Form.Label>
                        <Form.Select aria-label="Default select example" value={data.company} onChange={(e) => setData({...data, company:e.target.value})}>
                            <option>Open this select menu</option>
                                {company.map((c)=>{
                                    return (
                                        <option key={c.id} value={c.id} required>{c.name}</option>
                                    )
                                })}
                    </Form.Select>
                    </>
                }


                <Form.Group className="mb-3 mt-1" controlId="exampleForm.ControlInput3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="address" value={data.address} onChange={(e) => setData({...data, address:e.target.value})} />
                </Form.Group>

                <div className="row justify-content-center mb-3">
                    <div className="col-4">
                        <Link to="/employee" className='btn btn-primary mb-3 mt-3 text-center form-control'>Back</Link>
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

export default UpdateEmployee
