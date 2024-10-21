import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import Tables from "@/components/custom/tables/table.tsx";
import {machineThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {Pagination, Popover} from "antd";
import {GroupCreate, IUser} from "@/types/machine.ts";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {
    districtList,
    machineCreate,
    machineDeletes,
    machineEdits,
    machineEditUsers,
    machineList, searchUser
} from "@/helpers/api.tsx";
import {FaEdit, FaUserEdit, FaUserLock} from "react-icons/fa";
import {RiDeleteBin7Fill} from "react-icons/ri";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import machineStore from "@/helpers/state-management/machineStore.tsx";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const Machine = () => {
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const {crudMachine, setCrudMachine, defVal} = machineStore()
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState<string>('')
    const [isModal, setIsModal] = useState(false);
    const requestData = {
        districtId: crudMachine.districtId,
        farmName: crudMachine.farmName,
        ownerFullName: crudMachine.ownerFullName,
        ownerPhoneNumber: crudMachine.ownerPhoneNumber,
        machineId: crudMachine.machineId,
        machineModel: crudMachine.machineModel,
        year: crudMachine.year,
        firstName: crudMachine.firstName,
        lastName: crudMachine.lastName,
        phoneNumber: crudMachine.phoneNumber,
        password: crudMachine.password,
        lavozimi: crudMachine.lavozimi
    }

    // ===============REQUEST FUNCTION==================
    const {response, loading, globalDataFunc} = useGlobalRequest(`${machineList}?page=${page}&size=10`, 'GET')
    const districtLists = useGlobalRequest(districtList, 'GET')
    const machineAdd = useGlobalRequest(machineCreate, 'POST', requestData)
    const machineEdit = useGlobalRequest(`${machineEdits}${crudMachine.id}`, 'PUT', requestData)
    const machineEditUser = useGlobalRequest(`${machineEditUsers}${crudMachine.id}?userId=${crudMachine.userIdIs}`, 'PUT')
    const machineDeleteUser = useGlobalRequest(`${machineEditUsers}${crudMachine.id}?userId=null`, 'PUT')
    const machineEditUserSearch = useGlobalRequest(`${searchUser}${search}`, 'GET')
    const machineDelete = useGlobalRequest(`${machineDeletes}${crudMachine.id}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [page]);

    useEffect(() => {
        if (machineAdd.response?.success) {
            globalDataFunc()
            toast.success('Машина маълумоти муваффақиятли қўшилди')
            closeModal()
        } else if (machineAdd.error?.response?.data?.message) toast.error(machineAdd.error.response.data.message)
        consoleClear()
    }, [machineAdd.response, machineAdd.error]);

    useEffect(() => {
        if (machineEdit.response && machineEdit.response.success) {
            globalDataFunc()
            toast.success('Машина маълумоти муваффақиятли таҳрирланди')
            closeModal()
        } else if (machineEdit.error?.response?.data?.message) toast.error(machineEdit.error.response.data.message)
        consoleClear()
    }, [machineEdit.response, machineEdit.error]);

    useEffect(() => {
        if (machineDelete.response && machineDelete.response.success) {
            globalDataFunc()
            toast.success('Машина маълумоти муваффақиятли ўчирилди')
            closeModal()
        } else if (machineDelete.error?.response?.data?.message) toast.error(machineDelete.error.response.data.message)
        consoleClear()
    }, [machineDelete.response, machineDelete.error]);

    useEffect(() => {
        if (machineEditUser.response && machineEditUser.response.success) {
            globalDataFunc()
            toast.success('Машина фойдаланувчисини муваффақиятли ўзгартирдингиз')
            closeModal()
        } else if (machineEditUser.error?.response?.data?.message) toast.error(machineEditUser.error.response.data.message)
        consoleClear()
    }, [machineEditUser.response, machineEditUser.error]);

    useEffect(() => {
        if (search) machineEditUserSearch.globalDataFunc()
        consoleClear()
    }, [search]);

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudMachine(defVal)
            setEditOrDeleteStatus('')
            setSearch('')
            machineAdd.response = undefined
            machineEdit.response = undefined
            machineDelete.response = undefined
        }, 500)
    };

    const handleChange = (name: string, value: string | any) => setCrudMachine({...crudMachine, [name]: value});
    const handleSelect = (res: IUser) => {
        setSearch(`${res.firstName} ${res.lastName}`)
        setCrudMachine({...crudMachine, "userIdIs": res.id});
    }

    const changeRegex = () => {
        return (
            crudMachine.districtId &&
            crudMachine.farmName &&
            crudMachine.ownerFullName &&
            crudMachine.ownerPhoneNumber &&
            crudMachine.machineId &&
            crudMachine.machineModel &&
            crudMachine.year &&
            crudMachine.firstName &&
            crudMachine.lastName &&
            crudMachine.phoneNumber &&
            crudMachine.password &&
            crudMachine.lavozimi
        )
    }

    const checkModal = (type: string) => {
        switch (type) {
            case 'POST':
            case 'EDIT':
                return (
                    <div className={`mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5`}>
                        <div>
                            <label>Туманни танланг</label>
                            <select
                                value={crudMachine.districtId}
                                onChange={(e) => handleChange(`districtId`, +e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5"
                            >
                                <option disabled selected value={0}>
                                    Туманни танланг
                                </option>
                                {districtLists.response && districtLists.response.body?.map((item: {
                                    id: number
                                    name: string
                                }) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Исмни киритинг</label>
                            <input
                                value={crudMachine.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                placeholder="Исмни киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>Фамилияни киритинг</label>
                            <input
                                value={crudMachine.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                placeholder="Фамилияни киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>Телефон рақамни киритинг (998 99 999 99 99)</label>
                            <input
                                required
                                value={crudMachine.phoneNumber}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (v?.length >= 0 && v?.length <= 12 && !isNaN(+v)) handleChange('phoneNumber', v);
                                }}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === 'e' || e.key === 'E' ||
                                        e.key === '-' || e.key === '+' ||
                                        e.key === '.'
                                    ) e.preventDefault();
                                }}
                                className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                placeholder={`Телефон рақамни киритинг...`}
                            />
                        </div>
                        <div>
                            <label>Йилини киритинг</label>
                            <input
                                value={crudMachine.year}
                                type={'number'}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (+v >= 0 && +v <= 9999) handleChange('year', v)
                                }}
                                onKeyDown={e => {
                                    if (e.key === "-" || e.key === "e" || e.key === 'E' || e.key === '+') e.preventDefault();
                                }}
                                placeholder="Йилини киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>Лавозимни киритинг</label>
                            <input
                                value={crudMachine.lavozimi}
                                onChange={(e) => handleChange('lavozimi', e.target.value)}
                                placeholder="Лавозимни киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>Фермер хўжалиги номини киритинг</label>
                            <input
                                value={crudMachine.farmName}
                                onChange={(e) => handleChange('farmName', e.target.value)}
                                placeholder="Фермер хўжалиги номини киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>Оператор тўлиқ исмини киритинг</label>
                            <input
                                value={crudMachine.ownerFullName}
                                onChange={(e) => handleChange('ownerFullName', e.target.value)}
                                placeholder="Оператор тўлиқ исмини киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>Оператор рақамини киритинг (998 99 999 99 99)</label>
                            <input
                                required
                                value={crudMachine.ownerPhoneNumber}
                                onChange={(e) => {
                                    const v = e.target.value;
                                    if (v?.length >= 0 && v?.length <= 12 && !isNaN(+v)) handleChange('ownerPhoneNumber', v);
                                }}
                                onKeyDown={(e) => {
                                    if (
                                        e.key === 'e' || e.key === 'E' ||
                                        e.key === '-' || e.key === '+' ||
                                        e.key === '.'
                                    ) e.preventDefault();
                                }}
                                className={`bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5`}
                                placeholder={`Оператор рақамини киритинг...`}
                            />
                        </div>
                        <div>
                            <label>Машина ид сини киритинг</label>
                            <input
                                value={crudMachine.machineId}
                                onChange={(e) => handleChange('machineId', e.target.value)}
                                placeholder="Машина ид сини киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                        <div>
                            <label>Машина моделини киритинг</label>
                            <select
                                value={crudMachine.machineModel}
                                onChange={(e) => handleChange(`machineModel`, e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5"
                            >
                                <option disabled selected value={''}>
                                    Машина моделини киритинг
                                </option>
                                <option value={'CE_220'}>CE_220</option>
                                <option value={'JOHN_DEERE'}>JOHN_DEERE</option>
                                <option value={'BOSHIRAN'}>BOSHIRAN</option>
                                <option value={'FM_WORLD'}>FM_WORLD</option>
                                <option value={'DONG_FENG'}>DONG_FENG</option>
                            </select>
                        </div>
                        <div>
                            <label>Паролни киритинг</label>
                            <input
                                value={crudMachine.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="Паролни киритинг"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                        </div>
                    </div>
                )
            case 'DELETE':
                return (
                    <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                        Ҳақиқатдан хам бу машинани ўчириб ташламоқчимисиз?
                    </p>
                )
            case 'EDIT_USER':
                return (<>
                    <label>Бириктирмоқчи бўлган фойдаланувчингизни киритинг</label>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Фойдаланувчини қидиринг..."
                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                    />
                    {(machineEditUserSearch.response?.body?.length > 0 && search) && (
                        <ul className="bg-white border-2 border-darkGreen w-full rounded-lg mt-3 max-h-[200px] overflow-y-auto shadow-lg">
                            {machineEditUserSearch.response.body.map((result: IUser) => (
                                <li
                                    key={result.id}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSelect(result)}
                                >
                                    <div>{result.firstName} {result.lastName}</div>
                                    <div className="text-sm text-gray-500">{result.phoneNumber}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </>)
            case 'DELETE_USER':
                return (
                    <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                        Ҳақиқатдан хам бириктирилган одамни олиб ташламоқчимисиз?
                    </p>
                )
            default:
                return null
        }
    }

    return (
        <>
            <Breadcrumb pageName={`Машиналар`}/>

            {/*===================ADD OR SEARCH==================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Машина қўшиш`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
            </div>

            {/*========================BODY===================*/}
            <div className={`mt-6`}>
                {loading ? <div className={`grid grid-cols-1 gap-3`}>
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
                    </div> :
                    <Tables thead={machineThead}>
                        {response?.success ? response.body?.object?.length > 0 ?
                            response.body?.object?.map((sts: GroupCreate, idx: number) => (
                                <tr key={sts.id} className={`hover:bg-whiteGreen duration-100`}>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {(page * 10) + idx + 1}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.districtName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.farmName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.ownerFullName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.ownerPhoneNumber}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.machineId}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.machineModel}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.year}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.firstName} {sts.lastName}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.lavozimi}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black">
                                            {sts.phoneNumber}
                                        </p>
                                    </td>
                                    <td className="border-b border-[#eee] p-5">
                                        <p className="text-black flex items-center justify-start gap-5 text-xl">
                                            <Popover
                                                title={`Машинага янги фойдаланувчи бириктириш`}
                                                overlayStyle={{textAlign: 'center'}}
                                            >
                                                <FaUserEdit
                                                    className={`hover:text-yellow-500 duration-300 cursor-pointer`}
                                                    onClick={() => {
                                                        openModal()
                                                        setCrudMachine(sts)
                                                        setEditOrDeleteStatus('EDIT_USER')
                                                    }}
                                                />
                                            </Popover>
                                            <Popover
                                                title={`Бириктирилган фойдаланувчини олиб ташлаш`}
                                                overlayStyle={{textAlign: 'center'}}
                                            >
                                                <FaUserLock
                                                    className={`hover:text-yellow-500 duration-300 cursor-pointer`}
                                                    onClick={() => {
                                                        openModal()
                                                        setCrudMachine(sts)
                                                        setEditOrDeleteStatus('DELETE_USER')
                                                    }}
                                                />
                                            </Popover>
                                            <Popover
                                                title={`Машина маълумотларини таҳрирлаш`}
                                                overlayStyle={{textAlign: 'center'}}
                                            >
                                                <FaEdit
                                                    className={`hover:text-yellow-500 duration-300 cursor-pointer`}
                                                    onClick={() => {
                                                        openModal()
                                                        setCrudMachine(sts)
                                                        setEditOrDeleteStatus('EDIT')
                                                    }}
                                                />
                                            </Popover>
                                            <Popover
                                                title={`Машинани ўчириб ташлаш`}
                                                overlayStyle={{textAlign: 'center'}}
                                            >
                                                <RiDeleteBin7Fill
                                                    className={`hover:text-red-500 duration-300 cursor-pointer`}
                                                    onClick={() => {
                                                        openModal()
                                                        setCrudMachine(sts)
                                                        setEditOrDeleteStatus('DELETE')
                                                    }}
                                                />
                                            </Popover>
                                        </p>
                                    </td>
                                </tr>
                            )) : (
                                <tr className={`hover:bg-whiteGreen duration-100`}>
                                    <td className="border-b border-[#eee] p-5" colSpan={machineThead.length}>
                                        <p className="text-black text-center">
                                            Машиналар топилмади
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5" colSpan={machineThead.length}>
                                    <p className="text-black text-center">
                                        Машиналар топилмади
                                    </p>
                                </td>
                            </tr>
                        )}
                    </Tables>
                }
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={response ? response.body?.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'POST' && checkModal('POST')}
                    {editOrDeleteStatus === 'EDIT' && checkModal('EDIT')}
                    {editOrDeleteStatus === 'DELETE' && checkModal('DELETE')}
                    {editOrDeleteStatus === 'EDIT_USER' && checkModal('EDIT_USER')}
                    {editOrDeleteStatus === 'DELETE_USER' && checkModal('DELETE_USER')}

                    <div className={`flex justify-end items-center gap-5 mt-5`}>
                        <ShinyButton
                            text={`Орқага`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        {editOrDeleteStatus === 'POST' && (
                            <ShinyButton
                                text={machineAdd.loading ? 'Сақланмоқда...' : 'Сақлаш'}
                                className={`bg-darkGreen ${machineAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineAdd.loading) {
                                        if (changeRegex()) machineAdd.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={machineEdit.loading ? 'Юкланмоқда...' : 'Таҳрирлаш'}
                                className={`bg-darkGreen ${machineEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineEdit.loading) {
                                        if (changeRegex()) machineEdit.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={machineDelete.loading ? 'Ўчирилмоқда...' : 'Ҳа'}
                                className={`bg-darkGreen ${machineDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineDelete.loading) machineDelete.globalDataFunc()
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT_USER' && (
                            <ShinyButton
                                text={machineEditUser.loading ? 'Сақланмоқда...' : 'Бириктириш'}
                                className={`bg-darkGreen ${machineEditUser.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineEditUser.loading) machineEditUser.globalDataFunc()
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE_USER' && (
                            <ShinyButton
                                text={machineDeleteUser.loading ? 'Сақланмоқда...' : 'Олиб ташлаш'}
                                className={`bg-darkGreen ${machineDeleteUser.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineDeleteUser.loading) machineDeleteUser.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Machine;
