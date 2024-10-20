import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Pagination} from "antd";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {farmThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {districtList, farmCotton, farmCreate, farmEditOrDelete, farmList} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const defVal = {
    farmName: '',
    inn: 0,
    cottonPickedId: 0,
    districtId: 0
}

const Farms = () => {
    const [page, setPage] = useState<number>(0);
    const [isModal, setIsModal] = useState(false);
    const [crudFarm, setCrudFarm] = useState<any>(defVal);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const requestData = {
        farmName: crudFarm.farmName,
        inn: crudFarm.inn,
        cottonPickedId: crudFarm.cottonPickedId
    }

    const {loading, response, globalDataFunc} = useGlobalRequest(`${farmList}?page=${page}&size=10`, 'GET')
    const districtLists = useGlobalRequest(districtList, 'GET')
    const cottonList = useGlobalRequest(`${farmCotton}${crudFarm.districtId}`, 'GET')
    const farmAdd = useGlobalRequest(farmCreate, 'POST', requestData)
    const farmEdit = useGlobalRequest(`${farmEditOrDelete}${crudFarm.farmId}`, 'PUT', requestData)
    const farmDelete = useGlobalRequest(`${farmEditOrDelete}${crudFarm.farmId}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [page]);

    useEffect(() => {
        crudFarm.cottonPickedId = 0
        if (crudFarm?.districtId > 0) cottonList.globalDataFunc()
    }, [crudFarm.districtId]);

    useEffect(() => {
        if (farmAdd.response && farmAdd.response.success) {
            globalDataFunc()
            toast.success('Фермер хўжалиги муваффақиятли қўшилди')
            closeModal()
        } else if (farmAdd.error?.response?.data?.message) toast.error(farmAdd.error.response.data.message)
        consoleClear()
    }, [farmAdd.response, farmAdd.error]);

    useEffect(() => {
        if (farmEdit.response && farmEdit.response.success) {
            globalDataFunc()
            toast.success('Фермер хўжалиги муваффақиятли таҳрирланди')
            closeModal()
        } else if (farmEdit.error?.response?.data?.message) toast.error(farmEdit.error.response.data.message)
        consoleClear()
    }, [farmEdit.response, farmEdit.error]);

    useEffect(() => {
        if (farmDelete.response && farmDelete.response.success) {
            globalDataFunc()
            toast.success('Фермер хўжалиги муваффақиятли ўчирилди')
            closeModal()
        } else if (farmDelete.error?.response?.data?.message) toast.error(farmDelete.error.response.data.message)
        consoleClear()
    }, [farmDelete.response, farmDelete.error]);

    const handleChange = (name: string, value: string) => setCrudFarm({...crudFarm, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudFarm(defVal);
            setEditOrDeleteStatus('');
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Фермер хўжаликлари`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Фермер хўжалиги қўшиш`}
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
                    <Skeleton/>
                </div> : (
                    <Tables thead={farmThead}>
                        {(response && response.body?.object?.length > 0) ? response.body.object.map((farm: {
                            farmId: number
                            farmName: string
                            inn: number
                            areaName: string
                            sectorNumber: number
                            cottonPickedId: number
                        }, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {farm.farmName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {farm.inn}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {farm.areaName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {farm.sectorNumber}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 flex items-center justify-start gap-3">
                                    <FaEdit
                                        className={`text-xl hover:cursor-pointer text-yellow-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('EDIT')
                                            setCrudFarm(farm)
                                        }}
                                    />
                                    <AiFillDelete
                                        className={`text-xl hover:cursor-pointer text-red-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('DELETE')
                                            setCrudFarm(farm)
                                        }}
                                    />
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={farmThead.length}
                            >
                                Маълумот топилмади
                            </td>
                        </tr>}
                    </Tables>
                )}
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
                            Ҳақиқатдан хам бу фермер хўжалигини ўчириб ташламоқчимисиз?
                        </p>
                    ) : <div className={`mt-7`}>
                        <label>Фермер хўжалиги номини киритинг</label>
                        <input
                            value={crudFarm.farmName}
                            onChange={(e) => handleChange('farmName', e.target.value)}
                            placeholder="Фермер хўжалиги номини киритинг"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-7"
                        />
                        <label>Фермер хўжалиги инн рақамини киритинг</label>
                        <input
                            value={crudFarm.inn}
                            type={'number'}
                            onChange={(e) => handleChange('inn', e.target.value)}
                            placeholder="Фермер хўжалиги инн рақамини киритинг"
                            onKeyDown={e => {
                                if (e.key === '+' || e.key === 'e' || e.key === 'E' || e.key === '-') e.preventDefault()
                            }}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-7"
                        />
                        <label>Туманни танланг</label>
                        <select
                            value={crudFarm.districtId}
                            onChange={(e) => handleChange(`districtId`, e.target.value)}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mb-7"
                        >
                            <option disabled selected value={0}>Туманни танланг</option>
                            {districtLists.response && districtLists.response.body?.map((item: {
                                id: number
                                name: string
                            }) => (
                                <option value={item.id} key={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <label>Пахта терадиган жойни танланг</label>
                        <select
                            value={crudFarm.cottonPickedId}
                            onChange={(e) => handleChange(`cottonPickedId`, e.target.value)}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mb-7"
                        >
                            <option disabled selected value={0}>Пахта терадиган жойни танланг</option>
                            {cottonList.response && cottonList.response.body?.map((item: {
                                cottonPickedId: number
                                areaName: string
                                sectorNumber: number
                                districtId: number
                                districtName: string
                            }) => (
                                <option value={item.cottonPickedId} key={item.cottonPickedId}>{item.areaName}</option>
                            ))}
                        </select>
                    </div>
                    }
                    <div className={`flex justify-end items-center gap-5 mt-5`}>
                        <ShinyButton
                            text={`Орқага`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        {editOrDeleteStatus === 'POST' && (
                            <ShinyButton
                                text={farmAdd.loading ? 'Сақланмоқда...' : 'Сақлаш'}
                                className={`bg-darkGreen ${farmAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!farmAdd.loading) {
                                        if (crudFarm.farmName && crudFarm.inn && crudFarm.cottonPickedId) farmAdd.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={farmEdit.loading ? 'Юкланмоқда...' : 'Таҳрирлаш'}
                                className={`bg-darkGreen ${farmEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!farmEdit.loading) {
                                        if (crudFarm.farmName && crudFarm.inn && crudFarm.cottonPickedId) farmEdit.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={farmDelete.loading ? 'Ўчирилмоқда...' : 'Ҳа'}
                                className={`bg-darkGreen ${farmDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!farmDelete.loading) farmDelete.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Farms;
