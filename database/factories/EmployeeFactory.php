<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Employee>
 */
class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            'firstName' => $this->faker->firstName,
            'lastName' => $this->faker->lastName,
            'staffId' => $this->faker->unique()->randomNumber(5),
            'Company' => function () {
                return Company::factory()->create()->id;
            },
            'Departments' => $this->faker->word,
            'email' => $this->faker->unique()->safeEmail,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ];
    }
}
