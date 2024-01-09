import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from "@inertiajs/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {useEffect, useState} from "react";
import Axios from "axios";

export default function Calendar({auth}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get('/companyWorkingTime/all')
            .then((response) => {
                const result = response.data;


                result.data.forEach((companyTimeOfWork) => {
                    const startTime = new Date(companyTimeOfWork.start_time);
                    const endTime = new Date(companyTimeOfWork.end_time);
                    companyTimeOfWork.start_time = `${startTime.getHours()}:${startTime.getMinutes()}:${startTime.getSeconds()}`;
                    companyTimeOfWork.end_time = `${endTime.getHours()}:${endTime.getMinutes()}:${endTime.getSeconds()}`;
                });

                setData(result.data)

            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);

    function getWorkingDays(companyTimeOfWork) {
        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const workingDays = [];

        daysOfWeek.forEach((day, index) => {
            if (companyTimeOfWork[day.toLowerCase()]) {
                workingDays.push(day);
            }
        });

        return workingDays.join(', ');
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Calendar"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg flex">
                        <div className="w-3/4 p-6 text-gray-900">
                            <FullCalendar
                                plugins={[dayGridPlugin]}
                                initialView="dayGridMonth"
                            /></div>
                        <div className="w-1/4 p-6 text-gray-900">
                            <h2 className="text-xl font-semibold border-b border-gray-300 py-2">Companies:</h2>
                            <ul>
                                {data.map((companyTimeOfWork) => (
                                    companyTimeOfWork.workCompany && (
                                        <li key={companyTimeOfWork.id} className="list-item border-b border-gray-300 py-2">
                                            <strong>{companyTimeOfWork.user.name}</strong><br/>
                                            Working hours: {companyTimeOfWork.start_time} - {companyTimeOfWork.end_time}<br/>
                                            Days: {getWorkingDays(companyTimeOfWork)}
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </AuthenticatedLayout>

    )
}
