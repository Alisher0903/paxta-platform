import { district_getOne_report, district_getOne_report_active } from '@/helpers/api';
import { useGlobalRequest } from '@/helpers/functions/restApi-function';
import { Spin } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function V_hokim_hisobot() {
    const location = useLocation();
    const status = location.pathname.split('/')[3];
    const date = location.pathname.split('/')[4];
    const districtId = location.pathname.split('/').pop();

    const { response, globalDataFunc, loading } = useGlobalRequest(
        `${district_getOne_report}?machineId=${districtId}&date=${date}`,
        'GET'
    );
    const { response: responseActive, loading: loadingActive, globalDataFunc: globalDataFuncActive } = useGlobalRequest(
        `${district_getOne_report_active}?machineId=${districtId}&date=${date}`,
        'GET'
    );

    useEffect(() => {
        globalDataFunc();
        globalDataFuncActive();
    }, [districtId, date, status]);

    return (
        <div className='container mx-auto'>
            <h1 className='lg:text-3xl text-2xl font-semibold text-center uppercase'>
                {status === 'deActive' ? 'Mashinaga nega ishlamaganligi tugrisida barcha hisobotlar' : 'Mashinaga ish jarayoni tugrisida hisobotlar'}
            </h1>
            <div className='py-8'>
                {loading || loadingActive ? (
                    <div><Spin tip="Yuklanmoqda..." /></div>
                ) : (
                    <>
                        {status === 'deActive' && response && response.body !== null ? (
                            response?.body.map((report: {
                                farmName: string,
                                machineStatus: string,
                                hour: number,
                                minute: number,
                                startTime: string,
                                endTime: string,
                                id: number,
                                areaName: string,
                                districtName: string,
                                sectorNumber: number,
                            }) => (
                                <div key={report.id} className='border-2 mb-10 flex flex-col gap-2 border-[#9a1e1e] bg-[#fefafa] rounded-lg p-4 my-2'>
                                    <h2 className='font-semibold'>{report.farmName}</h2>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>Ishlangan maydon: </span>
                                        <span>{report.areaName}</span>
                                    </p>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>Tuman: </span>
                                        <span>{report.districtName}</span>
                                    </p>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>Sektor raqami: </span>
                                        <span>{report.sectorNumber}</span>
                                    </p>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>Nima uchun ishlamaganligi: </span>
                                        <span>{report.machineStatus}</span>
                                    </p>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>Soat: </span>
                                        <span>{report.hour}</span>
                                    </p>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>Minut: </span>
                                        <span>{report.minute}</span>
                                    </p>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>Ishga tushgan vaqti: </span>
                                        <span>{report.startTime}</span>
                                    </p>
                                    <p className='flex border-b border-[#9a1e1e] justify-between'>
                                        <span className='font-semibold'>End Time: </span>
                                        <span>{report.endTime === 'null' ? 'Mashina ishlamagan' : report.endTime}</span>
                                    </p>
                                </div>
                            ))
                        ) : status === 'active' && responseActive && responseActive.body !== null ? (
                            responseActive?.body.map((report: {
                                farmName: string,
                                id: number,
                                areaName: string,
                                districtName: string,
                                sectorNumber: number,
                                cottonSize: number,
                                downDate: string,
                                machineStatus: string,
                                downTime: string,
                                model: string,
                                machineActive: boolean,
                                fullName: string,
                                time: string,
                            }) => (
                                <div key={report.id} className='border-2 mb-10 flex flex-col gap-2 border-[#6A9C89] bg-[#f9fffc] rounded-lg p-4 my-2'>
                                    <h2 className='font-semibold text-2xl mb-3'>{report.farmName}</h2>
                                    <p className='flex border-b border-[#6A9C89] justify-between'>
                                        <span className='font-semibold'>Ishlangan maydon: </span>
                                        <span>{report.areaName}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89] justify-between'>
                                        <span className='font-semibold'>Tuman: </span>
                                        <span>{report.districtName}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89] justify-between'>
                                        <span className='font-semibold'>Sektor raqami: </span>
                                        <span>{report.sectorNumber}</span>
                                    </p>
                                    {/* <p className='flex justify-between'>
                                        <span className='font-semibold'>Nima uchun ishlamaganligi: </span>
                                        <span>{report.machineStatus}</span>
                                    </p> */}
                                    <p className='flex border-b border-[#6A9C89] justify-between'>
                                        <span className='font-semibold'>Paxta miqdori (tonna): </span>
                                        <span>{report.cottonSize}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89] justify-between'>
                                        <span className='font-semibold'>Ishdan chiqish sanasi: </span>
                                        <span>{report.downDate}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89] justify-between'>
                                        <span className='font-semibold'>Ishdan chiqish vaqti: </span>
                                        <span>{report.downTime}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89]  justify-between'>
                                        <span className='font-semibold'>Mashina modeli: </span>
                                        <span>{report.model}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89]  justify-between'>
                                        <span className='font-semibold'>Mashina faoliyati: </span>
                                        <span>{report.machineActive ? 'Faol' : 'Nofaol'}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89]  justify-between'>
                                        <span className='font-semibold'>To'liq ism: </span>
                                        <span>{report.fullName}</span>
                                    </p>
                                    <p className='flex border-b border-[#6A9C89]  justify-between'>
                                        <span className='font-semibold'>Ish boshlanish vaqti: </span>
                                        <span>{report.time}</span>
                                    </p>
                                </div>

                            ))
                        ) : (
                            <div className='text-center text-red-900 text-2xl font-semibold'>
                                Ma'lumotlar topilmadi
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
