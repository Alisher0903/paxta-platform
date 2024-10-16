import React, {useState, ReactNode, useEffect} from 'react';
import Header from '../components/custom/Header/index';
import Sidebar from '../components/custom/Sidebar/index';
import {useLocation, useNavigate} from 'react-router-dom';
import Modal from '@/components/custom/modal/modal';
import {IoIosLogOut} from 'react-icons/io';
import ShinyButton from '@/components/magicui/shiny-button';
import {Input} from "antd";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {config} from "@/helpers/token.tsx";
// import ImgUpload from "@/components/custom/imagesData/img-upload.tsx";
import globalStore from "@/helpers/state-management/globalStore.tsx";
import {notificationCount, notificationSend, userGetMe} from "@/helpers/api.tsx";
import toast from "react-hot-toast";
import ImgUpload from "@/components/custom/imagesData/img-upload.tsx";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({children}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isVisibleSidebar, setIsVisibleSidebar] = useState<boolean>(false);
    const [isNotificationModal, setIsNotificationModal] = useState<boolean>(false);
    const [notTitle, setNotTitle] = useState<string>('');
    const [notContent, setNotContent] = useState<string>('');
    const {pathname} = useLocation();
    const navigate = useNavigate()
    const {imgUpload, setImgUpload, setNotificationCounts, setMeData} = globalStore()
    const {
        response,
        loading,
        globalDataFunc
    } = useGlobalRequest(`${notificationSend}${imgUpload ? `?fileId=${imgUpload}` : ''}`, 'POST', {
        title: notTitle,
        content: notContent
    }, config)
    const getNotificationCount = useGlobalRequest(notificationCount, 'GET', '', config)
    const getMe = useGlobalRequest(userGetMe, 'GET', '', config)

    useEffect(() => {
        setIsVisibleSidebar(!(pathname.startsWith('/auth')))
    }, [pathname])

    useEffect(() => {
        if (response) {
            toast.success('Xabar muvaffaqiyatli junatildi')
            closeNotificationModal()
        }
    }, [response])

    useEffect(() => {
        getNotificationCount.globalDataFunc()
        getMe.globalDataFunc()
    }, []);

    useEffect(() => {
        if (getMe.response) setMeData(getMe.response)
        if (getNotificationCount.response) setNotificationCounts(getNotificationCount.response)
    }, [getMe.response, getNotificationCount.response]);

    const toggleModal = () => setIsOpenModal(!isOpenModal)
    const openNotificationModal = () => setIsNotificationModal(true)
    const closeNotificationModal = () => {
        setIsNotificationModal(false)
        setNotTitle('')
        setNotContent('')
        setImgUpload(null)
    }

    return (
        <div className="bg-[#fff] text-black">
            <div className="flex h-screen overflow-hidden">
                {isVisibleSidebar &&
                    <Sidebar toggleModal={toggleModal} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>}
                <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                    {isVisibleSidebar && <Header
                        sidebarOpen={sidebarOpen}
                        setSidebarOpen={setSidebarOpen}
                        toggleNotificationModal={openNotificationModal}
                    />}
                    <main>
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>

            <Modal isOpen={isNotificationModal} onClose={closeNotificationModal}>
                <p className='text-2xl text-center text-black-2 my-3'>Platformadagi hammaga xabar junatish</p>
                <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem] flex flex-col gap-3 items-center justify-center">
                    <ImgUpload textType/>
                    <p className={`-translate-y-3`}>File yuborish ixtiyory</p>
                    <Input
                        value={notTitle}
                        className={`w-full bg-transparent h-11 custom-input`}
                        placeholder="Xabar nomi"
                        onChange={(val) => setNotTitle(val.target.value)}
                    />
                    <Input.TextArea
                        rows={4}
                        value={notContent}
                        className={`w-full bg-transparent h-11 custom-input`}
                        placeholder={`Xabar kontentini bu yerga kiriting...`}
                        onChange={(val) => setNotContent(val.target.value)}
                        maxLength={5000}
                    />
                    <div className='flex justify-end items-center gap-3 w-full mt-5'>
                        <ShinyButton
                            text='Orqaga'
                            className='bg-darkGreen'
                            onClick={closeNotificationModal}
                        />
                        <ShinyButton
                            text={`${loading ? 'Yuborilmoqda...' : 'Yuborish'}`}
                            className={`bg-darkGreen ${loading && 'cursor-not-allowed opacity-50'}`}
                            onClick={() => {
                                if (!loading) {
                                    if (notTitle && notContent) globalDataFunc()
                                    else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                }
                            }}
                        />
                    </div>
                </div>
            </Modal>

            <Modal isOpen={isOpenModal} onClose={toggleModal}>
                <div className="w-54 sm:w-64 md:w-96 lg:w-[40rem] flex flex-col gap-3 items-center justify-center">
                    <IoIosLogOut color='#16423C' size={100}/>
                    <p className='text-2xl text-center text-black-2'>Siz aniq tizimdan chiqmoqchimisz?</p>
                    <div className='flex gap-3'>
                        <ShinyButton
                            text='Orqaga'
                            className='bg-darkGreen'
                            onClick={toggleModal}
                        />
                        <ShinyButton
                            text='Chiqish'
                            className='bg-darkGreen'
                            onClick={() => {
                                sessionStorage.clear()
                                navigate('/auth/login');
                                toggleModal()
                            }}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DefaultLayout;
