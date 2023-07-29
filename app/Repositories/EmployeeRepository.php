<?php

namespace App\Repositories;

use App\Repositories\Interfaces\EmployeeRepositoryInterface;
use App\Models\Employee;

class EmployeeRepository implements EmployeeRepositoryInterface
{

    public function allEmployee()
    {
        return Employee::latest()->paginate(10);
    }

    public function storeEmployee($data)
    {
        return Employee::create($data);
    }

    public function findEmployee($id)
    {
        return Employee::find($id);
    }

    public function updateEmployee($data, $id)
    {
        $Employee = Employee::where('id', $id)->first();
        $Employee->firstName = $data['firstName'];
        $Employee->lastName = $data['lastName'];
        $Employee->staffId = $data['staffId'];
        $Employee->company = $data['company'];
        $Employee->departments = $data['departments'];
        $Employee->email = $data['email'];
        $Employee->phone = $data['phone'];
        $Employee->address = $data['address'];
        $Employee->save();
    }

    public function destroyEmployee($id)
    {
        $Employee = Employee::find($id);
        $Employee->delete();
    }

    public function filterByEmployee($data)
    {
        if($data['searchType'] == 'employee'){
            return Employee::where('firstName', $data['searchItem'])->paginate(10);
        }elseif($data['searchType'] == 'department'){
            return Employee::where('departments', $data['searchItem'])->paginate(10);
        }else{
            return Employee::where('staffId', $data['searchItem'])->paginate(10);
        }

    }
}
