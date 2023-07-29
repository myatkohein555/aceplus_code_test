import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
// import router from './router.jsx'
import { BrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import DashboardLayout from './components/DashboardLayout';
import Company from './pages/company/Company';
import Employee from './pages/employee/Employee';
import Home from './pages/Home';
import CreateCompany from './pages/company/CreateCompany';
import ViewCompany from './pages/company/ViewCompany';
import UpdateCompany from './pages/company/UpdateCompany';
import CreateEmployee from './pages/employee/CreateEmployee';
import ViewEmployee from './pages/employee/ViewEmployee';
import UpdateEmployee from './pages/employee/UpdateEmployee';
import ExportEmployee from './pages/employee/ExportEmployee';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './ProtectedRoute';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter >
        <Routes>
            <Route path="/" element={<DashboardLayout/>}>
                <Route
                    path="/"
                    element={
                        <Home />
                    }
                />
                <Route
                    path="/company"
                    element={
                        <ProtectedRoute>
                            <Company />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/company/create"
                    element={
                        <ProtectedRoute>
                            <CreateCompany />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/company/:id"
                    element={
                        <ProtectedRoute>
                            <ViewCompany />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/company/edit/:id"
                    element={
                        <ProtectedRoute>
                            <UpdateCompany />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee"
                    element={
                        <Employee />
                    }
                />
                <Route
                    path="/employee/create"
                    element={
                        <ProtectedRoute>
                            <CreateEmployee />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/:id"
                    element={
                        <ProtectedRoute>
                            <ViewEmployee />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employee/edit/:id"
                    element={
                        <ProtectedRoute>
                            <UpdateEmployee />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/export/employee"
                    element={
                        <ProtectedRoute>
                            <ExportEmployee />
                        </ProtectedRoute>
                    }
                />







                {/* <Route path='/company' element={<Company/>}></Route>
                <Route path='/company/create' element={<CreateCompany/>}></Route> */}
                {/* <Route path='/company/:id' element={<ViewCompany/>}></Route>
                <Route path='/company/edit/:id' element={<UpdateCompany/>}></Route>

                <Route path='/employee' element={<Employee/>}></Route>
                <Route path='/employee/create' element={<CreateEmployee/>}></Route>
                <Route path='/employee/:id' element={<ViewEmployee/>}></Route>
                <Route path='/employee/edit/:id' element={<UpdateEmployee/>}></Route>

                <Route path='/export/employee' element={<ExportEmployee/>}></Route> */}
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='*' element={<NotFound />}></Route>
        </Routes>
    </BrowserRouter>
     {/* <RouterProvider router={router} /> */}
  </React.StrictMode>,
)
