<?php

namespace App\Repositories;

use App\Repositories\Interfaces\CompanyRepositoryInterface;
use App\Models\Company;

class CompanyRepository implements CompanyRepositoryInterface
{

    public function allCompanies()
    {
        return Company::latest()->paginate(10);
    }

    public function storeCompany($data)
    {
        return Company::create($data);
    }

    public function findCompany($id)
    {
        return Company::find($id);
    }

    public function updateCompany($data, $id)
    {
        $Company = Company::where('id', $id)->first();
        $Company->name = $data['name'];
        $Company->email = $data['email'];
        $Company->address = $data['address'];
        $Company->save();
    }

    public function destroyCompany($id)
    {
        $Company = Company::find($id);
        $Company->delete();
    }

    public function filterByCompanyName($name)
    {
        return Company::where('name', 'like', '%' . $name . '%')->paginate(10);
    }
}
