import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm, usePage} from '@inertiajs/react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import PrimaryButton from '@/Components/PrimaryButton';
import React, {useState, useEffect} from 'react';
import Axios from "axios";

/*const events = [
    {title: 'Meeting', start: new Date()}
]*/

export default function Dashboard({auth, daysOfWeek}) {
    const isCompanyUser = auth.user && auth.user.role === 'Company';

    const [selectedWorkdays, setSelectedWorkdays] = useState({
        'monday': false,
        'tuesday': false,
        'wednesday': false,
        'thursday': false,
        'friday': false,
        'saturday': false,
        'sunday': false
    })

    const [timeOfWok, setTimeOfWork] = useState({
        startTime: '',
        endTime: ''
    })

    const [dataCompany, setDataCompany] = useState({});

    const {data, setData, post, processing} = useForm({
        time: {},
        workdays: {},
        company_id: auth.user.id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(timeOfWok.startTime);
        post(route('work-time'));
    };


    useEffect(() => {
        setData('workdays', selectedWorkdays);

    }, [selectedWorkdays]);

    useEffect(() => {
        setData('time', timeOfWok);

    }, [timeOfWok.startTime, timeOfWok.endTime]);

    useEffect(() => {
        if (isCompanyUser) {
            Axios.get('/companyWorkingHours', {
                params: {
                    company_id: auth.user.id
                }
            })
                .then((response) => {
                    const worksDays = response.data.data.worksDays;
                    const workTime = response.data.data.workingTime;
                    console.log(response.data.data);

                    setSelectedWorkdays({
                        'monday': worksDays.monday,
                        'tuesday': worksDays.tuesday,
                        'wednesday': worksDays.wednesday,
                        'thursday': worksDays.thursday,
                        'friday': worksDays.friday,
                        'saturday': worksDays.saturday,
                        'sunday': worksDays.sunday
                    });

                    setTimeOfWork({
                        startTime: workTime.start_time,
                        endTime: workTime.end_time
                    });


                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [isCompanyUser, auth.user.id]);

    const handleCheckboxChange = (e) => {
        const day = e.target.value;
        const isChecked = e.target.checked;

        setSelectedWorkdays((prevSelectedWorkdays) => ({
            ...prevSelectedWorkdays,
            [day.toLowerCase()]: isChecked,
        }));
    };


    /*function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <i>{eventInfo.event.title}</i>
            </>
        )
    }*/


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard"/>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                </div>

                {isCompanyUser && (
                    <div className="test max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-6 text-gray-900">
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="workHours">Your time of work:</label>
                                    <div className="flex items-center justify-center">
                                        <label htmlFor="startTime" className='mr-2'>From:</label>
                                        <input type="time" className='mr-8' id="startTime" name="startTime"
                                               value={timeOfWok.startTime}
                                               onChange={(e) => setTimeOfWork({
                                                   ...timeOfWok,
                                                   startTime: e.target.value
                                               })}/>
                                        <label htmlFor="endTime" className='mr-2'>to:</label>
                                        <input type="time" id="endTime" name="endTime" value={timeOfWok.endTime}
                                               onChange={(e) => setTimeOfWork({
                                                   ...timeOfWok,
                                                   endTime: e.target.value
                                               })}/>
                                    </div>
                                    <div className="flex items-center mt-4 space-x-2 justify-center">
                                        {daysOfWeek.map((day) => (
                                            <div key={day} className="mt-2 flex items-center space-x-1">
                                                <label htmlFor={day} className="text-gray-700">{day}</label>
                                                <input
                                                    type="checkbox"
                                                    id={day}
                                                    name="workdays"
                                                    value={day.toLowerCase()}
                                                    checked={selectedWorkdays[day.toLowerCase()]}
                                                    onChange={handleCheckboxChange}
                                                    className=" form-checkbox text-blue-500 h-5 w-5 ml-2"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className='flex items-center justify-center'>
                                        <PrimaryButton className="mt-4" disabled={processing}>
                                            Choose
                                        </PrimaryButton>
                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                )}
            </div>


            {/*<div>
                <h1>Demo App</h1>
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView='dayGridMonth'
                    weekends={false}
                    events={events}
                    eventContent={renderEventContent}
                />
            </div>*/}

        </AuthenticatedLayout>
    );
}
