import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';

const Login = () => {
const navigate = new useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flashMessage, setFlashMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:8000/api/login';

    try {
        const response = await axios.post(apiUrl, { email, password });
        if (response.status === 200) {
            localStorage.setItem('TOKEN', response.data.token);
            localStorage.setItem('TYPE', response.data.user.role);
            navigate('/');
          } else {
            setFlashMessage('Invalid credentials. Please try again.');
          }
      } catch (error) {
        setFlashMessage('Invalid credentials. Please try again.');
      }
  };

  return (
    <>
    <Container className='h-100'>
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="col-6">
            <h2 className='mb-3 text-center'>Login Form</h2>
            <Form onSubmit={handleLogin} className='form-control'>
                <Form.Group className="mb-3 mt-5" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
            {flashMessage && <div style={{ color: 'red' }}>{flashMessage}</div>}
                <div className="row justify-content-center mb-3">
                    <div className="col-6 text-center">
                        <Button type="submit" className="mt-3 form-control">Login</Button>
                    </div>
                </div>
            </Form>
            </div>
        </div>
    </Container>
    </>
    // <div>
    //   <h2>Login Form</h2>
    //   <form>
    //     <div>
    //       <label>Email:</label>
    //       <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
    //     </div>
    //     <div>
    //       <label>Password:</label>
    //       <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
    //     </div>
    //     <button type="button" onClick={handleLogin}>Login</button>
    //   </form>
    // </div>
  );
};

export default Login;
