import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {MdDelete} from "react-icons/md";
import Tables from "@/components/custom/tables/table.tsx";
import {userTableHead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import React, {useEffect, useState} from "react";
import {FaEdit} from "react-icons/fa";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {createUser, deleteUser, districtList, editUser, getUserList, sectorByDistrict} from "@/helpers/api.tsx";
import {Dropdown, Menu, MenuProps, Pagination, Select, Space} from "antd";
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
    lavozimi: '',
    role: '',
    districtId: 0,
    sectorId: 0
}

const Users = () => {
    const [userRoles, setUserRoles] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [crudValue, setCrudValue] = useState<any>(crudValueDef);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const requestData = {
        firstName: crudValue.firstName,
        lastName: crudValue.lastName,
        phoneNumber: crudValue.phoneNumber,
        password: crudValue.password,
        lavozimi: crudValue.lavozimi,
        role: crudValue.role,
        districtId: (crudValue.role === 'ROLE_VHOKIM' || crudValue.role === 'ROLE_THOKIM' || crudValue.role === 'ROLE_SECTOR') ? 0 : crudValue.districtId,
        sectorId: (crudValue.role === 'ROLE_VHOKIM' || crudValue.role === 'ROLE_THOKIM') ? 0 : crudValue.sectorId
    }

    // ===========================REQUEST FUNCTION================================
    const getTestUrl = () => {
        const queryParams: string = [
            userRoles ? `role=${userRoles}` : '',
        ].filter(Boolean).join('&');

        return `${getUserList}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
    }
    const users = useGlobalRequest(getTestUrl(), 'GET');
    const districtLists = useGlobalRequest(districtList, 'GET');
    const userAdd = useGlobalRequest(`${createUser}`, 'POST', requestData);
    const userEdit = useGlobalRequest(`${editUser}${crudValue.id}`, 'PUT', requestData);
    const userDelete = useGlobalRequest(`${deleteUser}${crudValue.id}`, 'DELETE');
    const getSectorList = useGlobalRequest(`${sectorByDistrict}?districtId=${crudValue.districtId}`, 'GET')

    useEffect(() => {
        users.globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        crudValue.sectorId = 0
        if (crudValue.districtId) getSectorList.globalDataFunc()
    }, [crudValue.districtId]);

    useEffect(() => {
        users.globalDataFunc()
        if (users.response && users.response.body?.totalElements < 10) setPage(0)
    }, [page, userRoles]);

    useEffect(() => {
        if (userAdd.response && userAdd.response.success) {
            users.globalDataFunc()
            closeModal()
            toast.success('Фойдаланувчи муваффақиятли қўшилди')
        } else if (userAdd.response?.message) toast.error(`${userAdd.response.message}`)
        consoleClear()
    }, [userAdd.response]);

    useEffect(() => {
        if (userEdit.response && userEdit.response.success) {
            users.globalDataFunc()
            closeModal()
            toast.success('Фойдаланувчи муваффақиятли таҳрирланди')
        } else if (userEdit.response?.message) toast.error(`${userEdit.response.message}`)
        consoleClear()
    }, [userEdit.response]);

    useEffect(() => {
        if (userDelete.response && userDelete.response.success) {
            users.globalDataFunc()
            closeModal()
            toast.success('Фойдаланувчи муваффақиятли ўчирилди')
        } else if (userDelete.response?.message) toast.error(`${userDelete.response.message}`)
        consoleClear()
    }, [userDelete.response]);

    const userRole = (role: string) => {
        if (role === 'ROLE_MASTER') return 'Бириктирилган ходим';
        else if (role === 'ROLE_THOKIM') return 'Туман ҳокими';
        else if (role === 'ROLE_VHOKIM') return 'Вилоят ҳокими';
        else if (role === 'ROLE_SECTOR') return 'Сектор раҳбари';
        else if (role === 'ROLE_ADMIN') return 'Super admin';
    }

    const getItems = (user: any): MenuProps['items'] => [
        {
            label: <div className={`flex items-center gap-3`}>
                <FaEdit className="text-base text-yellow-300 cursor-pointer duration-300"/>
                <p>Таҳрирлаш</p>
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
                <p>Ўчириш</p>
            </div>,
            key: '1',
            onClick: () => {
                openModal()
                setEditOrDeleteStatus('DELETE')
                setCrudValue(user)
            }
        },
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditOrDeleteStatus('');
            setCrudValue(crudValueDef);
        }, 500)
    };

    const handleInputChange = (name: string, value: string) => setCrudValue({...crudValue, [name]: value})

    const isRegexVal = () => {
        if (crudValue.role === 'ROLE_VHOKIM' || crudValue.role === 'ROLE_THOKIM' || crudValue.role === 'ROLE_SECTOR') {
            if (crudValue.firstName && crudValue.lastName && crudValue.phoneNumber && crudValue.password && crudValue.lavozimi && crudValue.role) return true
        } else {
            if (crudValue.firstName && crudValue.lastName && crudValue.phoneNumber && crudValue.password && crudValue.lavozimi && crudValue.role && crudValue.districtId && crudValue.sectorId) return true
        }
    }

    return (
        <>
            <Breadcrumb pageName={`Фойдаланувчилар`}/>

            {/*===================SEARCH===================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-3 mt-10`}>
                <Select
                    placeholder={`Роллари бўйича қидириш`}
                    className={`w-full sm:w-1/2 md:w-[35%] bg-transparent h-11 custom-select`}
                    onChange={(e) => setUserRoles(e)}
                    allowClear
                >
                    <Select.Option value={'ROLE_MASTER'}>{userRole('ROLE_MASTER')}</Select.Option>
                    <Select.Option value={'ROLE_THOKIM'}>{userRole('ROLE_THOKIM')}</Select.Option>
                    <Select.Option value={'ROLE_VHOKIM'}>{userRole('ROLE_VHOKIM')}</Select.Option>
                    <Select.Option value={'ROLE_SECTOR'}>{userRole('ROLE_SECTOR')}</Select.Option>
                </Select>
                <ShinyButton
                    text={`Қўшиш`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('ADD')
                    }}
                    className={`bg-darkGreen py-3`}
                />
            </div>

            {/*========================BODY===================*/}
            <div className={`mt-6`}>
                {users.loading ? <div className={`grid grid-cols-1 gap-5`}>
                        <Skeleton/>
                        <Skeleton/>
                    </div> :
                    <Tables thead={userTableHead}>
                        {(users.response && users.response.body?.object.length > 0) ? users.response.body.object.map((sts: any, idx: number) => (
                            <tr key={sts.id} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.firstName ? sts.firstName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.lastName ? sts.lastName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.phoneNumber ? sts.phoneNumber : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.lavozimi ? sts.lavozimi : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className={`${sts.active ? 'bg-green-300' : 'bg-red-300'} text-black rounded-xl border-none px-3 py-1 font-semibold text-center`}>
                                        {sts.active ? 'Aktiv' : 'Aktiv emas'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.district ? sts.district : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.sectorName ? sts.sectorName : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.sectorNumber ? sts.sectorNumber : '-'}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 ps-10">
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
                            <td className="border-b border-[#eee] p-5" colSpan={userTableHead.length}>
                                <p className="text-black text-center">
                                    Фойдаланувчилар топилмади
                                </p>
                            </td>
                        </tr>}
                    </Tables>
                }
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={users.response ? users.response.body?.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            {/*==========UNIVERSAL MODAL============*/}
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <form className={`mt-5`} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                        {editOrDeleteStatus !== 'DELETE' ? (<>
                            {(editOrDeleteStatus === 'ADD' || editOrDeleteStatus === 'EDIT') && (<div className={'grid grid-cols-1 lg:grid-cols-2 gap-4'}>
                                <div className="mb-4">
                                    <label>Исм</label>
                                    <input
                                        required
                                        value={crudValue?.firstName}
                                        onChange={e => handleInputChange('firstName', e.target.value)}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Исм...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label>Фамилия</label>
                                    <input
                                        required
                                        value={crudValue?.lastName}
                                        onChange={e => handleInputChange('lastName', e.target.value)}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Фамилия...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label>Лавозимини киритинг</label>
                                    <input
                                        required
                                        value={crudValue?.lavozimi}
                                        onChange={e => handleInputChange('lavozimi', e.target.value)}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Лавозимини киритинг...`}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label>Фойдаланувчи телефон рақамини киритинг (998 99 999 99 99)</label>
                                    <input
                                        required
                                        value={crudValue?.phoneNumber}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            if (v?.length >= 0 && v?.length <= 12 && !isNaN(+v)) handleInputChange('phoneNumber', v);
                                        }}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === 'e' || e.key === 'E' ||
                                                e.key === '-' || e.key === '+' ||
                                                e.key === '.'
                                            ) e.preventDefault();
                                        }}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Фойдаланувчи телефон рақамини киритиш...`}
                                    />
                                </div>
                                <div>
                                    <label>Фойдаланувчи ролини танланг</label>
                                    <select
                                        value={crudValue.role}
                                        onChange={(e) => handleInputChange(`role`, e.target.value)}
                                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mb-4"
                                    >
                                        <option disabled selected value={``}>
                                            Фойдаланувчи ролини танланг
                                        </option>
                                        <option value={'ROLE_MASTER'}>{userRole('ROLE_MASTER')}</option>
                                        <option value={'ROLE_THOKIM'}>{userRole('ROLE_THOKIM')}</option>
                                        <option value={'ROLE_VHOKIM'}>{userRole('ROLE_VHOKIM')}</option>
                                        <option value={'ROLE_SECTOR'}>{userRole('ROLE_SECTOR')}</option>
                                    </select>
                                </div>
                                {!(crudValue.role === 'ROLE_VHOKIM' || crudValue.role === 'ROLE_THOKIM') && <>
                                    <div className="mb-4">
                                        <label>Туман</label>
                                        <select
                                            value={crudValue.districtId}
                                            onChange={(e) => handleInputChange(`districtId`, e.target.value)}
                                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mb-4"
                                        >
                                            <option disabled selected value={0}>
                                                Туманни танланг
                                            </option>
                                            {districtLists.response?.body && districtLists.response?.body.map((item: {id: number, name: string}) => (
                                                <option value={item.id} key={item.id}>{item.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-4">
                                        <label>Сектор</label>
                                        <select
                                            value={crudValue.sectorId}
                                            onChange={(e) => handleInputChange(`sectorId`, e.target.value)}
                                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mb-6"
                                        >
                                            <option disabled selected value={0}>
                                                Секторни танланг
                                            </option>
                                            {getSectorList.response && getSectorList.response.body?.map((item: any) => (
                                                <option value={item.id}>{item.districtName} {item.number}</option>
                                            ))}
                                        </select>
                                    </div>
                                </>}
                                <div className="mb-4">
                                    <label>Парол</label>
                                    <input
                                        required
                                        value={crudValue?.password}
                                        onChange={e => handleInputChange('password', e.target.value)}
                                        className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                        placeholder={`Парол...`}
                                    />
                                </div>
                            </div>)}
                        </>) : <>
                            <p className={`text-center text-black text-base lg:text-xl mb-10`}>
                                Ҳақиқатдан ҳам бу фойдаланувчини ўчириб ташламоқчимисиз?
                            </p>
                        </>}

                        <div className={`flex justify-end items-center gap-5`}>
                            <ShinyButton
                                text={`Орқага`}
                                className={`bg-darkGreen`}
                                onClick={closeModal}
                            />
                            {editOrDeleteStatus === 'ADD' && (
                                <ShinyButton
                                    text={userAdd.loading ? 'Сақланмоқда...' : 'Сақлаш'}
                                    className={`bg-darkGreen ${userAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userAdd.loading) {
                                            if (isRegexVal()) userAdd.globalDataFunc()
                                            else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                        }
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'EDIT' && (
                                <ShinyButton
                                    text={userEdit.loading ? 'Юкланмоқда...' : 'Таҳрирлаш'}
                                    className={`bg-darkGreen ${userEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userEdit.loading) {
                                            if (isRegexVal()) userEdit.globalDataFunc()
                                            else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                        }
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'DELETE' && (
                                <ShinyButton
                                    text={userDelete.loading ? 'Ўчирилмоқда...' : 'Ҳа'}
                                    className={`bg-darkGreen ${userDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userDelete.loading) userDelete.globalDataFunc()
                                    }}
                                />
                            )}
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}

export default Users;
