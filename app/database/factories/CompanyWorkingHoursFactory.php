<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CompanyWorkingHours>
 */
class CompanyWorkingHoursFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'company_id' => User::factory()->company(),
            'monday' => $this->faker->boolean,
            'tuesday' => $this->faker->boolean,
            'wednesday' => $this->faker->boolean,
            'thursday' => $this->faker->boolean,
            'friday' => $this->faker->boolean,
            'saturday' => $this->faker->boolean,
            'sunday' => $this->faker->boolean,
            'start_time' => $this->faker->time,
            'end_time' => $this->faker->time,
        ];
    }
}
