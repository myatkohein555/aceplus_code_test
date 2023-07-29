<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyRequest;
use App\Repositories\Interfaces\CompanyRepositoryInterface;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    private $companyRepository;

    public function __construct(CompanyRepositoryInterface $companyRepository)
    {
        //
        $this->companyRepository = $companyRepository;
    }

    public function index()
    {
        //
        $companies = $this->companyRepository->allCompanies();

        return response()->json([
            'message' => 'Company Data retrieved successfully',
            'data' => $companies
        ], 200);
    }

    public function store(CompanyRequest $request)
    {
        //
        $data = $request->validated();

        $company = $this->companyRepository->storeCompany($data);

        if($company){
            return response()->json([
                'message' => 'Company Data created successfully',
                'data' => $company
            ], 201);
        }else{
            return response()->json(['message' => 'Failed to create data',], 500);
        }
    }

    public function show(string $id)
    {
        //
        $company = $this->companyRepository->findCompany($id);

        return response()->json(['data' => $company,], 200);
    }

    public function update(CompanyRequest $request, string $id)
    {
        //
        $data = $request->validated();

        $company = $this->companyRepository->updateCompany($data, $id);

        return response()->json([
            'message' => 'Company Data updated successfully',
        ], 201);

    }

    public function destroy(string $id)
    {
        //
        $comany = $this->companyRepository->destroyCompany($id);

        return response()->json(['message' => 'Company Data Successfully Deleted',], 200);
    }

    public function filterByCompanyName(Request $request)
    {
        //
        $companies = $this->companyRepository->filterByCompanyName($request->name);

        return response()->json([
            'message' => 'Company Data retrieved successfully',
            'data' => $companies
        ], 200);
    }
}
