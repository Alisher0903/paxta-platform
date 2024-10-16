import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {MdDelete, MdOutlineGroupAdd} from "react-icons/md";
import Tables from "@/components/custom/tables/table.tsx";
import {userTableHead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import React, {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {
    allUsers,
    groupList, imgGet,
    userCreate,
    userDeleted,
    userGroupEdit, userGroupEditUser,
    userRoleUpdate, userTeacherGet,
    userUpdate
} from "@/helpers/api.tsx";
import {Dropdown, Input, Menu, MenuProps, Pagination, Select, Space} from "antd";
import {CiMenuKebab} from "react-icons/ci";
import {LiaUserEditSolid} from "react-icons/lia";
import Modal from "@/components/custom/modal/modal.tsx";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import ImgUpload from "@/components/custom/imagesData/img-upload.tsx";
import toast from "react-hot-toast";
import globalStore from "@/helpers/state-management/globalStore.tsx";
import images from '@/assets/images/user.jpg'
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const crudValueDef = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    password: '',
    groupId: ''
}

const Users = () => {
    const [name, setName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [group, setGroup] = useState<string | null>(null);
    const [teacher, setTeacher] = useState<string | null>(null);
    const [page, setPage] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updateGroupId, setUpdateGroupId] = useState<string>('');
    const [crudValue, setCrudValue] = useState<any>(crudValueDef);
    const admin_role = sessionStorage.getItem('admin_roles');
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const {imgUpload} = globalStore()

    // ===========================REQUEST FUNCTION================================
    const urls = () => {
        if (admin_role === 'ADMIN_QUIZ') return `QUIZ`
        else if (admin_role === 'ADMIN_ONLINE') return `ONLINE`
        else if (admin_role === 'ADMIN_EDU') return `EDUCATION`
    }
    const getTestUrl = () => {
        const queryParams: string = [
            name ? `name=${name}` : '',
            teacher ? `teacherId=${teacher}` : '',
            group ? `groupId=${group}` : '',
            phone ? `phone_number=${phone}` : ''
        ].filter(Boolean).join('&');

        return `${allUsers}?${queryParams ? `${queryParams}&` : ''}type=${urls()}&page=${page}&size=10`;
    }
    const users = useGlobalRequest(getTestUrl(), 'GET');
    const teachersList = useGlobalRequest(userTeacherGet, 'GET');
    const groups = useGlobalRequest(groupList, 'GET');
    const userAdd = useGlobalRequest(`${userCreate}?groupId=${crudValue.groupId}`, 'POST', {
        firstName: crudValue.firstName,
        lastName: crudValue.lastName,
        phoneNumber: crudValue.phoneNumber,
        password: crudValue.password
    });
    const userEdit = useGlobalRequest(`${userUpdate}${crudValue.userId}${imgUpload ? `?fileId=${imgUpload}` : ''}`, 'PUT', {
        firstName: crudValue.firstName,
        lastName: crudValue.lastName,
        phoneNumber: crudValue.phoneNumber,
        password: crudValue.password
    });
    const userDelete = useGlobalRequest(`${userDeleted}${crudValue.userId}`, 'DELETE');
    const userGroupUpdate = useGlobalRequest(`${userGroupEdit}${crudValue.userId}/${updateGroupId}`, 'PUT');
    const userGroupUpdateUser = useGlobalRequest(`${userGroupEditUser}${crudValue.userId}/${updateGroupId}`, 'PUT');
    const userRoleEdit = useGlobalRequest(`${userRoleUpdate}${crudValue.userId}`, 'POST');

    useEffect(() => {
        users.globalDataFunc()
        groups.globalDataFunc();
        teachersList.globalDataFunc()
    }, []);

    useEffect(() => {
        users.globalDataFunc()
        if (users.response && users.response.totalElements < 10) setPage(0)
    }, [name, phone, group, teacher, page]);

    useEffect(() => {
        if (userAdd.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('Foydalanuvchi muvaffaqiyatli qo\'shildi')
        }
        if (userEdit.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('Foydalanuvchi muvaffaqiyatli taxrirlandi')
        }
        if (userDelete.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('Foydalanuvchi muvaffaqiyatli o\'chirildi')
        }
        if (userGroupUpdate.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('O\'zgarishlar muvaffaqiyatli saqlandi')
        }
        if (userRoleEdit.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('Foydalanuvchi roli muvaffaqiyatli o\'zgartirildi')
        }
        if (userGroupUpdateUser.response) {
            users.globalDataFunc()
            closeModal()
            toast.success('O\'zgarishlar muvaffaqiyatli saqlandi')
        }
        consoleClear()
    }, [userAdd.response, userEdit.response, userDelete.response, userGroupUpdate.response, userRoleEdit.response, userGroupUpdateUser.response]);

    const userRole = (role: string) => {
        if (role === 'ROLE_STUDENT') return 'O\'quvchi';
        else if (role === 'ROLE_USER') return 'Boshqa foydalanuvchi';
        else if (role === 'ROLE_TEACHER') return 'O\'qituvchi';
    }

    const getItems = (user: any): MenuProps['items'] => [
        {
            label: <div className={`flex items-center gap-3`}>
                <FaEdit className="text-base text-yellow-300 cursor-pointer duration-300"/>
                <p>Taxrirlash</p>
            </div>,
            key: '0',
            onClick: () => {
                openModal()
                setEditOrDeleteStatus('EDIT')
                setCrudValue(user)
            }
        },
        {
            label: <div className={`flex items-center gap-3`}>
                <MdDelete className="text-xl text-red-300 cursor-pointer duration-300"/>
                <p>O'chirish</p>
            </div>,
            key: '1',
            onClick: () => {
                openModal()
                setEditOrDeleteStatus('DELETE')
                setCrudValue(user)
            }
        },
        {
            label: <div className={`flex items-center gap-3`}>
                <LiaUserEditSolid className="text-xl text-orange-300 cursor-pointer duration-300"/>
                <p>O'qituvchi qilib tayinlash</p>
            </div>,
            key: '2',
            onClick: () => {
                console.log(user.role)
                if (user.role === 'ROLE_STUDENT' || user.role === 'ROLE_USER') {
                    openModal()
                    setEditOrDeleteStatus('ROLE_EDIT')
                    setCrudValue(user)
                } else toast.error('Bu foydalanuvchini rolini uzgartira olmaysiz')
            }
        },
        {
            // edu da
            label: <div className={`flex items-center gap-3`}>
                <MdOutlineGroupAdd className="text-xl text-blue-300 cursor-pointer duration-300"/>
                <p>Guruhni o'zgartirish</p>
            </div>,
            key: '3',
            onClick: () => {
                if (user.role === 'ROLE_STUDENT') {
                    if (admin_role === 'ADMIN_EDU') {
                        openModal()
                        setEditOrDeleteStatus('UserGroupAdd')
                        setCrudValue(user)
                    } else toast.error('Bu vazifani faqat EDUCATION panelda qilishingiz mumkin')
                } else toast.error('Bu foydalanuvchini guruhi yuq buni guruhini almashtira olmaysiz')
            }
        },
        {
            // edu da
            label: <div className={`flex items-center gap-3`}>
                <MdOutlineGroupAdd className="text-xl text-blue-300 cursor-pointer duration-300"/>
                <p>Guruhga qo'shish</p>
            </div>,
            key: '4',
            onClick: () => {
                if (user.role === 'ROLE_USER') {
                    if (admin_role === 'ADMIN_EDU') {
                        openModal()
                        setEditOrDeleteStatus('UserGroupEdit')
                        setCrudValue(user)
                    } else toast.error('Bu vazifani faqat EDUCATION panelda qilishingiz mumkin')
                } else toast.error('Faqat guruhi yuq foydalanuvchilarni guruhga qushish mumkin')
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

    const handleInputChange = (name: string, value: string) => setCrudValue({...crudValue, [name]: value})

    return (
        <>
            <Breadcrumb pageName={`Foydalanuvchilar`}/>

            {/*===================SEARCH===================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-3 mt-10`}>
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
                <Select
                    placeholder={`Guruh bo'yicha`}
                    className={`w-full bg-transparent h-11 custom-select`}
                    value={group}
                    onChange={(e) => setGroup(e)}
                    allowClear
                >
                    {groups.response && groups.response.map((grp: any, idx: number) => (
                        <Select.Option key={idx} value={grp.id}>{grp.name}</Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder={`O'qituvchi tanlash`}
                    className={`w-full bg-transparent h-11 custom-select`}
                    value={teacher}
                    onChange={(e) => setTeacher(e)}
                    allowClear
                >
                    {teachersList.response && teachersList.response.map((item: any) => (
                        <Select.Option key={item.userId} value={item.userId}>
                            {item.firstName} {item.lastName}
                        </Select.Option>
                    ))}
                </Select>
                {admin_role === 'ADMIN_EDU' && (
                    <ShinyButton
                        text={`Qo'shish`}
                        onClick={() => {
                            openModal()
                            setEditOrDeleteStatus('ADD')
                        }}
                        className={`bg-darkGreen py-3`}
                    />
                )}
            </div>

            {/*========================BODY===================*/}
            <div className={`mt-6`}>
                {users.loading ? <div className={`grid grid-cols-1 gap-5`}>
                        <Skeleton/>
                        <Skeleton/>
                    </div> :
                    <Tables thead={userTableHead}>
                        {(users.response && users.response.body.length > 0) ? users.response.body.map((sts: any, idx: number) => (
                            <tr key={sts.id} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <img
                                        src={sts.fileId ? `${imgGet}${sts.fileId}` : images}
                                        alt={sts.fileId ? sts.fileId : 'img'}
                                        className={`w-10 h-10 rounded-full object-cover scale-150`}
                                    />
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
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {userRole(sts.role)}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 ps-10">
                                    <Dropdown overlay={
                                        <Menu items={getItems(sts)}/>
                                    } trigger={['click']} arrow>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                                <CiMenuKebab
                                                    className={`text-2xl duration-300 hover:cursor-pointer text-darkGreen`}/>
                                            </Space>
                                        </a>
                                    </Dropdown>
                                </td>
                            </tr>
                        )) : <tr>
                            <td className="border-b border-[#eee] p-5" colSpan={userTableHead.length}>
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
                            {editOrDeleteStatus === 'EDIT' && (
                                <div className="mb-4 mt-5 flex justify-center">
                                    <ImgUpload imgID={crudValue?.fileId}/>
                                </div>
                            )}
                            {editOrDeleteStatus === 'ADD' && (
                                <select
                                    onChange={(e) => handleInputChange(`groupId`, e.target.value)}
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mt-7 mb-4"
                                >
                                    <option disabled selected>
                                        Guruhni tanlang
                                    </option>
                                    {groups.response && groups.response.map((item: any) => (
                                        <option value={item.id} key={item.id}>{item.name}</option>
                                    ))}
                                </select>
                            )}
                            {(editOrDeleteStatus === 'UserGroupAdd' || editOrDeleteStatus === 'UserGroupEdit') && (
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
                            )}
                            {editOrDeleteStatus === 'ROLE_EDIT' && (
                                <p className={`my-5 text-center`}>
                                    Foydalanuvchini rolini o'qituvchi qilib uzgartirmoqchimisiz
                                </p>
                            )}
                            {(editOrDeleteStatus === 'ADD' || editOrDeleteStatus === 'EDIT') && (<>
                                <div className="mb-4">
                                    <input
                                        required
                                        value={crudValue?.firstName}
                                        onChange={e => handleInputChange('firstName', e.target.value)}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Ism...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        required
                                        value={crudValue?.lastName}
                                        onChange={e => handleInputChange('lastName', e.target.value)}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Familiya...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className={`mb-2`}>Raqam kiritish uchun namuna: 998912120257</label>
                                    <input
                                        required
                                        type={`number`}
                                        value={crudValue?.phoneNumber}
                                        onChange={e => {
                                            const v = e.target.value
                                            if (v.length >= 0 && v.length < 13) handleInputChange('phoneNumber', v)
                                        }}
                                        onKeyDown={(e) => {
                                            if (e.key === "-" || e.key === "e" || e.key === "+") e.preventDefault();
                                        }}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Telefon raqam...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <input
                                        required
                                        type={`password`}
                                        value={crudValue?.password}
                                        onChange={e => handleInputChange('password', e.target.value)}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Parol...`}
                                    />
                                </div>
                            </>)}
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
                            {editOrDeleteStatus === 'ADD' && (
                                <ShinyButton
                                    text={userAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                    className={`bg-darkGreen ${userAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userAdd.loading) {
                                            if (crudValue?.firstName && crudValue?.lastName && crudValue?.phoneNumber && crudValue?.password && crudValue?.groupId) userAdd.globalDataFunc()
                                            else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                        }
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'EDIT' && (
                                <ShinyButton
                                    text={userEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                    className={`bg-darkGreen ${userEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userEdit.loading) {
                                            if (crudValue?.firstName && crudValue?.lastName && crudValue?.phoneNumber && crudValue?.password) userEdit.globalDataFunc()
                                            else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                        }
                                    }}
                                />
                            )}
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
                                    text={userGroupUpdate.loading ? 'Yuklanmoqda...' : 'Saqlash'}
                                    className={`bg-darkGreen ${userGroupUpdate.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userGroupUpdate.loading) userGroupUpdate.globalDataFunc()
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'UserGroupEdit' && (
                                <ShinyButton
                                    text={userGroupUpdateUser.loading ? 'Yuklanmoqda...' : 'Saqlash'}
                                    className={`bg-darkGreen ${userGroupUpdateUser.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userGroupUpdateUser.loading) userGroupUpdateUser.globalDataFunc()
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'ROLE_EDIT' && (
                                <ShinyButton
                                    text={userRoleEdit.loading ? 'Yuklanmoqda...' : 'Saqlash'}
                                    className={`bg-darkGreen ${userRoleEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userRoleEdit.loading) userRoleEdit.globalDataFunc()
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

export default Users;
