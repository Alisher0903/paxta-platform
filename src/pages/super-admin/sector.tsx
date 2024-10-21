import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Pagination} from "antd";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {sectorThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {districtList, sectorCreate, sectorDelete, sectorEdit, sectorGetAll} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const defVal = {
    number: 0,
    name: '',
    districtId: 0
}

const Sectors = () => {
    const [page, setPage] = useState<number>(0);
    const [isModal, setIsModal] = useState(false);
    const [crudSector, setCrudSector] = useState<any>(defVal);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const requestData = {
        name: crudSector.name,
        number: crudSector.number,
        districtId: crudSector.districtId
    }

    const {loading, response, globalDataFunc} = useGlobalRequest(`${sectorGetAll}?page=${page}&size=10`, 'GET')
    const districtLists = useGlobalRequest(districtList, 'GET')
    const sectorAdd = useGlobalRequest(sectorCreate, 'POST', requestData)
    const sectorEdits = useGlobalRequest(`${sectorEdit}${crudSector.id}`, 'PUT', requestData)
    const sectorDeletes = useGlobalRequest(`${sectorDelete}${crudSector.id}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [page]);

    useEffect(() => {
        if (sectorAdd.response && sectorAdd.response.success) {
            globalDataFunc()
            toast.success('Сектор муваффақиятли қўшилди')
            closeModal()
        } else if (sectorAdd.response?.message) toast.error(`${sectorAdd.response.message}`)
        consoleClear()
    }, [sectorAdd.response]);

    useEffect(() => {
        if (sectorEdits.response && sectorEdits.response.success) {
            globalDataFunc()
            toast.success('Сектор муваффақиятли таҳрирланди')
            closeModal()
        } else if (sectorEdits.response?.message) toast.error(`${sectorEdits.response.message}`)
        consoleClear()
    }, [sectorEdits.response]);

    useEffect(() => {
        if (sectorDeletes.response && sectorDeletes.response.success) {
            globalDataFunc()
            toast.success('Сектор муваффақиятли ўчирилди')
            closeModal()
        } else if (sectorEdits.response?.message) toast.error(`${sectorDeletes.response.message}`)
        consoleClear()
    }, [sectorDeletes.response]);

    const handleChange = (name: string, value: string) => setCrudSector({...crudSector, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudSector(defVal);
            setEditOrDeleteStatus('');
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Секторлар`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Сектор қўшиш`}
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
                    <Tables thead={sectorThead}>
                        {(response && response.body?.object?.length > 0) ? response.body.object.map((sector: any, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sector.name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sector.districtName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sector.number}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 flex items-center justify-start gap-3">
                                    <FaEdit
                                        className={`text-xl hover:cursor-pointer text-yellow-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('EDIT')
                                            setCrudSector(sector)
                                        }}
                                    />
                                    <AiFillDelete
                                        className={`text-xl hover:cursor-pointer text-red-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('DELETE')
                                            setCrudSector(sector)
                                        }}
                                    />
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={sectorThead.length}
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
                            Ҳақиқатдан хам бу секторни ўчириб ташламоқчимисиз?
                        </p>
                    ) : <div className={`mt-7`}>
                        <label>Сектор номини киритинг</label>
                        <input
                            value={crudSector.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Сектор номини киритинг"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-7"
                        />
                        <label>Сектор рақамини киритинг</label>
                        <input
                            value={crudSector.number}
                            type={'number'}
                            onChange={(e) => handleChange('number', e.target.value)}
                            placeholder="Сектор рақамини киритинг"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-7"
                        />
                        <label>Туманни танланг</label>
                        <select
                            value={crudSector.districtId}
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
                                text={sectorAdd.loading ? 'Сақланмоқда...' : 'Сақлаш'}
                                className={`bg-darkGreen ${sectorAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!sectorAdd.loading) {
                                        if (crudSector.name && crudSector.districtId && crudSector.number) sectorAdd.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={sectorEdits.loading ? 'Юкланмоқда...' : 'Таҳрирлаш'}
                                className={`bg-darkGreen ${sectorEdits.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!sectorEdits.loading) {
                                        if (crudSector.name && crudSector.districtId && crudSector.number) sectorEdits.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={sectorDeletes.loading ? 'Ўчирилмоқда...' : 'Ҳа'}
                                className={`bg-darkGreen ${sectorDeletes.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!sectorDeletes.loading) sectorDeletes.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Sectors;
