<?php

namespace App\Http\Controllers\Company;

use App\Helpers\Constants;
use App\Http\Controllers\Controller;
use App\Models\CompanyWorkingHours;
use Illuminate\Http\Request;

class CompanyWorkingTimeController extends Controller
{
    function store(Request $request)
    {

        $data = $request->all();

        $daysOfWeek = Constants::DAYS_OF_WEEK;

        $workingDays = array_intersect_key($data['workdays'], array_flip($daysOfWeek));
        $workingDays = array_map('boolval', $workingDays);

        $tableData = [
                'start_time' => $data['startTime'],
                'end_time' => $data['endTime'],
            ] + $workingDays;

        $companyWorkingHours = CompanyWorkingHours::firstOrNew(['company_id' => $data['company_id']]);
        $companyWorkingHours->fill($tableData);
        $companyWorkingHours->save();

        return response()->json(['message' => 'Дані успішно отримані та оброблені']);
    }
}