import React, { useEffect, useState } from 'react'
import { Card, Container, ListGroup } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const ViewCompany = () => {
    const {id} = useParams();
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState([]);

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

  return (
    <>
    {loading && (
        <div>loading ...</div>
    )}
    {!loading &&
    <>
        <Container className='h-100'>
            <div className="row h-100 justify-content-center  align-items-center">
                <div className="col-8">
                    <h2>Company Information</h2>
                <Card>
                    <Card.Body>
                    <Card.Title>{data.name}</Card.Title>
                    <ListGroup variant="flush">
                        <ListGroup.Item>Email: {data.email}</ListGroup.Item>
                        <ListGroup.Item>Age: {data.address}</ListGroup.Item>
                    </ListGroup>
                    </Card.Body>
                </Card>
                <div className="row text-end">
                    <div className="col-12">
                        <Link to="/company" className='btn btn-success mb-3 mt-3 text-center'>Back</Link>
                    </div>
                </div>
                </div>
            </div>

        </Container>
        </>
    }
    </>
  )
}

export default ViewCompany
