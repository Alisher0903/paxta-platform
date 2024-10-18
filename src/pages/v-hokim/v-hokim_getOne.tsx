import { Card } from '@/components/ui/card-hover-effect';
import { district_getOne } from '@/helpers/api';
import { useGlobalRequest } from '@/helpers/functions/restApi-function';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function V_hokim_getOne() {
    const location = useLocation();
    const districtId = location.pathname.split('/').pop();
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])

    const { response, globalDataFunc } = useGlobalRequest(`${district_getOne}?page=0&size=10&districtId=${districtId}&date=${selectedDate}`, 'GET');

    const navigate = useNavigate()

    useEffect(() => {
        globalDataFunc()
    }, [selectedDate])
    return (
        <div className=''>
            <h1 className='text-2xl font-semibold pb-10'>Machine Details</h1>
            <Input
                className={'custom-input w-40 my-2'}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="flex justify-center py-16">
                {response && response.body !== null && <h1 className='text-3xl font-semibold uppercase'>{response.message} tumaniga tegishli barcha mashinalar hisoboti</h1>}
            </div>
            <div className=" flex flex-wrap gap-4 justify-between">
                {response && response?.body?.object?.length > 0 ? (
                    response?.body?.object?.map((machine: {
                        machineModel: string,
                        machineId: string,
                        cottonSize: string,
                    }) => (
                        <div key={machine.machineId} className='md:w-[400px] text-white bg-[#6a9c89] rounded-md'>
                            <Card
                                onClick={() => {
                                    navigate(`/v-hokim/v-hokim_getOne/${machine.machineId}`)
                                }}
                            >
                                <h1 className='text-2xl font-semibold uppercase'>
                                    {machine.machineId || '0'}
                                </h1>
                                <p className='text-sm md:text-lg flex justify-between uppercase'><span className='font-semibold'>Mashina Modeli: </span><span>{machine.machineModel || 'Yuqoridagi'}</span></p>
                                <p className='text-sm md:text-lg flex justify-between uppercase'><span className='font-semibold'>Mashina Raqami: </span><span>{machine.machineId || '0'}</span></p>
                                <p className='text-sm md:text-lg flex justify-between uppercase'><span className='font-semibold'>Yig'ilgan Paxta: </span><span>{machine.cottonSize || '0'}</span></p>
                            </Card>
                        </div>
                    ))
                ) : (
                    <div>Bu san'ada hech qanday mashina ishlamayapti</div>
                )}
            </div>
        </div>
    );
}
