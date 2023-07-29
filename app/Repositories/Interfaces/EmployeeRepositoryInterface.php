<?php
namespace App\Repositories\Interfaces;

Interface EmployeeRepositoryInterface{

    public function allEmployee();
    public function storeEmployee($data);
    public function findEmployee($id);
    public function filterByEmployee($data);
    public function updateEmployee($data, $id);
    public function destroyEmployee($id);
}
