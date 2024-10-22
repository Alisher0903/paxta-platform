import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {MdDelete} from "react-icons/md";
import Tables from "@/components/custom/tables/table.tsx";
import {confirmUserTHead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import React, {useEffect, useState} from "react";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {districtList, resUserDelete, resUserEdit, resUserGetAll, resUserPost} from "@/helpers/api.tsx";
import {Dropdown, Menu, MenuProps, Pagination, Space} from "antd";
import {CiMenuKebab} from "react-icons/ci";
import Modal from "@/components/custom/modal/modal.tsx";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import toast from "react-hot-toast";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {FaEdit} from "react-icons/fa";

const crudValueDef = {
    fullName: '',
    phoneNumber: '',
    districtId: 0,
    machineStatus: ''
}

const ResponsibleUsers = () => {
    const [page, setPage] = useState<number>(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [crudValue, setCrudValue] = useState<any>(crudValueDef);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const requestData = {
        fullName: crudValue.fullName,
        phoneNumber: crudValue.phoneNumber,
        districtId: crudValue.districtId,
        machineStatus: crudValue.machineStatus
    }

    // ===========================REQUEST FUNCTION================================
    const users = useGlobalRequest(`${resUserGetAll}?page=${page}&size=10`, 'GET');
    const districtLists = useGlobalRequest(districtList, 'GET');
    const userAdd = useGlobalRequest(resUserPost, 'POST', requestData);
    const userEdit = useGlobalRequest(`${resUserEdit}${crudValue.id}`, 'PUT', requestData);
    const userDelete = useGlobalRequest(`${resUserDelete}${crudValue.id}`, 'DELETE');

    useEffect(() => {
        users.globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        users.globalDataFunc()
    }, [page]);

    useEffect(() => {
        if (userAdd.response?.success) {
            users.globalDataFunc()
            closeModal()
            toast.success('Фойдаланувчи муваффақиятли қўшилди')
        } else if (userAdd.error?.response?.data?.message) toast.error(userAdd.error.response.data.message)
        consoleClear()
    }, [userAdd.response, userAdd.error]);

    useEffect(() => {
        if (userEdit.response?.success) {
            users.globalDataFunc()
            closeModal()
            toast.success('Фойдаланувчи муваффақиятли таҳрирланди')
        } else if (userEdit.error?.response?.data?.message) toast.error(userEdit.error.response.data.message)
        consoleClear()
    }, [userEdit.response, userEdit.error]);

    useEffect(() => {
        if (userDelete.response?.success) {
            users.globalDataFunc()
            closeModal()
            toast.success('Фойдаланувчи муваффақиятли ўчирилди')
        } else if (userDelete.error?.response?.data?.message) toast.error(userDelete.error.response.data.message);
        consoleClear()
    }, [userDelete.response, userDelete.error]);

    const getItems = (user: any): MenuProps['items'] => [
        {
            label: <div className={`flex items-center gap-3`}>
                <FaEdit className="text-xl text-blue-300 cursor-pointer duration-300"/>
                <p>Таҳрирлаш</p>
            </div>,
            key: '1',
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
            key: '0',
            onClick: () => {
                openModal()
                setEditOrDeleteStatus('DELETE')
                setCrudValue(user)
            }
        }
    ];

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditOrDeleteStatus('');
            setCrudValue(crudValueDef);
        }, 500)
    };

    const handleChange = (key: string, value: string) => setCrudValue({...crudValue, [key]: value})

    return (
        <>
            <Breadcrumb pageName={`Масъул ходимлар`}/>
            <ShinyButton
                text={'Масъул ходим қўшиш'}
                className={'bg-darkGreen py-3'}
                onClick={() => {
                    openModal()
                    setEditOrDeleteStatus('POST')
                }}
            />

            {/*========================BODY===================*/}
            <div className={`mt-6`}>
                {users.loading ? <div className={`grid grid-cols-1 gap-5`}>
                        <Skeleton/>
                        <Skeleton/>
                    </div> :
                    <Tables thead={confirmUserTHead}>
                        {(users.response?.success && users.response.body?.object?.length > 0) ? users.response.body.object.map((sts: {
                            id: number
                            fullName: string
                            phoneNumber: string
                            districtId: number
                            districtName: string
                            machineStatus: string
                        }, idx: number) => (
                            <tr key={sts.id} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.fullName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.districtName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.phoneNumber}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.machineStatus}
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
                    total={users.response?.success ? users.response?.body?.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            {/*==========UNIVERSAL MODAL============*/}
            <Modal onClose={closeModal} isOpen={isModalOpen}>
                <div className={`w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    <form className={`mt-5`} onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                        {editOrDeleteStatus !== 'DELETE' ? (<>
                            <label>Туманни киритинг</label>
                            <select
                                value={crudValue.districtId}
                                onChange={(e) => handleChange('districtId', e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mb-4"
                            >
                                <option disabled selected value={0}>
                                    Туманни киритинг
                                </option>
                                {(districtLists.response?.success && districtLists.response.body?.length > 0) && districtLists.response.body.map((item: {
                                    id: number,
                                    name: string
                                }) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <label>Тўлиқ Ф.И.О киритинг</label>
                            <input
                                value={crudValue.fullName}
                                onChange={(e) => handleChange('fullName', e.target.value)}
                                placeholder="Тўлиқ Ф.И.О киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-4"
                            />
                            <label>Телефон рақами киритинг (998 99 999 99 99)</label>
                            <input
                                value={crudValue.phoneNumber}
                                onChange={(e) => {
                                    const v = e.target.value
                                    if (v?.length >= 0 && v.length <= 12 && !isNaN(+v)) handleChange('phoneNumber', v)
                                }}
                                onKeyDown={e => {
                                    if (e.key === 'e' || e.key === 'E' || e.key === '+' || e.key === '-' || e.key === '.') e.preventDefault()
                                }}
                                placeholder="Телефон рақами киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-4"
                            />
                            <label>Машина ҳолатини танланг</label>
                            <select
                                value={crudValue.machineStatus}
                                onChange={(e) => handleChange('machineStatus', e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mb-4"
                            >
                                <option disabled selected value={''}>
                                    Машина ҳолатини танланг
                                </option>
                                <option value={'ROSTLASH_ISHLARI_OLIB_BORILMOQDA'}>
                                    ROSTLASH_ISHLARI_OLIB_BORILMOQDA
                                </option>
                                <option value={'OPERATORI_YUQ'}>OPERATORI_YUQ</option>
                                <option value={'TAMIRDA'}>TAMIRDA</option>
                                <option value={'TASHKILIY_SABAB'}>TASHKILIY_SABAB</option>
                                <option value={'YOQILGI_YETKAZIB_BERILMAGAN'}>
                                    YOQILGI_YETKAZIB_BERILMAGAN
                                </option>
                            </select>
                        </>) : <>
                            <p className={`text-center text-black text-base lg:text-xl mb-10`}>
                                Ҳақиқатдан хам бу фойдаланувчини ўчириб ташламоқчимисиз?
                            </p>
                        </>}

                        <div className={`flex justify-end items-center gap-5 mt-7`}>
                            <ShinyButton
                                text={`Орқага`}
                                className={`bg-darkGreen`}
                                onClick={closeModal}
                            />
                            {editOrDeleteStatus === 'DELETE' && (
                                <ShinyButton
                                    text={userDelete.loading ? 'Ўчирилмоқда...' : 'Ҳа'}
                                    className={`bg-darkGreen ${userDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (!userDelete.loading) userDelete.globalDataFunc()
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'EDIT' && (
                                <ShinyButton
                                    text={userEdit.loading ? 'Юкланмоқда...' : 'Таҳрирлаш'}
                                    className={`bg-darkGreen ${userEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (crudValue.fullName && crudValue.districtId && crudValue.phoneNumber && crudValue.machineStatus) {
                                            if (!userEdit.loading) userEdit.globalDataFunc()
                                        } else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }}
                                />
                            )}
                            {editOrDeleteStatus === 'POST' && (
                                <ShinyButton
                                    text={userAdd.loading ? 'Сақланмоқда...' : 'Сақлаш'}
                                    className={`bg-darkGreen ${userAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                    onClick={() => {
                                        if (crudValue.fullName && crudValue.districtId && crudValue.phoneNumber && crudValue.machineStatus) {
                                            if (!userAdd.loading) userAdd.globalDataFunc()
                                        } else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
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

export default ResponsibleUsers;
