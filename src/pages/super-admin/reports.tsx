import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Input, Pagination} from "antd";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {reportAdminGet} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {reportThead} from "@/helpers/constanta.tsx";
import moment from "moment";

const Reports = () => {
    // const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    // const [isModal, setIsModal] = useState(false);
    // const [crudModule, setCrudModule] = useState<any>(null);
    const [date, setDate] = useState<string>('');
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    // =====================REQUESTS======================
    const getModuleUrl = () => {
        const queryParams: string = [
            date ? `date=${date}` : '',
            hour ? `hour=${hour}` : '',
            minute ? `minute=${minute}` : ''
        ].filter(Boolean).join('&');

        return `${reportAdminGet}?page=${page}&size=10${queryParams ? `${queryParams}&` : ''}`;
    }
    const {response, loading, globalDataFunc} = useGlobalRequest(getModuleUrl(), 'GET')
    // const moduleLessonGet = useGlobalRequest(`${lessonModuleID}`, 'GET')
    // const moduleAdd = useGlobalRequest(`${moduleCrud}`, 'POST', requestData)
    // const moduleEdit = useGlobalRequest(`${moduleCrud}`, 'PUT', requestData)
    // const moduleDelete = useGlobalRequest(`${moduleCrud}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
        if (response?.body?.totalElements < 10) setPage(0)
    }, [date, hour, minute, page]);

    // const handleChange = (name: string, value: string) => setCrudModule({...crudModule, [name]: value});

    // const openModal = () => setIsModal(true);
    // const closeModal = () => {
    //     setIsModal(false);
    //     setTimeout(() => {
    //         // setCrudModule(defVal);
    //         setEditOrDeleteStatus('');
    //     }, 500)
    // };

    return (
        <>
            <Breadcrumb pageName={`Hisobotlar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10`}>
                <Input
                    className={`w-full bg-transparent h-11 custom-input`}
                    placeholder="Sana bo'yicha qidirish..."
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    allowClear
                />
                <Input
                    className={`w-full bg-transparent h-11 custom-input`}
                    placeholder="Sana bo'yicha qidirish..."
                    value={hour}
                    onChange={(e) => setHour(e.target.value)}
                    allowClear
                />
                <Input
                    className={`w-full bg-transparent h-11 custom-input`}
                    placeholder="Sana bo'yicha qidirish..."
                    value={minute}
                    onChange={(e) => setMinute(e.target.value)}
                    allowClear
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
                                        {rep.fullName ? rep.fullName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.farmName ? rep.farmName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.areaName ? rep.areaName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.model ? rep.model : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.machineStatus ? rep.machineStatus : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className={`${rep.machineActive ? 'bg-green-300' : 'bg-red-300'} rounded-xl px-3 py-1 border-none text-center text-black`}>
                                        {rep.machineActive ? 'Activ' : 'Buzilgan'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.districtName ? rep.districtName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.cottonSize ? `${rep.cottonSize} (tonna)` : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.sectorNumber ? rep.sectorNumber : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.dialField ? `${rep.dialField} (gektar)` : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.date ? moment(rep.date).format('DD.MM.YYYY') : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.downDate ? moment(rep.downDate).format('DD.MM.YYYY') : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.time ? rep.time.slice(0, 5) : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rep.downTime ? rep.downTime.slice(0, 5) : '-'}
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

            {/*<Modal onClose={closeModal} isOpen={isModal}>*/}
            {/*    <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>*/}
            {/*        {editOrDeleteStatus === 'DELETE' ? (*/}
            {/*            <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>*/}
            {/*                Haqiqatdan xam bu modulni o'chirib tashlamoqchimisiz?*/}
            {/*            </p>*/}
            {/*        ) : (*/}
            {/*            <div className={`mt-7`}>*/}
            {/*                <input*/}
            {/*                    value={crudModule.name}*/}
            {/*                    onChange={(e) => handleChange('name', e.target.value)}*/}
            {/*                    placeholder="Modul nomini kiriting"*/}
            {/*                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"*/}
            {/*                />*/}
            {/*                <select*/}
            {/*                    value={crudModule.categoryId}*/}
            {/*                    onChange={(e) => handleChange(`categoryId`, e.target.value)}*/}
            {/*                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"*/}
            {/*                >*/}
            {/*                    <option disabled selected value={0}>Kursni tanlang</option>*/}
            {/*                    {categoryLists.response && categoryLists.response.map((item: any) => (*/}
            {/*                        <option value={item.id} key={item.id}>{item.name}</option>*/}
            {/*                    ))}*/}
            {/*                </select>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*        <div className={`flex justify-end items-center gap-5 mt-5`}>*/}
            {/*            <ShinyButton*/}
            {/*                text={`Orqaga`}*/}
            {/*                className={`bg-darkGreen`}*/}
            {/*                onClick={closeModal}*/}
            {/*            />*/}
            {/*            {editOrDeleteStatus === 'POST' && (*/}
            {/*                <ShinyButton*/}
            {/*                    text={moduleAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}*/}
            {/*                    className={`bg-darkGreen ${moduleAdd.loading && 'cursor-not-allowed opacity-60'}`}*/}
            {/*                    onClick={() => {*/}
            {/*                        if (!moduleAdd.loading) {*/}
            {/*                            if (crudModule.name && crudModule.categoryId) moduleAdd.globalDataFunc()*/}
            {/*                            else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')*/}
            {/*                        }*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            )}*/}
            {/*            {editOrDeleteStatus === 'EDIT' && (*/}
            {/*                <ShinyButton*/}
            {/*                    text={moduleEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}*/}
            {/*                    className={`bg-darkGreen ${moduleEdit.loading && 'cursor-not-allowed opacity-60'}`}*/}
            {/*                    onClick={() => {*/}
            {/*                        if (!moduleEdit.loading) {*/}
            {/*                            if (crudModule.name && crudModule.categoryId) moduleEdit.globalDataFunc()*/}
            {/*                            else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')*/}
            {/*                        }*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            )}*/}
            {/*            {editOrDeleteStatus === 'DELETE' && (*/}
            {/*                <ShinyButton*/}
            {/*                    text={moduleDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}*/}
            {/*                    className={`bg-darkGreen ${moduleDelete.loading && 'cursor-not-allowed opacity-60'}`}*/}
            {/*                    onClick={() => {*/}
            {/*                        if (!moduleDelete.loading) moduleDelete.globalDataFunc()*/}
            {/*                    }}*/}
            {/*                />*/}
            {/*            )}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Modal>*/}
        </>
    );
};

export default Reports;
