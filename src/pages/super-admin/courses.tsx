import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {CourseCard} from "@/components/custom/cards/course-card.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import Modal from "@/components/custom/modal/modal.tsx";
import React, {useEffect, useState} from "react";
import ImgUpload from "@/components/custom/imagesData/img-upload.tsx";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import globalStore from "@/helpers/state-management/globalStore.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {categoryAdd, categoryDelete, categoryList, categoryUpdate, imgGet} from "@/helpers/api.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import images from '@/assets/images/img.avif'
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import toast from "react-hot-toast";

const Courses = () => {
    const admin_role = sessionStorage.getItem("admin_roles");
    const {imgUpload, setImgUpload} = globalStore()
    const {
        crudValue,
        setCrudValue,
        courseData,
        setCourseData,
        crudValueDef,
        editOrDeleteStatus,
        setEditOrDeleteStatus
    } = courseStore()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const requestObj = {
        name: crudValue?.name,
        description: crudValue?.description,
        fileId: imgUpload ? imgUpload : crudValue?.fileId ? crudValue.fileId : 0,
    }

    // ================REQUEST METHODS================
    const urls = (url: string) => {
        if (admin_role === 'ADMIN_QUIZ') return `${url}QUIZ`
        else if (admin_role === 'ADMIN_ONLINE') return `${url}ONLINE`
        else if (admin_role === 'ADMIN_EDU') return `${url}EDUCATION`
        else return ''
    }
    const categoryListDataGet = useGlobalRequest(urls(categoryList), 'GET');
    const categoryDataAdd = useGlobalRequest(urls(categoryAdd), 'POST', requestObj);
    const categoryDataDelete = useGlobalRequest(`${categoryDelete}${crudValue?.id}`, 'DELETE');
    const categoryDataEdit = useGlobalRequest(`${categoryUpdate}${crudValue?.id}`, 'PUT', requestObj);
    const categoryGetFunc = () => categoryListDataGet.globalDataFunc()

    useEffect(() => {
        categoryGetFunc()
        consoleClear()
    }, []);

    useEffect(() => {
        setCourseData(categoryListDataGet.response)
    }, [categoryListDataGet.response, admin_role]);

    useEffect(() => {
        if (categoryDataAdd.response) {
            categoryGetFunc()
            closeModal()
            toast.success(`${admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalish' : 'Kurs'} muvaffaqiyatli qo'shildi`)
        } else if (categoryDataEdit.response) {
            categoryGetFunc()
            closeModal()
            toast.success(`${admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalish' : 'Kurs'} muvaffaqiyatli taxrirlandi`)
        } else if (categoryDataDelete.response) {
            categoryGetFunc()
            closeModal()
            toast.success(`${admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalish' : 'Kurs'} muvaffaqiyatli o'chirildi`)
        }
        consoleClear()
    }, [categoryDataAdd.response, categoryDataEdit.response, categoryDataDelete.response]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditOrDeleteStatus('');
            setCrudValue(crudValueDef);
            setImgUpload(null)
        }, 500)
    };

    const handleInputChange = (name: string, value: string) => setCrudValue({...crudValue, [name]: value})

    return (
        <>
            <Breadcrumb pageName={admin_role === 'ADMIN_QUIZ' ? `Yo'nalishlar` : 'Kurslar'}/>

            {/*==================SEARCH=================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10 mb-6`}>
                <ShinyButton
                    text={`Qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('ADD')
                    }}
                />
                <div
                    className={`w-full lg:max-w-[30%] flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}>
                    <input
                        type={`search`}
                        disabled
                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                        placeholder={`${admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalishlar' : 'Kurslar'} nomi bo'yicha qidirish...`}
                    />
                </div>
            </div>

            {/*=======================BODY CARD======================*/}
            {categoryListDataGet.loading ? <div
                className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 overflow-hidden`}
            >{[...Array(6)].map((_, index) => <Skeleton key={index}/>)}</div> : courseData ?
                <div
                    className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5 overflow-hidden`}
                >{courseData.map((data, index) =>
                    <CourseCard
                        imgUrl={data.fileId ? `${imgGet}${data.fileId}` : images}
                        title={data.name}
                        desc={data.description}
                        openModal={openModal}
                        fullData={data}
                        key={index}
                    />
                )}</div>
                : <div className={`text-xl md:text-3xl text-center text-black w-full mt-12`}>Ma'lumot topilmadi</div>}

            {/*==========UNIVERSAL MODAL============*/}
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <form className={`mt-5`} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                        {editOrDeleteStatus !== 'DELETE' ? (<>
                            <div className="mb-4 mt-5 flex justify-center">
                                <ImgUpload imgID={crudValue?.fileId ? crudValue.fileId : ''}/>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    {admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalish' : 'Kurs'} nomi
                                </label>
                                <input
                                    required
                                    value={crudValue?.name}
                                    onChange={e => handleInputChange('name', e.target.value)}
                                    className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                    placeholder={`${admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalish' : 'Kurs'} nomini kiriting...`}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">
                                    {admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalish' : 'Kurs'} tavsifi
                                </label>
                                <input
                                    required
                                    value={crudValue?.description}
                                    onChange={e => handleInputChange('description', e.target.value)}
                                    className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                    placeholder={`${admin_role === 'ADMIN_QUIZ' ? 'Yo\'nalish' : 'Kurs'} tavsifini kiriting...`}
                                />
                            </div>
                        </>) : <>
                            <p className={`text-center text-black text-base lg:text-xl mb-10`}>
                                Haqiqatdan xam bu {admin_role === 'ADMIN_QUIZ' ? 'yo\'nalishni' : 'kursni'} o'chirib
                                tashlamoqchimisiz?
                            </p>
                        </>}

                        <div className={`flex justify-end items-center gap-5`}>
                            <ShinyButton
                                text={`Orqaga`}
                                className={`bg-darkGreen`}
                                onClick={closeModal}
                            />
                            {editOrDeleteStatus === 'ADD' && (
                                <ShinyButton
                                    text={categoryDataAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                    className={`bg-darkGreen ${categoryDataAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!categoryDataAdd.loading) {
                                            if (crudValue?.name && crudValue?.description) categoryDataAdd.globalDataFunc()
                                            else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                        }
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'EDIT' && (
                                <ShinyButton
                                    text={categoryDataEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                    className={`bg-darkGreen ${categoryDataEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!categoryDataEdit.loading) {
                                            if (crudValue?.name && crudValue?.description) categoryDataEdit.globalDataFunc()
                                            else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                        }
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'DELETE' && (
                                <ShinyButton
                                    text={categoryDataDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                    className={`bg-darkGreen ${categoryDataDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!categoryDataDelete.loading) categoryDataDelete.globalDataFunc()
                                    }}
                                />
                            )}
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
};

export default Courses;
