import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {machineReportList} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {breakReportGetMasterList} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {FaEdit} from "react-icons/fa";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import globalStore from "@/helpers/state-management/globalStore.tsx";
import {dateGenerate} from "@/helpers/functions/common-functions.tsx";

const defVal = {
    name: '',
    description: '',
    videoLink: '',
    videoTime: '',
    moduleId: 0,
    fileId: 0
}

const MasterMachine = () => {
    const [categoryId, setCategoryId] = useState<string>('');
    const [isModal, setIsModal] = useState(false);
    const [crudLesson, setCrudLesson] = useState<any>(defVal);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const {imgUpload, setImgUpload} = globalStore()
    const requestData = {
        name: crudLesson.name,
        description: crudLesson.description,
        videoLink: crudLesson.videoLink,
        videoTime: crudLesson.videoTime,
        moduleId: crudLesson.moduleId,
        fileId: imgUpload ? imgUpload : crudLesson.fileId ? crudLesson.fileId : 0
    }

    const machineReportGet = useGlobalRequest(`${breakReportGetMasterList}?date=${dateGenerate()}`, 'GET')
    const categoryLists = useGlobalRequest('', 'GET')
    const moduleLessonGet = useGlobalRequest('', 'GET')
    const lessonAdd = useGlobalRequest('', 'POST', requestData)
    const lessonEdit = useGlobalRequest('', 'PUT', requestData)

    useEffect(() => {
        machineReportGet.globalDataFunc()
    }, []);

    useEffect(() => {
        if (categoryId) moduleLessonGet.globalDataFunc()
    }, [categoryId]);

    useEffect(() => {
        crudLesson.moduleId = 0
    }, [crudLesson.categoryId]);

    useEffect(() => {
        if (lessonAdd.response) {
            toast.success('Dars muvaffaqiyatli qushildi')
            closeModal()
        } else if (lessonEdit.response) {
            toast.success('Dars muvaffaqiyatli taxrirlandi')
            closeModal()
        }
        consoleClear()
    }, [lessonAdd.response, lessonEdit.response]);

    const handleChange = (name: string, value: string) => setCrudLesson({...crudLesson, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudLesson(defVal);
            setEditOrDeleteStatus('');
            setImgUpload(null)
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Mashinalar holati`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Mashina holatini kiritish`}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
                <div
                    className={`w-full lg:max-w-[60%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}
                >
                </div>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {machineReportGet?.loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={machineReportList}>
                        {machineReportGet?.response ? machineReportGet?.response?.body?.length > 0 ? (
                            machineReportGet?.response?.body.map((item: any, idx: number) => (
                                <tr key={item.id} className={`hover:bg-whiteGreen duration-100`}>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {idx + 1}
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
                                                setCrudLesson(item);
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
                                    Ma'lumot topilmadi
                                </td>
                            </tr>
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={machineReportList.length}
                                >
                                    Ma'lumot topilmadi
                                </td>
                            </tr>
                        )}
                    </Tables>
                )}
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <div className={`mt-7`}>
                        <select
                            value={crudLesson.categoryId}
                            onChange={(e) => {
                                setCategoryId(e.target.value)
                                handleChange(`categoryId`, e.target.value)
                            }}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                        >
                            <option disabled selected value={``}>Kursni tanlang</option>
                            {categoryLists.response && categoryLists.response.map((item: any) => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <select
                            value={crudLesson.moduleId}
                            onChange={(e) => handleChange(`moduleId`, e.target.value)}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                        >
                            <option disabled selected value={0}>Modulni tanlang</option>
                            {moduleLessonGet.response && moduleLessonGet.response.map((item: any) => (
                                <option value={item.moduleId} key={item.moduleId}>{item.name}</option>
                            ))}
                        </select>
                        <input
                            value={crudLesson.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Dars nomini kiriting"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        />
                        <input
                            value={crudLesson.description}
                            onChange={(e) => handleChange('description', e.target.value)}
                            placeholder="Tavsifni kiriting"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        />
                        <input
                            value={crudLesson.videoLink}
                            onChange={(e) => handleChange('videoLink', e.target.value)}
                            placeholder="Vedio linkini kiriting"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        />
                    </div>

                    <div className={`flex justify-end items-center gap-5 mt-5`}>
                        <ShinyButton
                            text={`Orqaga`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        {editOrDeleteStatus === 'POST' && (
                            <ShinyButton
                                text={lessonAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${lessonAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!lessonAdd.loading) {
                                        if (crudLesson.name && crudLesson.description && crudLesson.videoLink && crudLesson.videoTime && crudLesson.moduleId) lessonAdd.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={lessonEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                className={`bg-darkGreen ${lessonEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!lessonEdit.loading) {
                                        if (crudLesson.name && crudLesson.description && crudLesson.videoLink && crudLesson.videoTime) lessonEdit.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
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
