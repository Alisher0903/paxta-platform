import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Pagination} from "antd";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {cottonThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {
    cottonEditOrDelete,
    cottonGet,
    cottonPost,
    districtList
} from "@/helpers/api.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const defVal = {
    areaName: '',
    sectorNumber: 0,
    districtId: 0
}

const Cotton = () => {
    const [page, setPage] = useState<number>(0);
    const [isModal, setIsModal] = useState(false);
    const [crudCotton, setCrudFarm] = useState<any>(defVal);
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const requestData = {
        areaName: crudCotton.areaName,
        sectorNumber: crudCotton.sectorNumber,
        districtId: crudCotton.districtId
    }

    const {loading, response, globalDataFunc} = useGlobalRequest(`${cottonGet}?page=${page}&size=10`, 'GET')
    const districtLists = useGlobalRequest(districtList, 'GET')
    const cottonAdd = useGlobalRequest(cottonPost, 'POST', requestData)
    const cottonEdit = useGlobalRequest(`${cottonEditOrDelete}${crudCotton.cottonPickedId}`, 'PUT', requestData)
    const cottonDelete = useGlobalRequest(`${cottonEditOrDelete}${crudCotton.cottonPickedId}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
        districtLists.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [page]);

    useEffect(() => {
        if (cottonAdd.response && cottonAdd.response.success) {
            globalDataFunc()
            toast.success('Paxta terim hududi muvaffaqiyatli qushildi')
            closeModal()
        }
        consoleClear()
    }, [cottonAdd.response]);

    useEffect(() => {
        if (cottonEdit.response && cottonEdit.response.success) {
            globalDataFunc()
            toast.success('Paxta terim hududi muvaffaqiyatli taxrirlandi')
            closeModal()
        }
        consoleClear()
    }, [cottonEdit.response]);

    useEffect(() => {
        if (cottonDelete.response && cottonDelete.response.success) {
            globalDataFunc()
            toast.success('Paxta terim hududi muvaffaqiyatli o\'chirildi')
            closeModal()
        }
        consoleClear()
    }, [cottonDelete.response]);

    const handleChange = (name: string, value: string) => setCrudFarm({...crudCotton, [name]: value});

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
            <Breadcrumb pageName={`Paxta teriladigan hududlar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Hudud qo'shish`}
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
                    <Tables thead={cottonThead}>
                        {(response && response.body?.object?.length > 0) ? response.body.object.map((cotton: {
                            cottonPickedId: number
                            areaName: string
                            sectorNumber: number
                            districtId: number
                            districtName: string
                        }, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {cotton.areaName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {cotton.districtName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {cotton.sectorNumber}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 flex items-center justify-start gap-3">
                                    <FaEdit
                                        className={`text-xl hover:cursor-pointer text-yellow-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('EDIT')
                                            setCrudFarm(cotton)
                                        }}
                                    />
                                    <AiFillDelete
                                        className={`text-xl hover:cursor-pointer text-red-500 duration-300`}
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('DELETE')
                                            setCrudFarm(cotton)
                                        }}
                                    />
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={cottonThead.length}
                            >
                                Ma'lumot topilmadi
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
                            Haqiqatdan xam bu paxta teriladigan hududni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : <div className={`mt-7`}>
                        <input
                            value={crudCotton.areaName}
                            onChange={(e) => handleChange('areaName', e.target.value)}
                            placeholder="Area nomini kiriting"
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        />
                        <input
                            value={crudCotton.sectorNumber}
                            type={'number'}
                            onChange={(e) => handleChange('sectorNumber', e.target.value)}
                            placeholder="Sector raqamini kiriting"
                            onKeyDown={e => {
                                if (e.key === '+' || e.key === 'e' || e.key === 'E' || e.key === '-') e.preventDefault()
                            }}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mt-7"
                        />
                        <select
                            value={crudCotton.districtId}
                            onChange={(e) => handleChange(`districtId`, e.target.value)}
                            className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                        >
                            <option disabled selected value={0}>Tumanni tanlang</option>
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
                            text={`Orqaga`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        {editOrDeleteStatus === 'POST' && (
                            <ShinyButton
                                text={cottonAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${cottonAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!cottonAdd.loading) {
                                        if (crudCotton.areaName && crudCotton.sectorNumber && crudCotton.districtId) cottonAdd.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={cottonEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                className={`bg-darkGreen ${cottonEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!cottonEdit.loading) {
                                        if (crudCotton.areaName && crudCotton.sectorNumber && crudCotton.districtId) cottonEdit.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={cottonDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                className={`bg-darkGreen ${cottonDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!cottonDelete.loading) cottonDelete.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Cotton;
