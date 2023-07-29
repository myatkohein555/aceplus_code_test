<?php

namespace App\Http\Controllers\Api;

use App\Exports\ExportEmployee;
use App\Http\Controllers\Controller;
use App\Http\Requests\EmployeeRequest;
use App\Models\Employee;
use App\Repositories\Interfaces\EmployeeRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Maatwebsite\Excel\Facades\Excel;


class EmployeeController extends Controller
{
    private $employeeRepository;

    public function __construct(EmployeeRepositoryInterface $employeeRepository)
    {
        //
        $this->employeeRepository = $employeeRepository;
    }

    public function index()
    {
        //
        $employee = $this->employeeRepository->allEmployee();

        return response()->json([
            'message' => 'Company Data retrieved successfully',
            'data' => $employee
        ], 200);
    }

    public function store(EmployeeRequest $request)
    {
        //
        $data = $request->validated();

        $employee = $this->employeeRepository->storeEmployee($data);

        if($employee){
            return response()->json([
                'message' => 'Employee Data created successfully',
                'data' => $employee
            ], 201);
        }else{
            return response()->json(['message' => 'Failed to create data',], 500);
        }
    }

    public function show(string $id)
    {
        //
        $employee = $this->employeeRepository->findEmployee($id);

        return response()->json(['data' => $employee,], 200);
    }

    public function update(EmployeeRequest $request, string $id)
    {
        //
        $data = $request->validated();

        $employee = $this->employeeRepository->updateEmployee($data, $id);

            return response()->json([
                'message' => 'Employee Data updated successfully',
            ], 201);

    }

    public function destroy(string $id)
    {
        //
        $employee = $this->employeeRepository->destroyEmployee($id);

        return response()->json(['message' => 'Employee Data Successfully Deleted',], 200);
    }

    public function filterByEmployee(Request $request)
    {
        //

        $employee = $this->employeeRepository->filterByEmployee($request);

        return response()->json([
            'message' => 'Employee Data retrieved successfully',
            'data' => $employee
        ], 200);
    }

    public function export(Request $request)
    {
        $searchItem = $request->searchItem;
        $searchType = $request->searchType;

        $data = [
            'searchItem' => $searchItem,
            'searchType' => $searchType
        ];

        return Excel::download(new ExportEmployee($data), 'employees.xlsx');
    }
}
