import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, useForm} from '@inertiajs/react';
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
    });

    const {data, setData, post, processing} = useForm({
        startTime: '',
        endTime: '',
        workdays: {},
        company_id: auth.user.id
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('work-time'));
    };


    useEffect(() => {
        setData('workdays', selectedWorkdays);
    }, [selectedWorkdays]);

    /* useEffect(() => {
         // Conditionally execute the useEffect only if isCompanyUser is true
         if (isCompanyUser) {
             // Make a POST request to fetch data from Laravel controller with user ID
             Axios.post('/api/companyWorkingHours', {
                 user_id: auth.user.id, // Include the user ID in the request body
             })
                 .then((response) => {
                     const fetchedData = response.data;
                     console.log(fetchedData);
                 })
                 .catch((error) => {
                     console.error('Error fetching data:', error);
                 });
         }
     }, [isCompanyUser, auth.user.id]);*/

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
                    <div className="test max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <form onSubmit={handleSubmit}>


                            <label htmlFor="workHours">Години роботи:</label>
                            <div>
                                <label htmlFor="startTime">З:</label>
                                <input type="time" id="startTime" name="startTime" value={data.startTime}
                                       onChange={(e) => setData('startTime', e.target.value)}/>
                            </div>
                            <div>
                                <label htmlFor="endTime">До:</label>
                                <input type="time" id="endTime" name="endTime" value={data.endTime}
                                       onChange={(e) => setData('endTime', e.target.value)}/>
                            </div>
                            {daysOfWeek.map((day) => (
                                <div key={day}>
                                    <label htmlFor={day}>{day}</label>
                                    <input
                                        type="checkbox"
                                        id={day}
                                        name="workdays"
                                        value={day.toLowerCase()}
                                        checked={selectedWorkdays[day.toLowerCase()]}
                                        onChange={handleCheckboxChange}
                                    />
                                </div>
                            ))}

                            <PrimaryButton className="mt-4" disabled={processing}>
                                Choose
                            </PrimaryButton>
                        </form>
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
