import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {
    cottonGetMaster,
    districtList,
    farmList, notificationCreate,
    reportAddMaster,
    reportEditMaster,
    reportGetMaster
} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {machineReportThead} from "@/helpers/constanta.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {FaEdit} from "react-icons/fa";
import moment from "moment";
import {Pagination} from "antd";

const defVal = {
    farmId: 0,
    dialField: '',
    cottonSize: '',
    machineActive: true,
    downHour: null,
    downMinute: null,
    machineStatus: null,
    hour: '',
    districtId: 0,
    cottonId: 0,
    title: ''
};

const MasterAddReport = () => {
    const [isModal, setIsModal] = useState(false);
    const [crudReport, setCrudReport] = useState<any>(defVal);
    const [page, setPage] = useState<number>(0);
    const [newDate, setNewDate] = useState<string>('');
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore();
    const requestData = {
        farmId: crudReport.farmId,
        dialField: crudReport.dialField,
        cottonSize: crudReport.cottonSize,
        machineActive: crudReport.machineActive,
        downHour: crudReport.downHour || null,
        downMinute: crudReport.downMinute || null,
        machineStatus: crudReport.machineStatus || null,
        hour: crudReport.hour?.slice(0, 2) === '09' ? 9 : crudReport.hour?.slice(0, 2),
        minute: 0
    };

    const {loading, response, globalDataFunc} = useGlobalRequest(`${reportGetMaster}?page=${page}&size=10${newDate ? `&date=${newDate}` : ''}`, 'GET');
    const reportAdd = useGlobalRequest(reportAddMaster, 'POST', requestData);
    const reportEdit = useGlobalRequest(`${reportEditMaster}${crudReport.id}`, 'PUT', requestData);
    const districtLists = useGlobalRequest(districtList, 'GET');
    const cottonLists = useGlobalRequest(`${cottonGetMaster}${crudReport.districtId}`, 'GET');
    const farmLists = useGlobalRequest(`${farmList}/${crudReport.cottonId}`, 'GET');
    const notificationAdd = useGlobalRequest(notificationCreate, 'POST', {
        title: crudReport.title,
        machineRepostId: crudReport.machineId
    });

    useEffect(() => {
        globalDataFunc();
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc();
    }, [page, newDate]);

    useEffect(() => {
        if (reportAdd.response?.success) {
            globalDataFunc();
            toast.success('Ҳисобот муваффақиятли қўшилди');
            closeModal();
        } else if (reportAdd.error?.response?.data?.message) toast.error(reportAdd.error.response.data.message)
        consoleClear();
    }, [reportAdd.response, reportAdd.error]);

    useEffect(() => {
        if (reportEdit.response?.success) {
            if (reportEdit.response.body && reportEdit.response.body === 'UPDATE_REPORT') setEditOrDeleteStatus('NOTIFICATION_CREATE')
            else {
                globalDataFunc();
                toast.success('Ҳисобот муваффақиятли таҳрирланди');
                closeModal();
            }
        } else if (reportEdit.error?.response?.data?.message) toast.error(reportEdit.error.response.data.message)
        consoleClear();
    }, [reportEdit.response, reportEdit.error]);

    useEffect(() => {
        if (notificationAdd.response?.success) {
            globalDataFunc();
            toast.success('Хабарни муваффақиятли юбордингиз');
            closeModal();
        } else if (notificationAdd.error?.response?.data?.message) toast.error(notificationAdd.error.response.data.message)
        consoleClear();
    }, [notificationAdd.response, notificationAdd.error]);

    useEffect(() => {
        crudReport.cottonId = 0
        if (crudReport.districtId) cottonLists.globalDataFunc();
    }, [crudReport.districtId]);

    useEffect(() => {
        crudReport.farmId = 0
        if (crudReport.cottonId) farmLists.globalDataFunc();
    }, [crudReport.districtId, crudReport.cottonId]);

    const handleChange = (name: string, value: string) => setCrudReport({...crudReport, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudReport(defVal);
            setEditOrDeleteStatus('');
        }, 500);
    };

    return (
        <>
            <Breadcrumb pageName={`Ҳисоботлар`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Ҳисобот қўшиш`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal();
                        setEditOrDeleteStatus('POST');
                    }}
                />
                <div className="custom-date-input w-full sm:w-auto md:w-[30%]">
                    <input
                        type="date"
                        onChange={(e) => setNewDate(e.target.value)}
                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                    />
                </div>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={machineReportThead}>
                        {response?.success ? response?.body?.object?.length > 0 ? (
                            response.body.object.map((rep: any, idx: number) => (
                                <tr key={rep.id} className={`hover:bg-whiteGreen duration-100`}>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {(page * 10) + idx + 1}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.model}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.districtName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.sectorNumber}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.areaName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5 min-w-[400px]">
                                        <p className="text-black">
                                            {rep.farmName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.dialField} (гектар)
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.cottonSize} (тонна)
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.machineActive ? 'актив' : 'актив эмас'}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {moment(rep.downDate).format('DD.MM.YYYY')}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.downTime}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.machineStatus}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.fullName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {moment(rep.date).format('DD.MM.YYYY')}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.time}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <FaEdit
                                            className={`text-xl hover:cursor-pointer hover:text-yellow-500 duration-300`}
                                            onClick={() => {
                                                openModal();
                                                setEditOrDeleteStatus('EDIT');
                                                setCrudReport(rep);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={machineReportThead.length}
                                >
                                    Маълумот топилмади
                                </td>
                            </tr>
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={machineReportThead.length}
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
                    total={response ? response.body?.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            {/*====================MODAL================*/}
            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <h2 className="font-bold text-2xl">
                        {
                            editOrDeleteStatus === 'POST' ? 'Ҳисобот қўшиш'
                                : editOrDeleteStatus === 'NOTIFICATION_CREATE' ? 'Ҳисоботни таҳрирлаш учун админдан рухсат олинг'
                                    : 'Ҳисоботни таҳрирлаш'
                        }
                    </h2>
                    {editOrDeleteStatus === 'NOTIFICATION_CREATE' ?
                        <div className={`mt-7`}>
                            <label>Таҳрирлаш сабабини киритинг</label>
                            <input
                                value={crudReport.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                placeholder="Таҳрирлаш сабабини киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div> :
                        <div className={`mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5`}>
                            <div>
                                <label>Туманни танланг</label>
                                <select
                                    value={crudReport.districtId}
                                    onChange={(e) => handleChange('districtId', e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                >
                                    <option value={0} disabled>Туманни танланг</option>
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
                                    value={crudReport.cottonId}
                                    onChange={(e) => handleChange('cottonId', e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                >
                                    <option value={0} disabled>Терим ҳудудини танланг</option>
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
                                    value={crudReport.farmId}
                                    onChange={(e) => handleChange('farmId', e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                >
                                    <option value={0} disabled>Фермер хўжалигини танланг</option>
                                    {farmLists.response?.success && farmLists.response.body?.length > 0 && farmLists.response.body.map((item: {
                                        farmId: number
                                        farmName: string
                                    }) => (
                                        <option key={item.farmId} value={item.farmId}>{item.farmName}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Ер майдонини киритинг (гектар)</label>
                                <input
                                    type={'number'}
                                    value={crudReport.dialField}
                                    onChange={(e) => handleChange('dialField', e.target.value)}
                                    placeholder="Ер майдонини киритинг"
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label>Пахта ҳажмини киритинг (тонна)</label>
                                <input
                                    type={'number'}
                                    value={crudReport.cottonSize}
                                    onChange={(e) => handleChange('cottonSize', e.target.value)}
                                    placeholder="Пахта ҳажмини киритинг"
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                />
                            </div>
                            <div>
                                <label>Машина ҳолатини киритинг</label>
                                <select
                                    value={crudReport.machineActive}
                                    onChange={(e) => handleChange('machineActive', e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                >
                                    <option value={`true`}>Актив</option>
                                    <option value={`false`}>Актив эмас</option>
                                </select>
                            </div>
                            {crudReport.machineActive === 'false' && <>
                                <div>
                                    <label>Бузилган соатини киритинг</label>
                                    <input
                                        type={'number'}
                                        value={crudReport.downHour}
                                        onChange={(e) => {
                                            const v = e.target.value
                                            if (+v >= 0 && +v <= 23 && !v.startsWith('0')) handleChange('downHour', e.target.value)
                                        }}
                                        onKeyDown={e => {
                                            if (e.keyCode === 69 || e.key === '+' || e.key === '-' || e.key === '.') e.preventDefault();
                                        }}
                                        placeholder="Бузилган соатини киритинг"
                                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label>Бузилган дақиқасини киритинг</label>
                                    <input
                                        type={'number'}
                                        value={crudReport.downMinute}
                                        onChange={(e) => {
                                            const v = e.target.value
                                            if (+v >= 0 && +v < 60 && !v.startsWith('0')) handleChange('downMinute', e.target.value)
                                        }}
                                        onKeyDown={e => {
                                            if (e.keyCode === 69 || e.key === '+' || e.key === '-' || e.key === '.') e.preventDefault();
                                        }}
                                        placeholder="Бузилган дақиқасини киритинг"
                                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                    />
                                </div>
                                <div>
                                    <label>Бузилганлик сабабини танланг</label>
                                    <select
                                        value={crudReport.machineStatus}
                                        onChange={(e) => handleChange('machineStatus', e.target.value)}
                                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                    >
                                        <option value={'null'}>Бузилганлик сабабини танланг</option>
                                        <option
                                            value={'ROSTLASH_ISHLARI_OLIB_BORILMOQDA'}>ROSTLASH_ISHLARI_OLIB_BORILMOQDA
                                        </option>
                                        <option value={'OPERATORI_YUQ'}>OPERATORI_YUQ</option>
                                        <option value={'TAMIRDA'}>TAMIRDA</option>
                                        <option value={'TASHKILIY_SABAB'}>TASHKILIY_SABAB</option>
                                        <option value={'YOQILGI_YETKAZIB_BERILMAGAN'}>YOQILGI_YETKAZIB_BERILMAGAN
                                        </option>
                                    </select>
                                </div>
                            </>}
                            <div>
                                <label>Ҳисобот топшириш вақтини киритинг</label>
                                <select
                                    value={crudReport.hour}
                                    onChange={(e) => handleChange('hour', e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                                >
                                    <option value={0}>Ҳисобот топшириш вақтини киритинг</option>
                                    <option value={'09:00'}>09:00</option>
                                    <option value={'13:00'}>13:00</option>
                                    <option value={'19:00'}>19:00</option>
                                    <option value={'23:00'}>23:00</option>
                                </select>
                            </div>
                        </div>
                    }

                    <div className={`flex justify-end items-center gap-5 mt-7`}>
                        <ShinyButton
                            text={`Бекор қилиш`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        <ShinyButton
                            className={`${(reportAdd.loading || reportEdit.loading || notificationAdd.loading) && 'cursor-not-allowed opacity-70'} bg-darkGreen`}
                            text={
                                editOrDeleteStatus === 'POST' ? `${reportAdd.loading ? 'Сақланмоқда...' : 'Сақлаш'}`
                                    : editOrDeleteStatus === 'EDIT' ? `${reportEdit.loading ? 'Таҳрирланмоқда...' : 'Таҳрирлаш'}`
                                        : editOrDeleteStatus === '' ? `${notificationAdd.loading ? 'Юборилмоқда...' : 'Юбориш'}` : ''
                            }
                            onClick={() => {
                                if (editOrDeleteStatus === 'POST' && !reportAdd.loading) {
                                    if (crudReport.farmId && crudReport.dialField && crudReport.cottonSize && crudReport.hour) reportAdd.globalDataFunc()
                                    else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                } else if (editOrDeleteStatus === 'EDIT' && !reportEdit.loading) {
                                    if (crudReport.farmId && crudReport.dialField && crudReport.cottonSize && crudReport.hour) reportEdit.globalDataFunc()
                                    else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                } else if (editOrDeleteStatus === 'NOTIFICATION_CREATE' && !notificationAdd.loading) {
                                    if (crudReport.title) notificationAdd.globalDataFunc()
                                }
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MasterAddReport;
