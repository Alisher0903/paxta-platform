import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {imgGet, taskCrud} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import {useParams} from "react-router-dom";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {Card, CardDescription, CardTitle} from "@/components/ui/card-hover-effect.tsx";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import {Image} from "antd";
import images from '@/assets/images/img.avif';

const defVal = {
    maydoni:0,
    paxtaHajmi:0,
    mashinaHolati:true,
    hisobotVaqti: ''
};

const MasterAddReport = () => {
    const {id} = useParams();
    const [isModal, setIsModal] = useState(false);
    const [imageError, setImageError] = useState('');
    const [crudTask, setCrudTask] = useState<any>(defVal);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore();
    const [timeOptions, setTimeOptions] = useState<any>([]); // Time options from API

    const requestData = {
        maydoni: crudTask.maydoni,
        paxtaHajmi: crudTask.paxtaHajmi,
        mashinaHolati: crudTask.mashinaHolati,
        buzilganSoat: crudTask.buzilganSoat || 0,
        buzilganTime: crudTask.buzilganTime || 0,
        machineStatus: crudTask.machineStatus || null,
        hisobotVaqti: crudTask.hisobotVaqti,
        historyTime: crudTask.historyTime,
    };

    const {loading, response, globalDataFunc} = useGlobalRequest(`${taskCrud}`, 'GET');
    const taskAdd = useGlobalRequest(`${taskCrud}/create`, 'POST', requestData);
    const taskEdit = useGlobalRequest(`${taskCrud}${crudTask.id}`, 'PUT', requestData);
    const taskDelete = useGlobalRequest(`${taskCrud}${crudTask.id}`, 'DELETE');
    const getTime = useGlobalRequest(`${taskCrud}/time-list`, 'GET'); // Fetch available time slots

    useEffect(() => {
        globalDataFunc();
        getTime.globalDataFunc();
    }, []);

    useEffect(() => {
        if (getTime.response) {
            console.log("Response body:", getTime.response.body); // Ma'lumotni ko'rish uchun
            if (typeof getTime.response.body === 'string') {
                const timeArray = getTime.response.body.split(','); // Agar bu string bo'lsa, split qilamiz
                setTimeOptions(timeArray);
            } else if (Array.isArray(getTime.response.body)) {
                setTimeOptions(getTime.response.body); // Agar massiv bo'lsa, to'g'ridan-to'g'ri o'rnatamiz
            }
        }
    }, [getTime.response]);

    useEffect(() => {
        if (taskAdd.response) {
            globalDataFunc();
            toast.success('Task muvaffaqiyatli qushildi');
            closeModal();
        } else if (taskEdit.response) {
            globalDataFunc();
            toast.success('Task muvaffaqiyatli taxrirlandi');
            closeModal();
        } else if (taskDelete.response) {
            globalDataFunc();
            toast.success('Task muvaffaqiyatli uchirildi');
            closeModal();
        }
        consoleClear();
    }, [taskAdd.response, taskEdit.response, taskDelete.response]);

    const handleChange = (name: string, value: string) => {
        // If the changed field is "hisobotVaqti", extract hours and minutes
        if (name === 'hisobotVaqti') {
            const [hours, minutes] = value.split(':');
            console.log('Soat:', hours, 'Daqiqalar:', minutes);
        }
        setCrudTask({...crudTask, [name]: value});
    };

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudTask(defVal);
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
                                        <p><span className={`font-semibold text-black`}>Task tavsifi:</span> {`${task.description}`}</p>
                                        <p className={`flex items-center gap-5`}>
                                            <FaEdit
                                                className={`text-xl hover:text-yellow-500 cursor-pointer duration-300`}
                                                onClick={() => {
                                                    openModal();
                                                    setEditOrDeleteStatus('EDIT');
                                                    setCrudTask(task);
                                                }}
                                            />
                                            <AiFillDelete
                                                className={`text-xl hover:text-red-500 cursor-pointer duration-300`}
                                                onClick={() => {
                                                    openModal();
                                                    setEditOrDeleteStatus('DELETE');
                                                    setCrudTask(task);
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
                        <div>
                            <h2 className="font-bold text-2xl">Hisobot qo'shish</h2>
                            <div className={`mt-7`}>
                                <input
                                    value={crudTask.maydoni}
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder="Paxta maydoni (GK)"
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                                />
                                <input
                                    value={crudTask.paxtaHajmi}
                                    onChange={(e) => handleChange('description', e.target.value)}
                                    placeholder="Paxta hajmi ( TN )"
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                                />
                                {/* New time select input */}
                                <select
                                    value={crudTask.hisobotVaqti}
                                    onChange={(e) => handleChange('hisobotVaqti', e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                                >
                                    <option value="" disabled>Vaqtni tanlang</option>
                                    {timeOptions.map((time:any, index:any) => (
                                        <option key={index} value={time}>{time}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}

                    <div className={`flex justify-between items-center mt-5`}>
                        <button className="bg-darkGreen text-white py-2 px-4 rounded" onClick={closeModal}>
                            Bekor qilish
                        </button>
                        <button
                            className="bg-darkGreen text-white py-2 px-4 rounded"
                            onClick={editOrDeleteStatus === 'POST' ? taskAdd.globalDataFunc : editOrDeleteStatus === 'EDIT' ? taskEdit.globalDataFunc : taskDelete.globalDataFunc}
                        >
                            {editOrDeleteStatus === 'DELETE' ? 'O‘chirish' : 'Saqlash'}
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default MasterAddReport;
