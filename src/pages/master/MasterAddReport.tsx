import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {reportAddMaster, reportEditMaster, reportGetMaster} from "@/helpers/api.tsx";
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

const defVal = {
    farmId: '',
    dialField: '',
    cottonSize: '',
    machineActive: true,
    downHour: null,
    downMinute: null,
    machineStatus: null,
    hour: '',
    minute: ''
};

const MasterAddReport = () => {
    const [isModal, setIsModal] = useState(false);
    const [crudReport, setCrudReport] = useState<any>(defVal);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore();
    const requestData = {
        farmId: crudReport.farmId,
        dialField: crudReport.dialField,
        cottonSize: crudReport.cottonSize,
        machineActive: crudReport.machineActive,
        downHour: crudReport.downHour || null,
        downMinute: crudReport.downMinute || null,
        machineStatus: crudReport.machineStatus || null,
        hour: crudReport.hour,
        minute: crudReport.minute
    };

    const {loading, response, globalDataFunc} = useGlobalRequest(`${reportGetMaster}`, 'GET');
    const reportAdd = useGlobalRequest(reportAddMaster, 'POST', requestData);
    const reportEdit = useGlobalRequest(`${reportEditMaster}${crudReport.id}`, 'PUT', requestData);

    useEffect(() => {
        globalDataFunc();
    }, []);

    useEffect(() => {
        if (reportAdd.response?.success) {
            globalDataFunc();
            toast.success('Hisobot muvaffaqiyatli qushildi');
            closeModal();
        }
        consoleClear();
    }, [reportAdd.response]);

    useEffect(() => {
        if (reportEdit.response?.success) {
            globalDataFunc();
            toast.success('Hisobot muvaffaqiyatli taxrirlandi');
            closeModal();
        }
        consoleClear();
    }, [reportEdit.response]);

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
            <Breadcrumb pageName={`Hisobotlar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Hisobot qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal();
                        setEditOrDeleteStatus('POST');
                    }}
                />
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
                                            {idx + 1}
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
                                            {rep.dialField} (gektar)
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.cottonSize} (tonna)
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {rep.machineActive ? 'active' : 'activ emas'}
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
                                            {rep.date}
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
                                    Ma'lumot topilmadi
                                </td>
                            </tr>
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={machineReportThead.length}
                                >
                                    Ma'lumot topilmadi
                                </td>
                            </tr>
                        )}
                    </Tables>
                )}
            </div>

            {/*====================MODAL================*/}
            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <h2 className="font-bold text-2xl">Hisobot qo'shish</h2>
                    <div className={`mt-7`}>
                        <select
                            value={crudReport.hisobotVaqti}
                            onChange={(e) => handleChange('hisobotVaqti', e.target.value)}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        >
                            <option value={0} disabled>Vaqtni tanlang</option>
                            {/*<option key={index} value={time}>{time}</option>*/}
                        </select>
                        <input
                            value={crudReport.maydoni}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Paxta maydoni (GK)"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        />
                        <input
                            value={crudReport.paxtaHajmi}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Paxta hajmi ( TN )"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        />
                    </div>

                    <div className={`flex justify-end items-center mt-5`}>
                        <ShinyButton
                            text={`Bekor qilish`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        <ShinyButton
                            className={`bg-darkGreen`}
                            text={
                                editOrDeleteStatus === 'POST' ? 'Saqlash'
                                    : editOrDeleteStatus === 'EDIT' ? 'Taxrirlash' : ''
                            }
                            onClick={() => {
                                editOrDeleteStatus === 'POST' ? reportAdd.globalDataFunc()
                                    : editOrDeleteStatus === 'EDIT' && reportEdit.globalDataFunc()
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MasterAddReport;
