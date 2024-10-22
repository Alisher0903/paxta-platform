import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {machineReportList} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {
    breakReportAddMaster,
    breakReportEditMaster,
    breakReportGetMasterList,
    cottonGetMaster,
    districtList, farmList
} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {FaEdit} from "react-icons/fa";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {dateGenerate} from "@/helpers/functions/common-functions.tsx";
import {Pagination} from "antd";

const defVal = {
    farmId: 0,
    machineStatus: '',
    hour: '',
    minute: '',
    districtId: 0,
    cottonId: 0
}

const MasterMachine = () => {
    const [isModal, setIsModal] = useState(false);
    const [crudBreakRep, setCrudBreakRep] = useState<any>(defVal);
    const [page, setPage] = useState<number>(0);
    const [nowDate, setNowDate] = useState<string>('');
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const requestData = {
        farmId: crudBreakRep.farmId,
        machineStatus: editOrDeleteStatus === 'EDIT' ? null : crudBreakRep.machineStatus,
        hour: crudBreakRep.hour,
        minute: crudBreakRep.minute
    }

    const machineReportGet = useGlobalRequest(`${breakReportGetMasterList}?size=10&page=${page}&date=${nowDate ? nowDate : dateGenerate()}`, 'GET')
    const breakRepAdd = useGlobalRequest(breakReportAddMaster, 'POST', requestData)
    const breakRepEdit = useGlobalRequest(`${breakReportEditMaster}${crudBreakRep.id}`, 'PUT', requestData)
    const districtLists = useGlobalRequest(districtList, 'GET');
    const cottonLists = useGlobalRequest(`${cottonGetMaster}${crudBreakRep.districtId}`, 'GET');
    const farmLists = useGlobalRequest(`${farmList}/${crudBreakRep.cottonId}`, 'GET');

    useEffect(() => {
        machineReportGet.globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        machineReportGet.globalDataFunc()
    }, [page, nowDate]);

    useEffect(() => {
        if (breakRepAdd.response?.success) {
            machineReportGet.globalDataFunc()
            toast.success('Машина ҳолати муваффақиятли қўшилди')
            closeModal()
        } else if (breakRepAdd?.error?.response?.data?.message) toast.error(breakRepAdd.error.response.data.message)
        consoleClear()
    }, [breakRepAdd.response, breakRepAdd.error]);

    useEffect(() => {
        if (breakRepEdit.response?.success) {
            machineReportGet.globalDataFunc()
            toast.success('Машина ҳолати муваффақиятли таҳрирланди')
            closeModal()
        } else if (breakRepEdit?.error?.response?.data?.message) toast.error(breakRepEdit.error.response.data.message)
        consoleClear()
    }, [breakRepEdit.response, breakRepEdit.error]);

    useEffect(() => {
        crudBreakRep.cottonId = 0
        if (crudBreakRep.districtId) cottonLists.globalDataFunc();
    }, [crudBreakRep.districtId]);

    useEffect(() => {
        crudBreakRep.farmId = 0
        if (crudBreakRep.cottonId) farmLists.globalDataFunc();
    }, [crudBreakRep.districtId, crudBreakRep.cottonId]);

    const handleChange = (name: string, value: string) => setCrudBreakRep({...crudBreakRep, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudBreakRep(defVal);
            setEditOrDeleteStatus('');
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Машиналар ҳолати`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Машина ҳолатини киритиш`}
                    className={`bg-darkGreen py-4`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />

                <div className="custom-date-input w-full sm:w-auto md:w-[30%]">
                    <input
                        defaultValue={dateGenerate()}
                        type="date"
                        onChange={(e) => setNowDate(e.target.value)}
                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                    />
                </div>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {machineReportGet?.loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={machineReportList}>
                        {machineReportGet?.response ? machineReportGet?.response?.body?.object?.length > 0 ? (
                            machineReportGet?.response?.body.object.map((item: any, idx: number) => (
                                <tr key={item.id} className={`hover:bg-whiteGreen duration-100`}>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {(page * 10) + idx + 1}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {item.districtName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {item.sectorNumber}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {item.areaName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] min-w-[400px] p-5">
                                        <p className="text-black">
                                            {item.farmName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {item.machineStatus}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {item.startTime}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {item.endTime}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5 flex items-center justify-start gap-3">
                                        <FaEdit
                                            className={`text-xl hover:cursor-pointer hover:text-yellow-500 duration-300`}
                                            onClick={() => {
                                                openModal();
                                                setEditOrDeleteStatus('EDIT');
                                                setCrudBreakRep(item);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={machineReportList.length}
                                >
                                    Маълумот топилмади
                                </td>
                            </tr>
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={machineReportList.length}
                                >
                                    Маълумот топилмади
                                </td>
                            </tr>
                        )}
                    </Tables>
                )}
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={machineReportGet ? machineReportGet.response?.body?.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <div className={`mt-7 grid grid-cols-1 gap-4`}>
                        <div>
                            <label>Туманни танланг</label>
                            <select
                                value={crudBreakRep.districtId}
                                onChange={(e) => handleChange('districtId', e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            >
                                <option value={0} disabled selected>Туманни танланг</option>
                                {districtLists.response?.success && districtLists.response.body?.length > 0 && districtLists.response.body.map((item: {
                                    id: number
                                    name: string
                                }) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Терим ҳудудини танланг</label>
                            <select
                                value={crudBreakRep.cottonId}
                                onChange={(e) => handleChange('cottonId', e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            >
                                <option value={0} disabled selected>Терим ҳудудини танланг</option>
                                {cottonLists.response?.success && cottonLists.response.body?.length > 0 && cottonLists.response.body.map((item: {
                                    cottonPickedId: number
                                    areaName: string
                                }) => (
                                    <option key={item.cottonPickedId} value={item.cottonPickedId}>
                                        {item.areaName}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Фермер хўжалигини танланг</label>
                            <select
                                value={crudBreakRep.farmId}
                                onChange={(e) => handleChange('farmId', e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            >
                                <option value={0} disabled selected>Фермер хўжалигини танланг</option>
                                {farmLists.response?.success && farmLists.response.body?.length > 0 && farmLists.response.body.map((item: {
                                    farmId: number
                                    farmName: string
                                }) => (
                                    <option key={item.farmId} value={item.farmId}>{item.farmName}</option>
                                ))}
                            </select>
                        </div>
                        {editOrDeleteStatus !== 'EDIT' && <>
                            <div>
                                <label>Бузилганлик сабабини киритинг</label>
                                <select
                                    value={crudBreakRep.machineStatus}
                                    onChange={(e) => handleChange('machineStatus', e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                >
                                    <option value={'null'}>Бузилганлик сабабини киритинг</option>
                                    <option value={'ROSTLASH_ISHLARI_OLIB_BORILMOQDA'}>
                                        ROSTLASH_ISHLARI_OLIB_BORILMOQDA
                                    </option>
                                    <option value={'OPERATORI_YUQ'}>OPERATORI_YUQ</option>
                                    <option value={'TAMIRDA'}>TAMIRDA</option>
                                    <option value={'TASHKILIY_SABAB'}>TASHKILIY_SABAB</option>
                                    <option value={'YOQILGI_YETKAZIB_BERILMAGAN'}>
                                        YOQILGI_YETKAZIB_BERILMAGAN
                                    </option>
                                </select>
                            </div>
                        </>}
                        <div>
                            <label>{editOrDeleteStatus === 'EDIT' ? 'Созланган' : 'Бузилган'} соатини киритинг</label>
                            <input
                                type={'number'}
                                value={crudBreakRep.hour}
                                onChange={(e) => {
                                    const v = e.target.value
                                    if (+v >= 0 && +v <= 23 && !v.startsWith('0')) handleChange('hour', e.target.value)
                                }}
                                onKeyDown={e => {
                                    if (e.keyCode === 69 || e.key === '+' || e.key === '-' || e.key === '.') e.preventDefault();
                                }}
                                placeholder={`${editOrDeleteStatus === 'EDIT' ? 'Созланган' : 'Бузилган'} соатини киритинг`}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>{editOrDeleteStatus === 'EDIT' ? 'Созланган' : 'Бузилган'} дақиқасини киритинг</label>
                            <input
                                type={'number'}
                                value={crudBreakRep.minute}
                                onChange={(e) => {
                                    const v = e.target.value
                                    if (+v >= 0 && +v < 60 && !v.startsWith('0')) handleChange('minute', e.target.value)
                                }}
                                onKeyDown={e => {
                                    if (e.keyCode === 69 || e.key === '+' || e.key === '-' || e.key === '.') e.preventDefault();
                                }}
                                placeholder={`${editOrDeleteStatus === 'EDIT' ? 'Созланган' : 'Бузилган'} дақиқасини киритинг`}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                    </div>

                    <div className={`flex justify-end items-center gap-5 mt-5`}>
                        <ShinyButton
                            text={`Орқага`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        {editOrDeleteStatus === 'POST' && (
                            <ShinyButton
                                text={breakRepAdd.loading ? 'Сақланмоқда...' : 'Сақлаш'}
                                className={`bg-darkGreen ${breakRepAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!breakRepAdd.loading) {
                                        if (crudBreakRep.farmId && crudBreakRep.machineStatus && crudBreakRep.hour && crudBreakRep.minute) breakRepAdd.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={breakRepEdit.loading ? 'Юкланмоқда...' : 'Таҳрирлаш'}
                                className={`bg-darkGreen ${breakRepEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!breakRepEdit.loading) {
                                        if (crudBreakRep.farmId && crudBreakRep.machineStatus && crudBreakRep.hour && crudBreakRep.minute) breakRepEdit.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MasterMachine;
