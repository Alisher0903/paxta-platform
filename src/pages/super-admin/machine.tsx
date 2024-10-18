import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import Tables from "@/components/custom/tables/table.tsx";
import {machineThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {Pagination} from "antd";
import {GroupCreate} from "@/types/machine.ts";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {
    districtList,
    machineCreate,
    machineDeletes,
    machineEdits,
    machineEditUsers,
    machineList
} from "@/helpers/api.tsx";
import {FaEdit} from "react-icons/fa";
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
    const machineEditUser = useGlobalRequest(`${machineEditUsers}`, 'PUT')
    const machineDelete = useGlobalRequest(`${machineDeletes}${crudMachine.id}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [page]);

    useEffect(() => {
        if (machineAdd.response && machineAdd.response.success) {
            globalDataFunc()
            toast.success('Mashina malumoti muvaffaqiyatli qushildi')
            closeModal()
        }
        consoleClear()
    }, [machineAdd.response]);

    useEffect(() => {
        if (machineEdit.response && machineEdit.response.success) {
            globalDataFunc()
            toast.success('Mashina malumoti muvaffaqiyatli taxrirlandi')
            closeModal()
        }
        consoleClear()
    }, [machineEdit.response]);

    useEffect(() => {
        if (machineDelete.response && machineDelete.response.success) {
            globalDataFunc()
            toast.success('Mashina malumoti muvaffaqiyatli o\'chirildi')
            closeModal()
        }
        consoleClear()
    }, [machineDelete.response]);

    useEffect(() => {
        if (machineEditUser.response && machineEditUser.response.success) {
            globalDataFunc()
            toast.success('Mashina foydalanuvchisini muvaffaqiyatli uzgartirdingiz')
            closeModal()
        }
        consoleClear()
    }, [machineEditUser.response]);

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudMachine(defVal)
            setEditOrDeleteStatus('')
            machineAdd.response = undefined
            machineEdit.response = undefined
            machineDelete.response = undefined
        }, 500)
    };

    const handleChange = (name: string, value: string | any) => setCrudMachine({...crudMachine, [name]: value});

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

    return (
        <>
            <Breadcrumb pageName={`Mashinalar`}/>

            {/*===================ADD OR SEARCH==================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Mashina qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
                {/*<div*/}
                {/*    className={`w-full lg:max-w-[30%] flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}>*/}
                {/*    <Input*/}
                {/*        className={`w-full bg-transparent h-11 custom-input`}*/}
                {/*        placeholder="Guruh nomi buyicha qidirish"*/}
                {/*        // onChange={(e) => setName(e.target.value)}*/}
                {/*        allowClear*/}
                {/*        disabled*/}
                {/*    />*/}
                {/*</div>*/}
            </div>

            {/*========================BODY===================*/}
            <div className={`mt-6`}>
                {loading ? <div className={`grid grid-cols-1 gap-3`}>
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
                                            <FaEdit
                                                className={`hover:text-yellow-500 duration-300 cursor-pointer`}
                                                onClick={() => {
                                                    openModal()
                                                    setCrudMachine(sts)
                                                    setEditOrDeleteStatus('EDIT')
                                                }}
                                            />
                                            <RiDeleteBin7Fill
                                                className={`hover:text-red-500 duration-300 cursor-pointer`}
                                                onClick={() => {
                                                    openModal()
                                                    setCrudMachine(sts)
                                                    setEditOrDeleteStatus('DELETE')
                                                }}
                                            />
                                        </p>
                                    </td>
                                </tr>
                            )) : (
                                <tr className={`hover:bg-whiteGreen duration-100`}>
                                    <td className="border-b border-[#eee] p-5" colSpan={machineThead.length}>
                                    <p className="text-black text-center">
                                            Mashinalar topilmadi
                                        </p>
                                    </td>
                                </tr>
                            ) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5" colSpan={machineThead.length}>
                                    <p className="text-black text-center">
                                        Mashinalar topilmadi
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
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu mashinani o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (
                        <div className={`mt-7 grid grid-cols-1 lg:grid-cols-2 gap-5`}>
                            <select
                                value={crudMachine.districtId}
                                onChange={(e) => handleChange(`districtId`, +e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5"
                            >
                                <option disabled selected value={0}>
                                    Tumanni tanlang
                                </option>
                                {districtLists.response && districtLists.response.body?.map((item: {
                                    id: number
                                    name: string
                                }) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <input
                                value={crudMachine.firstName}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                placeholder="Ismni kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.lastName}
                                onChange={(e) => handleChange('lastName', e.target.value)}
                                placeholder="Familiyani kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.phoneNumber}
                                onChange={(e) => handleChange('phoneNumber', e.target.value)}
                                placeholder="Loginni kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
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
                                placeholder="Yilini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.lavozimi}
                                onChange={(e) => handleChange('lavozimi', e.target.value)}
                                placeholder="Lavozimni kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.farmName}
                                onChange={(e) => handleChange('farmName', e.target.value)}
                                placeholder="Farm nomini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.ownerFullName}
                                onChange={(e) => handleChange('ownerFullName', e.target.value)}
                                placeholder="Owner tuliq ismini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.ownerPhoneNumber}
                                onChange={(e) => handleChange('ownerPhoneNumber', e.target.value)}
                                placeholder="Owner raqamini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.machineId}
                                onChange={(e) => handleChange('machineId', e.target.value)}
                                placeholder="Mashina idsini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.machineModel}
                                onChange={(e) => handleChange('machineModel', e.target.value)}
                                placeholder="Mashina modelini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <input
                                value={crudMachine.password}
                                onChange={(e) => handleChange('password', e.target.value)}
                                placeholder="Parolni kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
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
                                text={machineAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${machineAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineAdd.loading) {
                                        if (changeRegex()) machineAdd.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={machineEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                className={`bg-darkGreen ${machineEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineEdit.loading) {
                                        if (changeRegex()) machineEdit.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={machineDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                className={`bg-darkGreen ${machineDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!machineDelete.loading) machineDelete.globalDataFunc()
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
