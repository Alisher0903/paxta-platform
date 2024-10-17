import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import { Input, Pagination, Popover, Select } from "antd";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import { lessonPageThead, machineReportList } from "@/helpers/constanta.tsx";
import { useGlobalRequest } from "@/helpers/functions/restApi-function.tsx";
import { useEffect, useState } from "react";
import { categoryList, lessonCrud, lessonPageList, moduleCategoryId, reportMaster } from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import { consoleClear } from "@/helpers/functions/toastMessage.tsx";
import globalStore from "@/helpers/state-management/globalStore.tsx";
import VideoPlayer from "@/components/custom/video/video.tsx";

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
    const admin_role = sessionStorage.getItem('admin_roles');
    const { editOrDeleteStatus, setEditOrDeleteStatus } = courseStore()
    const { imgUpload, setImgUpload } = globalStore()
    const requestData = {
        name: crudLesson.name,
        description: crudLesson.description,
        videoLink: crudLesson.videoLink,
        videoTime: crudLesson.videoTime,
        moduleId: crudLesson.moduleId,
        fileId: imgUpload ? imgUpload : crudLesson.fileId ? crudLesson.fileId : 0
    }
    const categoryLists = useGlobalRequest(`${categoryList}${admin_role === 'ADMIN_EDU' ? 'EDUCATION' : 'ONLINE'}`, 'GET')
    const moduleLessonGet = useGlobalRequest(`${moduleCategoryId}${categoryId}`, 'GET')
    const lessonAdd = useGlobalRequest(lessonCrud, 'POST', requestData)
    const lessonEdit = useGlobalRequest(`${lessonCrud}/${crudLesson.id}`, 'PUT', requestData)
    const lessonDelete = useGlobalRequest(`${lessonCrud}/${crudLesson.id}`, 'DELETE')
    const machineReportGet = useGlobalRequest(`${reportMaster}/1`, 'GET')

    useEffect(() => {
        machineReportGet.globalDataFunc()
    }, []);

    console.log(machineReportGet?.response?.body, 12345);


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
        } else if (lessonDelete.response) {
            toast.success('Dars muvaffaqiyatli uchirildi')
            closeModal()
        }
        consoleClear()
    }, [lessonAdd.response, lessonEdit.response, lessonDelete.response]);

    const handleChange = (name: string, value: string) => setCrudLesson({ ...crudLesson, [name]: value });

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
            <Breadcrumb pageName={`Darslar`} />

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
                    {/* <Select
                        placeholder={`Kurs buyicha qidirish`}
                        className={`w-full bg-transparent h-11 custom-select`}
                        onChange={(value) => setCategoryId(value)}
                        allowClear
                    >
                        {categoryLists.response && categoryLists.response.map((item: any) => (
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select> */}
                    {/* <Select
                        placeholder={`Modul buyicha qidirish`}
                        className={`w-full bg-transparent h-11 custom-select`}
                        allowClear
                    >
                        {moduleLessonGet.response && moduleLessonGet.response.map((item: any) => (
                            <Select.Option value={item.moduleId} key={item.moduleId}>{item.name}</Select.Option>
                        ))}
                    </Select> */}
                </div>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {machineReportGet?.loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton />
                    <Skeleton />
                </div> : (
                    <Tables thead={machineReportList}>
                        {machineReportGet?.response && machineReportGet?.response?.body?.length > 0 ? (
                            machineReportGet?.response?.body.map((lesson: any, idx: number) => (
                                <tr key={lesson.id} className={`hover:bg-whiteGreen duration-100`}>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {idx + 1}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {lesson.farmIdName ? (
                                                lesson.farmIdName.length > 20 ? (
                                                    <Popover title={lesson.farmIdName} overlayStyle={{ textAlign: 'center', maxWidth: '400px' }}>
                                                        {lesson.farmIdName.slice(0, 20)}...
                                                    </Popover>
                                                ) : (
                                                    lesson.farmIdName
                                                )
                                            ) : (
                                                "Ma'lumot mavjud emas"
                                            )}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {lesson.machineStatus}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {lesson.time}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {lesson.endTime !== 'null' ? lesson.endTime : '0'} {/* 'null' bo'lsa N/A ko'rsatadi */}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5 flex items-center justify-start gap-3">
                                        <FaEdit
                                            className={`text-xl hover:cursor-pointer hover:text-yellow-500 duration-300`}
                                            onClick={() => {
                                                openModal();
                                                setEditOrDeleteStatus('EDIT');
                                                setCrudLesson(lesson);
                                            }}
                                        />
                                        <AiFillDelete
                                            className={`text-xl hover:cursor-pointer hover:text-red-500 duration-300`}
                                            onClick={() => {
                                                openModal();
                                                setEditOrDeleteStatus('DELETE');
                                                setCrudLesson(lesson);
                                            }}
                                        />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td
                                    className="border-b border-[#eee] p-5 text-black text-center"
                                    colSpan={lessonPageThead.length}
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
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu darsni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (editOrDeleteStatus === 'OPEN_VIDEO'
                        ? <VideoPlayer videoId={crudLesson.videoLink} key={crudLesson.id} className={`mt-7`} />
                        : <div className={`mt-7`}>
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
                            <input
                                type="number"
                                value={crudLesson.videoTime}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (Number(v) >= 0) handleChange('videoTime', v);
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault();
                                }}
                                placeholder="Videoni davomiyligini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                            />
                            {editOrDeleteStatus === 'POST' && (<>
                            </>)}
                        </div>
                    )}
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
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={lessonDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                className={`bg-darkGreen ${lessonDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!lessonDelete.loading) lessonDelete.globalDataFunc()
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
