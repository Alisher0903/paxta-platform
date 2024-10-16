import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {imgGet, taskCrud, taskLessonId} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import {useParams} from "react-router-dom";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import ImgUpload from "@/components/custom/imagesData/img-upload.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import globalStore from "@/helpers/state-management/globalStore.tsx";
import {Card, CardDescription, CardTitle} from "@/components/ui/card-hover-effect.tsx";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {Image} from "antd";
import images from '@/assets/images/img.avif'

const defVal = {
    name: '',
    description: '',
    fileId: 0
}

const Task = () => {
    const {id} = useParams();
    const [isModal, setIsModal] = useState(false);
    const [imageError, setImageError] = useState('');
    const [crudTask, setCrudTask] = useState<any>(defVal);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const {imgUpload, setImgUpload} = globalStore()
    const requestData = {
        name: crudTask.name,
        description: crudTask.description,
        fileId: imgUpload ? imgUpload : crudTask.fileId ? crudTask.fileId : 0,
    }

    const {loading, response, globalDataFunc} = useGlobalRequest(`${taskLessonId}${id}`, 'GET')
    const taskAdd = useGlobalRequest(`${taskCrud}${id}`, 'POST', requestData)
    const taskEdit = useGlobalRequest(`${taskCrud}${crudTask.id}`, 'PUT', requestData)
    const taskDelete = useGlobalRequest(`${taskCrud}${crudTask.id}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
    }, []);

    useEffect(() => {
        if (taskAdd.response) {
            globalDataFunc()
            toast.success('Task muvaffaqiyatli qushildi')
            closeModal()
        } else if (taskEdit.response) {
            globalDataFunc()
            toast.success('Task muvaffaqiyatli taxrirlandi')
            closeModal()
        } else if (taskDelete.response) {
            globalDataFunc()
            toast.success('Task muvaffaqiyatli uchirildi')
            closeModal()
        }
        consoleClear()
    }, [taskAdd.response, taskEdit.response, taskDelete.response]);

    const handleChange = (name: string, value: string) => setCrudTask({...crudTask, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudTask(defVal);
            setEditOrDeleteStatus('');
            setImgUpload(null)
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Darslar`} subPage={`Tasklar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Task qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {loading ? <Skeleton/> : <div className={`w-full grid grid-cols-1 gap-5`}>
                    {response ? response.map((task: any, idx: number) => (
                        <Card key={idx}>
                            <div className={`flex justify-start items-start gap-5 w-full`}>
                                {imageError === `${true}${idx}` ? (
                                    <div className={`flex justify-center items-center text-center font-bold`}>Task file</div>
                                ) : (
                                    <Image
                                        src={task.fileId ? `${imgGet}${task.fileId}` : images}
                                        alt={`img${task.fileId}`}
                                        width={100}
                                        height={70}
                                        onError={() => setImageError(`${true}${idx}`)}
                                    />
                                )}
                                <div className={`w-full`}>
                                    <CardTitle className={`flex justify-between items-center`}>
                                        {task.name}
                                        <a href={task.fileId ? imgGet + task.fileId : images} download>Yuklab olish</a>
                                    </CardTitle>
                                    <CardDescription className={`flex justify-between items-center gap-10`}>
                                        <p><span
                                            className={`font-semibold text-black`}>Task tavsifi:</span> {`${task.description}`}
                                        </p>
                                        <p className={`flex items-center gap-5`}>
                                            <FaEdit
                                                className={`text-xl hover:text-yellow-500 cursor-pointer duration-300`}
                                                onClick={() => {
                                                    openModal()
                                                    setEditOrDeleteStatus('EDIT')
                                                    setCrudTask(task)
                                                }}
                                            />
                                            <AiFillDelete
                                                className={`text-xl hover:text-red-500 cursor-pointer duration-300`}
                                                onClick={() => {
                                                    openModal()
                                                    setEditOrDeleteStatus('DELETE')
                                                    setCrudTask(task)
                                                }}
                                            />
                                        </p>
                                    </CardDescription>
                                </div>
                            </div>
                        </Card>
                    )) : <p className={`text-center mt-10 font-semibold text-xl`}>Ma'lumot topilmadi</p>}
                </div>}
            </div>

            {/*====================MODAL================*/}
            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu darsni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (
                        <div className={`mt-7`}>
                            <div className={`flex justify-center`}>
                                <ImgUpload imgID={crudTask.fileId && crudTask.fileId} textType/>
                            </div>
                            <input
                                value={crudTask.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Task nomini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                            />
                            <input
                                value={crudTask.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                placeholder="Tavsifni kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                            />
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
                                text={taskAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${taskAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!taskAdd.loading) {
                                        if (crudTask.name && crudTask.description) taskAdd.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={taskEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                className={`bg-darkGreen ${taskEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!taskEdit.loading) {
                                        if (crudTask.name && crudTask.description) taskEdit.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={taskDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                className={`bg-darkGreen ${taskDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!taskDelete.loading) taskDelete.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Task;
