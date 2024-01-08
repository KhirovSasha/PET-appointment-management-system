<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\Constants;
use App\Http\Controllers\Controller;
use App\Models\CompanyWorkingHours;
use Illuminate\Http\Request;
use Carbon\Carbon;

class DasboardController extends Controller
{
    function companyTime(Request $request)
    {
        $company_id = $request->input('company_id');

        $companyTimeOfWork = CompanyWorkingHours::where('company_id', $company_id)->first();

        if (!$companyTimeOfWork) {
            return response()->json(['message' => 'No data found for the given company_id']);
        }

        $workingTime = [
            'start_time' => Carbon::parse($companyTimeOfWork->start_time)->format('H:i:s'),
            'end_time' => Carbon::parse($companyTimeOfWork->end_time)->format('H:i:s')
        ];

        $worksDays = [];
        $daysOfWeek = Constants::DAYS_OF_WEEK;

        foreach ($daysOfWeek as $day) {
            $worksDays[$day] = $companyTimeOfWork->$day;
        }

        $responseData = [
            'worksDays' => $worksDays,
            'workingTime' => $workingTime
        ];

        return response()->json(['message' => 'Data received successfully', 'data' => $responseData]);
    }
}
