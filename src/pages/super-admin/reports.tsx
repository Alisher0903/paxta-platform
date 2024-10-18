import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Pagination} from "antd";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {reportAdminGet} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {reportThead} from "@/helpers/constanta.tsx";
import moment from "moment";

const Reports = () => {
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    // =====================REQUESTS======================
    const getModuleUrl = () => {
        const queryParams: string = [
            date ? `date=${date}` : '',
            hour ? `hour=${hour.slice(0, 2)}` : '',
            hour ? `minute=${hour.slice(3, 5)}` : ''
        ].filter(Boolean).join('&');

        return `${reportAdminGet}?page=${page}&size=10${queryParams ? `&${queryParams}` : ''}`;
    }
    const {response, loading, globalDataFunc} = useGlobalRequest(getModuleUrl(), 'GET')

    useEffect(() => {
        globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
        if (response?.body?.totalElements < 10) setPage(0)
    }, [date, hour, page]);

    return (
        <>
            <Breadcrumb pageName={`Hisobotlar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-end gap-5 mt-10`}>
                <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-5"
                />
                <input
                    type="time"
                    onChange={(e) => setHour(e.target.value)}
                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-5"
                />
            </div>

            {/*==================BODY===============*/}
            <div className={`mt-7`}>
                {loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={reportThead}>
                        {response ? response.body?.object?.length > 0 ? response.body?.object?.map((rep: {
                            id: number
                            fullName: string
                            farmName: string
                            areaName: string
                            model: string
                            machineId: number // x
                            machineStatus: null | string
                            districtName: string
                            cottonSize: number
                            machineActive: boolean
                            sectorNumber: number
                            dialField: number
                            date: string
                            downDate: string
                            time: string
                            downTime: string
                        }, idx: number) => (
                            <tr key={rep.id} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.model ? rep.model : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.districtName ? rep.districtName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.sectorNumber ? rep.sectorNumber : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.areaName ? rep.areaName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.farmName ? rep.farmName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.dialField ? `${rep.dialField} (gektar)` : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.cottonSize ? `${rep.cottonSize} (tonna)` : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className={`${rep.machineActive ? 'bg-green-300' : 'bg-red-300'} rounded-xl px-3 py-1 border-none text-center text-black`}>
                                        {rep.machineActive ? 'Activ' : 'Buzilgan'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.downDate ? moment(rep.downDate).format('DD.MM.YYYY') : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.downTime ? rep.downTime.slice(0, 5) : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.machineStatus ? rep.machineStatus : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.fullName ? rep.fullName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.date ? moment(rep.date).format('DD.MM.YYYY') : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.time ? rep.time.slice(0, 5) : '-'}
                                    </p>
                                </td>
                            </tr>
                        )) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={reportThead.length}
                                >
                                    Ma'lumot topilmadi
                                </td>
                            </tr>
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={reportThead.length}
                                >
                                    Ma'lumot topilmadi
                                </td>
                            </tr>
                        )}
                    </Tables>
                )}
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={response ? response.body?.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>
        </>
    );
};

export default Reports;
