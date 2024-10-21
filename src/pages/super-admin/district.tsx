import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdDelete, MdOutlineAddCircle} from "react-icons/md";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {districtsThead} from "@/helpers/constanta.tsx";
import toast from "react-hot-toast";
import Modal from "@/components/custom/modal/modal.tsx";
import {Input} from "antd";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {useEffect, useState} from "react";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {districtCreate, districtEditOrDelete, districtList} from "@/helpers/api.tsx";
import {FaEdit} from "react-icons/fa";

const defVal = {
    district: ''
}

const District = () => {
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const [crudDistrict, setCrudDistrict] = useState<any>(defVal)
    const [isModal, setIsModal] = useState(false);
    const {response, loading, globalDataFunc} = useGlobalRequest(districtList, 'GET')
    const district = useGlobalRequest(`${districtCreate}?district=${crudDistrict.name}`, 'POST')
    const editDistrict = useGlobalRequest(`${districtEditOrDelete}${crudDistrict.id}?district=${crudDistrict.name}`, 'PUT')
    const deleteDistrict = useGlobalRequest(`${districtEditOrDelete}${crudDistrict.id}`, 'DELETE')

    useEffect(() => {
        globalDataFunc()
    }, []);

    useEffect(() => {
        if (district.response?.success) {
            globalDataFunc()
            closeModal()
            toast.success('Туман муваффақиятли қўшилди')
        } else if (district.error?.response?.data?.message) toast.error(district.error.response.data.message)
    }, [district.response, district.error]);

    useEffect(() => {
        if (editDistrict.response?.success) {
            globalDataFunc()
            closeModal()
            toast.success('Туман муваффақиятли таҳрирланди')
        } else if (editDistrict.error?.response?.data?.message) toast.error(editDistrict.error.response.data.message)
    }, [editDistrict.response, editDistrict.error]);

    useEffect(() => {
        if (deleteDistrict.response?.success) {
            globalDataFunc()
            closeModal()
            toast.success('Туман муваффақиятли ўчирилди')
        } else if (deleteDistrict.error?.response?.data?.message) toast.error(deleteDistrict.error.response.data.message)
    }, [deleteDistrict.response, deleteDistrict.error]);

    const handleChange = (name: string, value: string) => setCrudDistrict({...crudDistrict, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudDistrict(defVal);
            setEditOrDeleteStatus('');
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Туманлар`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Туман қўшиш`}
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
                    <Tables thead={districtsThead}>
                        {(response && response.body?.length > 0) ? response.body.map((D: any, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {D.name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5 flex items-center justify-start gap-6">
                                    <FaEdit
                                        className="text-base text-yellow-300 cursor-pointer duration-300"
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('EDIT')
                                            setCrudDistrict(D)
                                        }}
                                    />
                                    <MdDelete
                                        className="text-xl text-red-300 cursor-pointer duration-300"
                                        onClick={() => {
                                            openModal()
                                            setEditOrDeleteStatus('DELETE')
                                            setCrudDistrict(D)
                                        }}
                                    />
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={districtsThead.length}
                            >
                                Туманлар топилмади
                            </td>
                        </tr>}
                    </Tables>
                )}
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Ҳақиқатдан хам бу туманни ўчириб ташламоқчимисиз?
                        </p>
                    ) : (<div className={`mt-5`}>
                        <label className={`mb-2`}>Туман номи</label>
                        <Input
                            value={crudDistrict.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Туман номини киритинг"
                            className="w-full bg-transparent h-11 custom-input mb-5"
                        />
                    </div>)}
                    <div className={`flex justify-end items-center gap-5`}>
                        <ShinyButton
                            text={`Орқага`}
                            className={`bg-darkGreen`}
                            onClick={closeModal}
                        />
                        {editOrDeleteStatus === 'POST' && (
                            <ShinyButton
                                text={district.loading ? 'Сақланмоқда...' : 'Сақлаш'}
                                className={`bg-darkGreen ${district.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!district.loading) {
                                        if (crudDistrict.name) district.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={editDistrict.loading ? 'Сақланмоқда...' : 'Таҳрирлаш'}
                                className={`bg-darkGreen ${editDistrict.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!editDistrict.loading) {
                                        if (crudDistrict.name) editDistrict.globalDataFunc()
                                        else toast.error('Маълумотлар тўлиқлигини текшириб кўринг')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={deleteDistrict.loading ? 'Сақланмоқда...' : 'Ўчириш'}
                                className={`bg-darkGreen ${deleteDistrict.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!deleteDistrict.loading) deleteDistrict.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default District;
