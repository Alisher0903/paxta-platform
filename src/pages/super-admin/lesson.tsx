import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Input, Pagination, Popover, Select} from "antd";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {lessonPageThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {categoryList, lessonCrud, lessonPageList, moduleCategoryId} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdNextPlan, MdOutlineAddCircle} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import Checkbox from "@/components/custom/checkbox/checkbox.tsx";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import ImgUpload from "@/components/custom/imagesData/img-upload.tsx";
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

const Lesson = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState<number>(0);
    const [name, setName] = useState<string>('');
    const [moduleId, setModuleId] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string>('');
    const [isModal, setIsModal] = useState(false);
    const [crudLesson, setCrudLesson] = useState<any>(defVal);
    const admin_role = sessionStorage.getItem('admin_roles');
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

    const getTestUrl = () => {
        const queryParams: string = [
            name ? `name=${name}` : '',
            moduleId ? `moduleId=${moduleId}` : '',
            categoryId ? `categoryId=${categoryId}` : ''
        ].filter(Boolean).join('&');

        return `${lessonPageList}?${queryParams ? `${queryParams}&` : ''}categoryEnum=${admin_role === 'ADMIN_EDU' ? 'EDUCATION' : 'ONLINE'}&page=${page}&size=10`;
    }
    const {loading, response, globalDataFunc} = useGlobalRequest(getTestUrl(), 'GET')
    const categoryLists = useGlobalRequest(`${categoryList}${admin_role === 'ADMIN_EDU' ? 'EDUCATION' : 'ONLINE'}`, 'GET')
    const moduleLessonGet = useGlobalRequest(`${moduleCategoryId}${categoryId}`, 'GET')
    const lessonAdd = useGlobalRequest(lessonCrud, 'POST', requestData)
    const lessonEdit = useGlobalRequest(`${lessonCrud}/${crudLesson.id}`, 'PUT', requestData)
    const lessonDelete = useGlobalRequest(`${lessonCrud}/${crudLesson.id}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
        categoryLists.globalDataFunc()
    }, []);

    useEffect(() => {
        if (!editOrDeleteStatus) globalDataFunc()
    }, [page, name, moduleId, categoryId]);

    useEffect(() => {
        if (categoryId) moduleLessonGet.globalDataFunc()
    }, [categoryId]);

    useEffect(() => {
        crudLesson.moduleId = 0
    }, [crudLesson.categoryId]);

    useEffect(() => {
        if (lessonAdd.response) {
            globalDataFunc()
            toast.success('Dars muvaffaqiyatli qushildi')
            closeModal()
        } else if (lessonEdit.response) {
            globalDataFunc()
            toast.success('Dars muvaffaqiyatli taxrirlandi')
            closeModal()
        } else if (lessonDelete.response) {
            globalDataFunc()
            toast.success('Dars muvaffaqiyatli uchirildi')
            closeModal()
        }
        consoleClear()
    }, [lessonAdd.response, lessonEdit.response, lessonDelete.response]);

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
            <Breadcrumb pageName={`Darslar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Dars qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
                <div
                    className={`w-full lg:max-w-[60%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5`}
                >
                    <Input
                        className={`w-full bg-transparent h-11 custom-input`}
                        placeholder="Darsni qidirish..."
                        onChange={(val) => setName(val.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder={`Kurs buyicha qidirish`}
                        className={`w-full bg-transparent h-11 custom-select`}
                        onChange={(value) => setCategoryId(value)}
                        allowClear
                    >
                        {categoryLists.response && categoryLists.response.map((item: any) => (
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                    <Select
                        // value={moduleId}
                        placeholder={`Modul buyicha qidirish`}
                        className={`w-full bg-transparent h-11 custom-select`}
                        onChange={(value) => setModuleId(value)}
                        allowClear
                    >
                        {moduleLessonGet.response && moduleLessonGet.response.map((item: any) => (
                            <Select.Option value={item.moduleId} key={item.moduleId}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </div>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={lessonPageThead}>
                        {(response && response.body.length > 0) ? response.body.map((lesson: any, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {lesson.name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {lesson.moduleName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {lesson.moduleName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 min-w-[250px]">
                                    <p className="text-black">
                                        {lesson.description.length > 20 ?
                                            <Popover title={lesson.description}
                                                     overlayStyle={{textAlign: 'center', maxWidth: '400px'}}>
                                                {lesson.description.slice(0, 20)}...
                                            </Popover> : lesson.description}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black hover:cursor-pointer hover:text-lighterGreen duration-300" onClick={() => {
                                        openModal()
                                        setEditOrDeleteStatus('OPEN_VIDEO')
                                        setCrudLesson(lesson)
                                    }}>
                                        vedioni ko'rish
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {lesson.videoTime ? lesson.videoTime : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <Checkbox
                                        setIsChecked={() => !lesson.userActive}
                                        isChecked={lesson.userActive}
                                        id={idx}
                                    />
                                </td>
                                <td className="border-b border-[#eee] p-5 flex items-center justify-start gap-3">
                                    <FaEdit
                                        className={`text-xl hover:cursor-pointer hover:text-yellow-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('EDIT')
                                            setCrudLesson(lesson)
                                        }}
                                    />
                                    <AiFillDelete
                                        className={`text-xl hover:cursor-pointer hover:text-red-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('DELETE')
                                            setCrudLesson(lesson)
                                        }}
                                    />
                                    {admin_role === 'ADMIN_EDU' && (
                                        <Popover title="Darsga task qushish" overlayStyle={{textAlign: 'center'}}>
                                            <MdNextPlan
                                                className={`text-2xl hover:cursor-pointer hover:text-darkGreen duration-300`}
                                                onClick={() => navigate(`/edu/task/${lesson.id}`)}
                                            />
                                        </Popover>
                                    )}
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={lessonPageThead.length}
                            >
                                Ma'lumot topilmadi
                            </td>
                        </tr>}
                    </Tables>
                )}
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={response ? response.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu darsni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (editOrDeleteStatus === 'OPEN_VIDEO'
                            ? <VideoPlayer videoId={crudLesson.videoLink} key={crudLesson.id} className={`mt-7`}/>
                            : <div className={`mt-7`}>
                                <div className={`flex justify-center`}>
                                    <ImgUpload imgID={crudLesson.fileId && crudLesson.fileId} textType/>
                                </div>
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

export default Lesson;
