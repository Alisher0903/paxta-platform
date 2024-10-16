import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import Tables from "@/components/custom/tables/table.tsx";
import {groupThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {Input} from "antd";
import {GroupLists} from "@/types/group.ts";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {categoryList, groupCrud, groupList, userTeacherGet} from "@/helpers/api.tsx";
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin7Fill} from "react-icons/ri";
import Checkbox from "@/components/custom/checkbox/checkbox.tsx";
import moment from 'moment'
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import groupStore from "@/helpers/state-management/groupStore.tsx";
import {CoursesList} from "@/types/course.ts";
import Modal from "@/components/custom/modal/modal.tsx";
import toast from "react-hot-toast";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const odd: number[] = [1, 3, 5]
const couple: number[] = [2, 4, 6]

const Groups = () => {
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const {crudGroup, setCrudGroup, defVal} = groupStore()
    const [isModal, setIsModal] = useState(false);
    const [groupID, setGroupID] = useState<null | number>(null);
    const requestData = {
        name: crudGroup.name,
        categoryId: crudGroup.categoryId,
        daysWeekIds: crudGroup.daysWeekIds === 'TOQ' ? odd : couple,
        teacherId: crudGroup.teacherId,
        startDate: crudGroup.startDate,
        startTime: crudGroup.startTime,
        endTime: crudGroup.endTime
    }

    // ===============REQUEST FUNCTION==================
    const {response, loading, globalDataFunc} = useGlobalRequest(groupList, 'GET')
    const groupOne = useGlobalRequest(`${groupCrud}/${groupID}`, 'GET')
    const groupDataAdd = useGlobalRequest(groupCrud, 'POST', requestData)
    const groupDataEdit = useGlobalRequest(`${groupCrud}/${crudGroup.id}`, 'PUT', requestData)
    const groupDataDelete = useGlobalRequest(`${groupCrud}/${crudGroup.id}`, 'DELETE')
    const categoryLists = useGlobalRequest(`${categoryList}EDUCATION`, 'GET')
    const teachersList = useGlobalRequest(userTeacherGet, 'GET');

    useEffect(() => {
        globalDataFunc()
        categoryLists.globalDataFunc()
        teachersList.globalDataFunc()
    }, []);

    useEffect(() => {
        if (groupDataAdd.response) {
            globalDataFunc()
            toast.success('Guruh muvaffaqiyatli qushildi')
            closeModal()
        } else if (groupDataEdit.response) {
            globalDataFunc()
            toast.success('Guruh muvaffaqiyatli taxrirlandi')
            closeModal()
        } else if (groupDataDelete.response) {
            globalDataFunc()
            toast.success('Guruh muvaffaqiyatli o\'chirildi')
            closeModal()
        }
        consoleClear()
    }, [groupDataAdd.response, groupDataEdit.response, groupDataDelete.response]);

    useEffect(() => {
        handleEdit()
    }, [groupID]);

    useEffect(() => {
        if (groupOne.response) {
            const daysName: string = groupOne.response.daysName[0] === 'MONDAY' ? 'MONDAY' : 'TUESDAY';
            setCrudGroup({
                ...groupOne.response,
                daysWeekIds: daysName === 'MONDAY' ? 'TOQ' : 'JUF'
            });
        }
    }, [groupOne.response]);

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudGroup(defVal)
            setEditOrDeleteStatus('')
            setGroupID(null)
            groupDataAdd.response = undefined
            groupDataEdit.response = undefined
            groupDataDelete.response = undefined
        }, 500)
    };

    const handleChange = (name: string, value: string | any) => setCrudGroup({...crudGroup, [name]: value});

    const changeRegex = () => {
        return crudGroup.name && crudGroup.teacherId && crudGroup.daysWeekIds && crudGroup.startTime && crudGroup.categoryId && crudGroup.endTime && crudGroup.startDate
    }

    const handleEdit = () => {
        if (groupID) {
            groupOne.globalDataFunc()
            openModal()
            setEditOrDeleteStatus('EDIT')
        }
    }

    return (
        <>
            <Breadcrumb pageName={`Guruhlar`}/>

            {/*===================ADD OR SEARCH==================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
                <div
                    className={`w-full lg:max-w-[30%] flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}>
                    <Input
                        className={`w-full bg-transparent h-11 custom-input`}
                        placeholder="Guruh nomi buyicha qidirish"
                        // onChange={(e) => setName(e.target.value)}
                        allowClear
                        disabled
                    />
                </div>
            </div>

            {/*========================BODY===================*/}
            <div className={`mt-6`}>
                {loading ? <div className={`grid grid-cols-1 gap-3`}>
                        <Skeleton/>
                        <Skeleton/>
                    </div> :
                    <Tables thead={groupThead}>
                        {response ? response.map((sts: any | GroupLists, idx: number) => (
                            <tr key={sts.id} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.name}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {sts.teacherName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {moment(sts.startDate).format('DD.MM.YYYY')}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        <Checkbox
                                            id={sts.groupId}
                                            isChecked={sts.active}
                                            setIsChecked={() => sts.active}
                                        />
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black flex items-center justify-start gap-5 text-xl">
                                        <FaEdit
                                            className={`hover:text-yellow-500 duration-300 cursor-pointer`}
                                            onClick={() => setGroupID(sts.id)}
                                        />
                                        <RiDeleteBin7Fill
                                            className={`hover:text-red-500 duration-300 cursor-pointer`}
                                            onClick={() => {
                                                openModal()
                                                setCrudGroup(sts)
                                                setEditOrDeleteStatus('DELETE')
                                            }}
                                        />
                                    </p>
                                </td>
                            </tr>
                        )) : (
                            <tr className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5" colSpan={groupThead.length}>
                                    <p className="text-black text-center">
                                        Guruhlar topilmadi
                                    </p>
                                </td>
                            </tr>
                        )}
                    </Tables>
                }
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu guruhni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (
                        <div className={`mt-7`}>
                            <input
                                value={crudGroup.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Guruh nomini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <select
                                value={crudGroup.categoryId}
                                onChange={(e) => handleChange(`categoryId`, +e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                            >
                                <option disabled selected value={0}>
                                    Yo'nalishni tanlang
                                </option>
                                {categoryLists.response && categoryLists.response.map((item: CoursesList) => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <select
                                value={crudGroup.teacherId}
                                onChange={(e) => handleChange(`teacherId`, +e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                            >
                                <option disabled selected value={0}>
                                    O'qituvchini tanlang
                                </option>
                                {teachersList.response && teachersList.response.map((item: any) => (
                                    <option value={item.userId}>{item.firstName} {item.lastName}</option>
                                ))}
                            </select>
                            <select
                                value={crudGroup.daysWeekIds}
                                onChange={(e) => handleChange(`daysWeekIds`, e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 mt-7 mb-5"
                            >
                                <option disabled selected value={``}>
                                    Hafta kunlarini tanlang
                                </option>
                                <option value={`TOQ`}>Toq kunlari: Dushanba, Chorshanba, Juma</option>
                                <option value={`JUF`}>Juft kunlari: Seshanba, Payshanba, Shanba</option>
                            </select>
                            <label className={`mb-2`}>Guruh ochiladigan kunni tanlang</label>
                            <div className="custom-date-input">
                                <input
                                    type="date"
                                    value={crudGroup.startDate}
                                    onChange={(e) => handleChange('startDate', e.target.value)}
                                    placeholder="Guruh ochiladigan kunni tanlang"
                                    className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-5"
                                />
                            </div>
                            <label className={`mb-2`}>
                                Guruh dars boshlanish vaqtini kiriting. Namuna: (08:00 yoki 20:00)
                            </label>
                            <input
                                value={crudGroup.startTime}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,2}(:\d{0,2})?$/.test(value)) handleChange('startTime', value);
                                }}
                                onBlur={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{1,2}(:\d{1,2})?$/.test(value)) {
                                        let [hours, minutes] = value.split(':');
                                        hours = hours.padStart(2, '0');
                                        minutes = (minutes || '00').padStart(2, '0');
                                        handleChange('startTime', `${hours}:${minutes}`);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === " ") e.preventDefault();
                                }}
                                placeholder="Guruh dars vaqtini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5 mb-5"
                            />
                            <label className={`mb-2`}>
                                Guruh dars tugash vaqtini kiriting. Namuna: (10:00 yoki 16:00)
                            </label>
                            <input
                                value={crudGroup.endTime}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{0,2}(:\d{0,2})?$/.test(value)) handleChange('endTime', value);
                                }}
                                onBlur={(e) => {
                                    const value = e.target.value;
                                    if (/^\d{1,2}(:\d{1,2})?$/.test(value)) {
                                        let [hours, minutes] = value.split(':');
                                        hours = hours.padStart(2, '0');
                                        minutes = (minutes || '00').padStart(2, '0');
                                        handleChange('endTime', `${hours}:${minutes}`);
                                    }
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "-" || e.key === "e" || e.key === "+" || e.key === " ") e.preventDefault();
                                }}
                                placeholder="Guruh dars vaqtini kiriting"
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
                                text={groupDataAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${groupDataAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!groupDataAdd.loading) {
                                        if (changeRegex()) groupDataAdd.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={groupDataEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                className={`bg-darkGreen ${groupDataEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!groupDataEdit.loading) {
                                        if (changeRegex()) groupDataEdit.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={groupDataDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                className={`bg-darkGreen ${groupDataDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!groupDataDelete.loading) groupDataDelete.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Groups;
