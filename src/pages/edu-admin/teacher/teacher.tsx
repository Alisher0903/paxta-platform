import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {teacherThead} from "@/helpers/constanta.tsx";
import toast from "react-hot-toast";
import Modal from "@/components/custom/modal/modal.tsx";
import {Input} from "antd";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {useEffect, useState} from "react";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {imgGet, teacherPost, userTeacherGet} from "@/helpers/api.tsx";
import images from '@/assets/images/img.avif'

const defVal = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: ''
}

const Teacher = () => {
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const [crudTeacher, setCrudTeacher] = useState<any>(defVal)
    const [isModal, setIsModal] = useState(false);
    const {response, loading, globalDataFunc} = useGlobalRequest(userTeacherGet, 'GET')
    const teacherAdd = useGlobalRequest(teacherPost, 'POST', crudTeacher)

    useEffect(() => {
        globalDataFunc()
    }, []);

    useEffect(() => {
        if (teacherAdd.response) {
            globalDataFunc()
            closeModal()
            toast.success('Teacher muvaffaqiyatli qushildi')
        }
    }, [teacherAdd.response]);

    const handleChange = (name: string, value: string) => setCrudTeacher({...crudTeacher, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudTeacher(defVal);
            setEditOrDeleteStatus('');
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`O\'qituvchilar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`O'qituchi qo'shish`}
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
                {loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={teacherThead}>
                        {(response && response.length > 0) ? response.map((teacher: any, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <img
                                        src={teacher.fileId ? imgGet + teacher.fileId : images}
                                        alt={teacher.firstName}
                                        className={`w-10 h-10 scale-150 rounded-full object-cover`}
                                    />
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {teacher.firstName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {teacher.lastName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {teacher.phoneNumber}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {teacher.countGroup}
                                    </p>
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={teacherThead.length}
                            >
                                Ma'lumot topilmadi
                            </td>
                        </tr>}
                    </Tables>
                )}
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu darsni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (<div className={`mt-5`}>
                        <label className={`mb-2`}>O'qituvchini ismini kiriting</label>
                        <Input
                            value={crudTeacher.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            placeholder="Ismini kiriting"
                            className="w-full bg-transparent h-11 custom-input mb-5"
                        />
                        <label className={`mb-2`}>O'qituvchini familiyasini kiriting</label>
                        <Input
                            value={crudTeacher.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            placeholder="Familiyani kiriting"
                            className="w-full bg-transparent h-11 custom-input mb-5"
                        />
                        <label className={`mb-2`}>O'qituvchini telefon raqamini kiriting (Namuna: 998912120257)</label>
                        <Input
                            type={`number`}
                            value={crudTeacher.phoneNumber}
                            onChange={(e) => {
                                handleChange('phoneNumber', e.target.value)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault();
                            }}
                            placeholder="Telefon raqamini kiriting"
                            className="w-full bg-transparent h-11 custom-input mb-5"
                            maxLength={12}
                        />
                        <label className={`mb-2`}>O'qituvchini parolini kiriting</label>
                        <Input
                            value={crudTeacher.password}
                            onChange={(e) => handleChange('password', e.target.value)}
                            placeholder="Parolini kiriting"
                            className="w-full bg-transparent h-11 custom-input"
                        />
                    </div>)}
                    <div className={`flex justify-end items-center gap-5 mt-10`}>
                        <ShinyButton
                            text={`Orqaga`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        {editOrDeleteStatus === 'POST' && (
                            <ShinyButton
                                text={teacherAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${teacherAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!teacherAdd.loading) {
                                        if (crudTeacher.firstName && crudTeacher.lastName && crudTeacher.phoneNumber && crudTeacher.password) teacherAdd.globalDataFunc()
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

export default Teacher;
