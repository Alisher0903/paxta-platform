import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {MdDelete, MdOutlineGroupAdd} from "react-icons/md";
import Tables from "@/components/custom/tables/table.tsx";
import {confirmUserTHead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function";
import React, {useEffect, useState} from "react";
import Skeleton from "@/components/custom/skeleton/skeleton-cards";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {groupList, notificationDelete, userConfirms, userGroupEditUser} from "@/helpers/api.tsx";
import {Dropdown, Input, Menu, MenuProps, Pagination, Space} from "antd";
import {CiMenuKebab} from "react-icons/ci";
import Modal from "@/components/custom/modal/modal.tsx";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import toast from "react-hot-toast";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const crudValueDef = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    groupId: ''
}

const UsersEdu = () => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateGroupId, setUpdateGroupId] = useState<string>('');
    const [crudValue, setCrudValue] = useState<any>(crudValueDef);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()

    // ===========================REQUEST FUNCTION================================
    const getTestUrl = () => {
        const queryParams: string = [
            name ? `name=${name}` : '',
            phone ? `phone_number=${phone}` : ''
        ].filter(Boolean).join('&');

        return `${userConfirms}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
    }
    const users = useGlobalRequest(getTestUrl(), 'GET');
    const groups = useGlobalRequest(groupList, 'GET');
    const userDelete = useGlobalRequest(`${notificationDelete}${crudValue.userId}`, 'DELETE');
    const userGroupUpdateUser = useGlobalRequest(`${userGroupEditUser}${crudValue.userId}/${updateGroupId}`, 'PUT');

    useEffect(() => {
        users.globalDataFunc()
        groups.globalDataFunc()
    }, []);

    useEffect(() => {
        users.globalDataFunc()
        if (users.response && users.response.totalElements < 10) setPage(0)
    }, [name, phone, page]);

    useEffect(() => {
        if (userDelete.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('Foydalanuvchi muvaffaqiyatli o\'chirildi')
        }
        if (userGroupUpdateUser.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('Foydalanuvchini guruhga muvaffaqiyatli qushdingiz')
        }
        consoleClear()
    }, [userDelete.response, userGroupUpdateUser.response]);

    const getItems = (user: any): MenuProps['items'] => [
        {
            label: <div className={`flex items-center gap-3`}>
                <MdDelete className="text-xl text-red-300 cursor-pointer duration-300"/>
                <p>O'chirish</p>
            </div>,
            key: '0',
            onClick: () => {
                openModal()
                setEditOrDeleteStatus('DELETE')
                setCrudValue(user)
            }
        },
        {
            label: <div className={`flex items-center gap-3`}>
                <MdOutlineGroupAdd className="text-xl text-blue-300 cursor-pointer duration-300"/>
                <p>Guruhga qo'shish</p>
            </div>,
            key: '1',
            onClick: () => {
                openModal()
                setEditOrDeleteStatus('UserGroupAdd')
                setCrudValue(user)
            }
        },
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditOrDeleteStatus('');
            setUpdateGroupId('');
            setCrudValue(crudValueDef);
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Foydalanuvchilar`}/>

            {/*===================SEARCH===================*/}
            <div className={`w-full flex justify-between items-center flex-wrap md:flex-nowrap gap-3 mt-10`}>
                <Input
                    className={`w-full bg-transparent h-11 custom-input`}
                    placeholder="F.I.O qidirish..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    allowClear
                />
                <Input
                    className={`w-full bg-transparent h-11 custom-input`}
                    placeholder="Telifon raqam bo'yicha..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    allowClear
                />
            </div>

            {/*========================BODY===================*/}
            <div className={`mt-6`}>
                {users.loading ? <div className={`grid grid-cols-1 gap-5`}>
                        <Skeleton/>
                        <Skeleton/>
                    </div> :
                    <Tables thead={confirmUserTHead}>
                        {(users.response && users.response.body.length > 0) ? users.response.body.map((sts: any, idx: number) => (
                            <tr key={sts.id} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.firstName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.lastName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.phoneNumber}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 ps-9">
                                    <Dropdown overlay={
                                        <Menu items={getItems(sts)}/>
                                    } trigger={['click']} arrow>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <CiMenuKebab
                                                    className={`text-2xl duration-300 hover:cursor-pointer text-darkGreen`}
                                                />
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </td>
                            </tr>
                        )) : <tr>
                            <td className="border-b border-[#eee] p-5" colSpan={confirmUserTHead.length}>
                                <p className="text-black text-center">
                                    Foydalanuvchilar topilmadi
                                </p>
                            </td>
                        </tr>}
                    </Tables>
                }
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={users.response ? users.response.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            {/*==========UNIVERSAL MODAL============*/}
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <form className={`mt-5`} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                        {editOrDeleteStatus !== 'DELETE' ? (<>
                            <select
                                onChange={(e) => setUpdateGroupId(e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mt-7 mb-4"
                            >
                                <option disabled selected>
                                    Guruhni tanlang
                                </option>
                                {groups.response && groups.response.map((item: any) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </>) : <>
                            <p className={`text-center text-black text-base lg:text-xl mb-10`}>
                                Haqiqatdan xam bu foydalanuvchini o'chirib tashlamoqchimisiz?
                            </p>
                        </>}

                        <div className={`flex justify-end items-center gap-5`}>
                            <ShinyButton
                                text={`Orqaga`}
                                className={`bg-darkGreen`}
                                onClick={closeModal}
                            />
                            {editOrDeleteStatus === 'DELETE' && (
                                <ShinyButton
                                    text={userDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                    className={`bg-darkGreen ${userDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userDelete.loading) userDelete.globalDataFunc()
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'UserGroupAdd' && (
                                <ShinyButton
                                    text={userGroupUpdateUser.loading ? 'Yuklanmoqda...' : 'Saqlash'}
                                    className={`bg-darkGreen ${userGroupUpdateUser.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userGroupUpdateUser.loading) userGroupUpdateUser.globalDataFunc()
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

export default UsersEdu;
