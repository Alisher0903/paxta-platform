import { district_getOne_report } from '@/helpers/api';
import { useGlobalRequest } from '@/helpers/functions/restApi-function';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function V_hokim_hisobot() {
    const location = useLocation();
    const districtId = location.pathname.split('/').pop();
    //   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Initialize with today's date

    const { response, globalDataFunc } = useGlobalRequest(
        `${district_getOne_report}?machineId=${districtId}`,
        'GET'
    );

    useEffect(() => {
        globalDataFunc()
    }, [districtId]);

    return (
        <div className='container mx-auto'>
            <h1 className='text-3xl font-semibold uppercase'>V-Hokim | Hisobot</h1>
            {/* Display the fetched report data */}
            <div className='py-8'>
                {response && response.body !== null ? (
                    response?.body.map((report: {
                        farmName: string,
                        machineStatus: string,
                        hour: number,
                        minute: number,
                        startTime: string,
                        endTime: string,
                    }) => (
                        <div key={report.id} className='border p-4 my-2'>
                            <h2 className='font-semibold'>{report.farmName}</h2>
                            <p>Status: {report.machineStatus}</p>
                            <p>Hour: {report.hour}</p>
                            <p>Minute: {report.minute}</p>
                            <p>Start Time: {report.startTime}</p>
                            <p>End Time: {report.endTime}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}
