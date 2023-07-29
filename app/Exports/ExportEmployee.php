<?php

namespace App\Exports;

use App\Models\Employee;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class ExportEmployee implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    protected $data;

    function __construct($data)
    {
        $this->data = $data;
    }

    public function collection()
    {
        if($this->data['searchType'] == 'company'){
            $employee = Employee::join('companies', 'employees.company', '=', 'companies.id')
                        ->select('employees.id','employees.firstName','employees.lastName','employees.staffId','companies.name','employees.departments','employees.email','employees.phone','employees.address')
                        ->where('companies.name', 'like', '%' . $this->data['searchItem'] . '%')
                        ->select('companies.name')
                        ->get();
        }elseif($this->data['searchType'] == 'department'){
            $employee = Employee::join('companies', 'employees.company', '=', 'companies.id')
                        ->where('employees.departments',$this->data['searchItem'])
                        ->select('employees.id','employees.firstName','employees.lastName','employees.staffId','companies.name','employees.departments','employees.email','employees.phone','employees.address')
                        ->get();
        }else{
            $employee = Employee::join('companies', 'employees.company', '=', 'companies.id')
                        ->select('employees.id','employees.firstName','employees.lastName','employees.staffId','companies.name','employees.departments','employees.email','employees.phone','employees.address')
                        ->get();
        }

        return $employee;
    }

    public function headings(): array
    {
        return [
            '#',
            'Frist Name',
            'Last Name',
            'Staff Id',
            'Company',
            'Department',
            'Email',
            'Phone',
            'Address',
        ];
    }
}
