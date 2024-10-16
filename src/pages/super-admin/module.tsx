import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Input, Select} from "antd";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {categoryList, lessonModuleID, moduleCrud, moduleEdu, moduleOnline} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Modal from "@/components/custom/modal/modal.tsx";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {Card, CardDescription, CardTitle, HoverEffect} from "@/components/ui/card-hover-effect.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {FaEdit} from "react-icons/fa";
import {AiFillDelete} from "react-icons/ai";
import Tables from "@/components/custom/tables/table.tsx";
import {lessonThead} from "@/helpers/constanta.tsx";
import Checkbox from "@/components/custom/checkbox/checkbox.tsx";
import {Link} from "react-router-dom";

const defVal = {
    name: '',
    categoryId: 0
}

const Module = () => {
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [crudModule, setCrudModule] = useState<any>(defVal);
    const [moduleItems, setModuleItems] = useState<any>(null);
    const [isModal, setIsModal] = useState(false);
    const [name, setName] = useState<string>('');
    const admin_role = sessionStorage.getItem('admin_roles')
    const requestData = {
        name: crudModule.name,
        categoryId: crudModule.categoryId
    }

    // =====================REQUESTS======================
    const getModuleUrl = () => {
        const queryParams: string = [
            name ? `moduleName=${name}` : '',
            categoryFilter ? `categoryId=${categoryFilter}` : ''
        ].filter(Boolean).join('&');

        return `${admin_role === 'ADMIN_EDU' ? moduleEdu : moduleOnline}?${queryParams ? `${queryParams}&` : ''}`;
    }
    const {
        response,
        loading,
        globalDataFunc
    } = useGlobalRequest(getModuleUrl(), 'GET')
    const urls = (url: string) => {
        if (admin_role === 'ADMIN_ONLINE') return `${url}ONLINE`
        else if (admin_role === 'ADMIN_EDU') return `${url}EDUCATION`
        else return ''
    }
    const categoryLists = useGlobalRequest(urls(categoryList), 'GET');
    const moduleLessonGet = useGlobalRequest(`${lessonModuleID}${moduleItems?.moduleId}`, 'GET')
    const moduleAdd = useGlobalRequest(`${moduleCrud}`, 'POST', requestData)
    const moduleEdit = useGlobalRequest(`${moduleCrud}/${crudModule.moduleId}`, 'PUT', requestData)
    const moduleDelete = useGlobalRequest(`${moduleCrud}/${crudModule.moduleId}`, 'DELETE')

    useEffect(() => {
        categoryLists.globalDataFunc()
        globalDataFunc()
    }, []);

    useEffect(() => {
        if (moduleAdd.response) {
            globalDataFunc()
            toast.success('Modul muvaffaqiyatli qushildi')
            closeModal()
        } else if (moduleEdit.response) {
            globalDataFunc()
            toast.success('Modul muvaffaqiyatli taxrirlandi')
            closeModal()
        } else if (moduleDelete.response) {
            globalDataFunc()
            toast.success('Modul muvaffaqiyatli uchirildi')
            closeModal()
        }
        consoleClear()
    }, [moduleAdd.response, moduleEdit.response, moduleDelete.response]);

    useEffect(() => {
        globalDataFunc()
        setModuleItems(null)
    }, [categoryFilter, name]);

    useEffect(() => {
        if (moduleItems) moduleLessonGet.globalDataFunc()
    }, [moduleItems]);

    const handleChange = (name: string, value: string) => setCrudModule({...crudModule, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudModule(defVal);
            setEditOrDeleteStatus('');
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Modullar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap lg:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Module qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
                <div
                    className={`w-full lg:max-w-[60%] flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}
                >
                    <Input
                        className={`w-full bg-transparent h-11 custom-input`}
                        placeholder="Modulni qidirish..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        allowClear
                    />
                    <Select
                        placeholder={`Kursni tanlang`}
                        className={`w-full bg-transparent h-11 custom-select`}
                        onChange={(value) => setCategoryFilter(value)}
                        allowClear
                    >
                        {categoryLists.response && categoryLists.response.map((item: any) => (
                            <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                        ))}
                    </Select>
                </div>
            </div>

            {/*==================BODY===============*/}
            <div className={`flex justify-start items-start flex-wrap lg:flex-nowrap gap-5 mt-10`}>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 lg:w-[20%] w-full max-h-[350px] overflow-y-auto`}>
                    {loading ?
                        <Skeleton/> : (response && response.length > 0) ? response.map((item: any, idx: number) => (
                            <HoverEffect
                                idx={idx}
                                title={item.name}
                                description={`Darslar soni: ${item.lessonCount}`}
                                onClick={() => setModuleItems(item)}
                            />
                        )) : <p>Ma'lumot topilmadi</p>}
                </div>
                <div className={`w-full lg:w-[80%]`}>
                    {(response && response.length > 0 && !moduleItems) && (
                        <p className={`text-center text-xl font-semibold`}>Modulni tanlang</p>
                    )}
                    {moduleItems && (<>
                        <div className={`w-full`}>
                            <Card>
                                <CardTitle>{moduleItems.name}</CardTitle>
                                <CardDescription className={`flex justify-between items-center gap-5`}>
                                    {`Darslar soni: ${moduleItems.lessonCount}`}
                                    <p className={`flex items-center gap-5`}>
                                        <FaEdit
                                            className={`text-xl hover:text-yellow-500 cursor-pointer duration-300`}
                                            onClick={() => {
                                                openModal()
                                                setEditOrDeleteStatus('EDIT')
                                                setCrudModule(moduleItems)
                                            }}
                                        />
                                        <AiFillDelete
                                            className={`text-xl hover:text-red-500 cursor-pointer duration-300`}
                                            onClick={() => {
                                                openModal()
                                                setEditOrDeleteStatus('DELETE')
                                                setCrudModule(moduleItems)
                                            }}
                                        />
                                    </p>
                                </CardDescription>
                            </Card>

                            <div className={`mt-6`}>
                                {moduleLessonGet.loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                                    <Skeleton/>
                                    <Skeleton/>
                                </div> : (
                                    <div className={`max-h-[400px] overflow-y-auto`}>
                                        <Tables thead={lessonThead}>
                                            {moduleLessonGet.response ? moduleLessonGet.response.map((m: any, idx: number) => (
                                                <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            {idx + 1}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            {m.name}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            {m.categoryName ? m.categoryName : '-'}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            {m.moduleName ? m.moduleName : '-'}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            {m.description}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            <Link to={m.videoLink} target={`_blank`}>vedioni
                                                                kurish</Link>
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            {m.videoTime ? m.videoTime : '-'}
                                                        </p>
                                                    </td>
                                                    <td className="border-b border-[#eee] p-5">
                                                        <p className="text-black">
                                                            <Checkbox
                                                                setIsChecked={() => !m.userActive}
                                                                isChecked={m.userActive} id={idx}
                                                            />
                                                        </p>
                                                    </td>
                                                </tr>
                                            )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                                                <td
                                                    className="border-b border-[#eee] p-5 text-black text-center"
                                                    colSpan={lessonThead.length}
                                                >
                                                    Ma'lumot topilmadi
                                                </td>
                                            </tr>}
                                        </Tables>
                                    </div>
                                )}
                            </div>
                        </div>
                    </>)}
                </div>
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu modulni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (
                        <div className={`mt-7`}>
                            <input
                                value={crudModule.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Modul nomini kiriting"
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            <select
                                value={crudModule.categoryId}
                                onChange={(e) => handleChange(`categoryId`, e.target.value)}
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                            >
                                <option disabled selected value={0}>Kursni tanlang</option>
                                {categoryLists.response && categoryLists.response.map((item: any) => (
                                    <option value={item.id} key={item.id}>{item.name}</option>
                                ))}
                            </select>
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
                                text={moduleAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${moduleAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!moduleAdd.loading) {
                                        if (crudModule.name && crudModule.categoryId) moduleAdd.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={moduleEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                className={`bg-darkGreen ${moduleEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!moduleEdit.loading) {
                                        if (crudModule.name && crudModule.categoryId) moduleEdit.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={moduleDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                className={`bg-darkGreen ${moduleDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!moduleDelete.loading) moduleDelete.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Module;
