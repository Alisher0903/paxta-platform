import { Card } from '@/components/ui/card-hover-effect';
import { active_machines_by_sector, sector_invalid_machine } from '@/helpers/api';
import { useGlobalRequest } from '@/helpers/functions/restApi-function';
import { Input } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sector_getOne() {
    const location = useLocation();
    const sectorId = location.pathname.split('/').pop();
    const date = location.pathname.split('/')[3]
    const sectorNumber = location.pathname.split('/')[4]
    const status = location.pathname.split('/')[5]
    const [selectedDate, setSelectedDate] = useState<string>(date)
    const { response, globalDataFunc } = useGlobalRequest(`${active_machines_by_sector}?sectorId=${sectorId}&date=${selectedDate}`, 'GET');
    const { response: responseInvalid, globalDataFunc: globalDataFuncInvalid } = useGlobalRequest(`${sector_invalid_machine}?&date=${selectedDate}&sectorId=${sectorId}`, 'GET');
    useEffect(() => {
        globalDataFunc()
        globalDataFuncInvalid()
    }, [selectedDate])
    const navigate = useNavigate()
    return (
        <div className='select-none'>
            <Input
                className={'custom-input w-40 my-2'}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
            />
            <div className="flex justify-center py-16">
                {response && response.body !== null && <h1 className='text-3xl font-semibold uppercase'>{sectorNumber} - Sectorga tegishli barcha {status === 'active' ? 'ishlayotgan' : 'ishlamagan'} mashinalar hisoboti</h1>}
            </div>
            {
                status === 'active' ? (
                    <div className=" flex lg:flex-wrap gap-4 lg:justify-between flex-col">
                        {response && response?.body?.length > 0 ? (
                            response?.body?.map((machine: {
                                machineModel: string,
                                machineId: string,
                                cottonSize: string,
                                id: number
                            }) => (
                                <div key={machine.machineId} className=''>
                                    <Card className='flex flex-col lg:w-[400px] w-[100%] py-5  text-white bg-[#6a9c89] rounded-md'>
                                        <h1 className='text-2xl font-semibold uppercase '>
                                            {machine.machineId || '0'}
                                        </h1>
                                        <p className='text-sm md:text-lg flex justify-between uppercase'><span className='font-semibold'>Mashina Modeli: </span><span>{machine.machineModel || 'Yuqoridagi'}</span></p>
                                        <p className='text-sm md:text-lg flex justify-between uppercase'><span className='font-semibold'>Yig'ilgan Paxta: </span><span>{machine.cottonSize || '0'}</span></p>
                                        <div className='text-gray-800  py-2 font-semibold rounded-md underline cursor-pointer select-none'
                                            onClick={() => {
                                                navigate(`/sector/hisobot/${status}/${selectedDate}/${machine.id}`)
                                            }}
                                        >
                                            information kurish
                                        </div>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <div>Bu san'ada hech qanday mashina ishlamayapti</div>
                        )}
                    </div>
                ) : (
                    <div className=" flex lg:flex-wrap gap-4 lg:justify-between flex-col">
                        {responseInvalid && responseInvalid?.body?.length > 0 ? (
                            responseInvalid?.body?.map((machine: {
                                machineModel: string,
                                machineId: string,
                                cottonSize: string,
                                id: number
                            }) => (
                                <div key={machine.machineId} className=''>
                                    <Card className='lg:w-[400px] w-[100%] flex flex-col gap-4 text-black bg-[#ffeaea] rounded-md'>
                                        <h1 className='text-2xl pb-5 font-semibold uppercase'>
                                            {machine.machineId || '0'}
                                        </h1>
                                        <p className='text-sm md:text-sm  flex justify-between uppercase'><span className='font-semibold'>Mashina Modeli: </span><span>{machine.machineModel || 'Yuqoridagi'}</span></p>
                                        <p className='text-sm md:text-sm flex justify-between uppercase'><span className='font-semibold'>Yig'ilgan Paxta: </span><span>{machine.cottonSize || '0'}</span></p>
                                        <div className='text-red-900 py-2 font-semibold rounded-md underline cursor-pointer select-none'
                                            onClick={() => {
                                                navigate(`/sector/hisobot/${status}/${selectedDate}/${machine.id}`)
                                            }}
                                        >
                                            information kurish
                                        </div>
                                    </Card>
                                </div>
                            ))
                        ) : (
                            <div>Bu san'ada hech qanday mashina ishlamayapti</div>
                        )}
                        {/* {status === 'invalid' && <Pagination
                                showSizeChanger={false}
                                responsive={true}
                                defaultCurrent={1}
                                total={response ? response.body?.totalElements : 0}
                                onChange={(page: number) => setPage(page - 1)}
                                rootClassName={`mt-8 mb-5`}
                            />} */}
                    </div>
                )
            }
        </div>
    );
}
