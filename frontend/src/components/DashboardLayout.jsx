import React from 'react'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'

const DashboardLayout = () => {
    const navigate = new useNavigate();
    const token = localStorage.getItem('TOKEN');
    const type = localStorage.getItem('TYPE');

    if(!token){
        return <Navigate to="/login" />
    }
    const Logout = (e) => {
        e.preventDefault();
        if(!window.confirm("Are u sure?")){
            return
        }
        localStorage.removeItem('TOKEN');
        localStorage.removeItem('TYPE');
        navigate('/login');
    }
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h1>Dashboard</h1>
        <ul>
            <Link to="/" className='nav-item' style={{textDecoration:'none'}}>
                <li>
                    Home
                </li>
            </Link>
            {type === 'admin' &&
                <Link to="/company" className='nav-item' style={{textDecoration:'none'}}>
                    <li>
                    Company
                    </li>
                </Link>
            }

            <Link to="/employee" className='nav-item' style={{textDecoration:'none'}}>
                <li>
                    Emplyoee
                </li>
            </Link>
            {type === 'admin' &&
                <Link to="/export/employee" className='nav-item' style={{textDecoration:'none'}}>
                    <li>
                        Export CSV
                    </li>
                </Link>
            }
            <p  className='nav-item' onClick={Logout} style={{textDecoration:'none'}}>
                <li>
                    Logout
                </li>
            </p>
        </ul>
      </div>
      <div className="content">
        <h1></h1>
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout




