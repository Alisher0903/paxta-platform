import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import Modal from "@/components/custom/modal/modal.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import testStore from "@/helpers/state-management/testStore.tsx";
import TestCrudCheck from "@/pages/quiz-admin/test/components/test-crud-check.tsx";
import toast from "react-hot-toast";
import courseStore from "@/helpers/state-management/coursesStore.tsx";
import {testThead} from "@/helpers/constanta.tsx";
import {MdOutlineAddCircle} from "react-icons/md";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {categoryList, lessonModuleID, moduleOnline, questionAllGetPage, questionCrud} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import {TestList} from "@/types/test.ts";
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin7Fill} from "react-icons/ri";
import {CoursesList} from "@/types/course.ts";
import {Input, Pagination, Select} from 'antd';
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";

const defVal = {
    name: '',
    categoryId: null,
    lessonId: null,
    optionDto: null,
    categoryName: '',
    lessonName: ''
}

const Tests = () => {
    const admin_role = sessionStorage.getItem("admin_roles");
    const {editOrDeleteStatus, setEditOrDeleteStatus} = courseStore()
    const {crudTest, setCrudTest, optionDto, setOptionDto} = testStore()
    const [isModal, setIsModal] = useState(false);
    const [page, setPage] = useState<number>(0);
    const [categoryFilter, setCategoryFilter] = useState<string>('');
    const [testName, setTestName] = useState<string>('');
    const [moduleID, setModuleID] = useState<string>('');

    // ============SERVER REQUEST=============
    const urls = () => {
        if (admin_role === 'ADMIN_QUIZ') return `QUIZ`
        else if (admin_role === 'ADMIN_ONLINE') return `ONLINE`
    }
    const getTestUrl = () => {
        const queryParams: string = [
            testName ? `questionName=${testName}` : '',
            categoryFilter ? `categoryId=${categoryFilter}` : ''
        ].filter(Boolean).join('&');

        return `${questionAllGetPage}?${queryParams ? `${queryParams}&` : ''}categoryEnum=${urls()}&page=${page}&size=10`;
    }
    const categoryLists = useGlobalRequest(`${categoryList}${urls()}`, 'GET')
    const {loading, globalDataFunc, response} = useGlobalRequest(getTestUrl(), 'GET')
    const testDataAdd = useGlobalRequest(
        `${questionCrud}?categoryId=${admin_role === 'ADMIN_QUIZ' ? crudTest?.categoryId : 0}&lessonId=${admin_role === 'ADMIN_ONLINE' ? crudTest?.lessonId : 0}`,
        'POST',
        {name: crudTest?.name, optionDto: optionDto}
    )
    const testDataEdit = useGlobalRequest(`${questionCrud}/${crudTest?.id}`, 'PUT', {
        name: crudTest?.name,
        optionDto: optionDto
    })
    const testDataDelete = useGlobalRequest(`${questionCrud}/${crudTest?.id}`, 'DELETE')
    const moduleGet = useGlobalRequest(moduleOnline, 'GET')
    const moduleLessonGet = useGlobalRequest(`${lessonModuleID}${moduleID}`, 'GET')

    useEffect(() => {
        globalDataFunc()
        categoryLists.globalDataFunc()
        moduleGet.globalDataFunc()
        consoleClear()
    }, []);

    useEffect(() => {
        if (moduleID) moduleLessonGet.globalDataFunc()
    }, [moduleID]);

    useEffect(() => {
        globalDataFunc()
        consoleClear()
    }, [page, categoryFilter, testName]);

    useEffect(() => {
        if (testDataAdd.response) {
            globalDataFunc()
            closeModal()
            toast.success('Savol muvaffaqiyatli qushildi')
        }
    }, [testDataAdd.response]);

    useEffect(() => {
        if (testDataEdit.response) {
            globalDataFunc()
            closeModal()
            toast.success('Savol muvaffaqiyatli taxrirlandi')
        }
    }, [testDataEdit.response]);

    useEffect(() => {
        if (testDataDelete.response) {
            globalDataFunc()
            closeModal()
            toast.success('Savol muvaffaqiyatli o\'chirildi')
        }
    }, [testDataDelete.response]);

    const handleChange = (name: string, value: string | any) => setCrudTest({...crudTest, [name]: value});

    const openModal = () => setIsModal(true);
    const closeModal = () => {
        setIsModal(false);
        setTimeout(() => {
            setCrudTest(defVal);
            setOptionDto([{answer: '', isCorrect: false}])
            setEditOrDeleteStatus('');
        }, 500)
    };

    return (
        <>
            <Breadcrumb pageName={`Testlar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <ShinyButton
                    text={`Savol qo'shish`}
                    icon={<MdOutlineAddCircle size={30}/>}
                    className={`bg-darkGreen`}
                    onClick={() => {
                        openModal()
                        setEditOrDeleteStatus('POST')
                    }}
                />
                <div
                    className={`w-full ${admin_role === 'ADMIN_ONLINE' ? 'lg:max-w-[30%]' : 'lg:max-w-[60%]'} flex justify-start xl:justify-between items-center flex-wrap md:flex-nowrap gap-5`}
                >
                    <Input
                        className={`w-full bg-transparent h-11 custom-input`}
                        placeholder="Test nomi bo'yicha qidirish..."
                        onChange={(val) => setTestName(val.target.value)}
                        allowClear
                    />
                    {admin_role === 'ADMIN_QUIZ' && (
                        <Select
                            placeholder={`Yo'nalish buyicha qidirish`}
                            className={`w-full bg-transparent h-11 custom-select`}
                            onChange={(value) => setCategoryFilter(value)}
                            allowClear
                        >
                            {categoryLists.response && categoryLists.response.map((item: any) => (
                                <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                            ))}
                        </Select>
                    )}
                </div>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {loading ? <div className={`w-full grid grid-cols-1 gap-5`}>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={testThead}>
                        {response ? response.body.map((quiz: TestList, idx: number) => {
                            return TBody(quiz, idx, openModal, setEditOrDeleteStatus, setCrudTest, page)
                        }) : NotFoundList()}
                    </Tables>
                )}
                <Pagination
                    showSizeChanger={false}
                    responsive={true}
                    defaultCurrent={1}
                    total={response ? response.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>

            <Modal onClose={closeModal} isOpen={isModal}>
                <div className={`min-w-54 sm:w-64 md:w-96 lg:w-[40rem]`}>
                    {editOrDeleteStatus === 'DELETE' ? (
                        <p className={`text-center text-black text-base lg:text-xl mb-10 mt-7`}>
                            Haqiqatdan xam bu savolni o'chirib tashlamoqchimisiz?
                        </p>
                    ) : (
                        <div className={`mt-7`}>
                            <input
                                type="text"
                                value={crudTest?.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="Savolni kiriting..."
                                className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                            />
                            {editOrDeleteStatus === 'POST' && (<>
                                {admin_role === 'ADMIN_QUIZ' && (
                                    <select
                                        onChange={(e) => handleChange(`categoryId`, +e.target.value)}
                                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                                    >
                                        <option disabled selected>
                                            Yo'nalishni tanlang
                                        </option>
                                        {categoryLists.response && categoryLists.response.map((item: CoursesList) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                )}
                                {admin_role === 'ADMIN_ONLINE' && <>
                                    <select
                                        onChange={(e) => setModuleID(e.target.value)}
                                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                                    >
                                        <option disabled selected>
                                            Modulni tanlang
                                        </option>
                                        {moduleGet.response && moduleGet.response.map((item: any) => (
                                            <option value={item.moduleId} key={item.moduleId}>{item.name}</option>
                                        ))}
                                    </select>
                                    <select
                                        onChange={(e) => handleChange(`lessonId`, +e.target.value)}
                                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg block w-full p-2.5 my-7"
                                    >
                                        <option disabled selected>
                                            Darsni tanlang
                                        </option>
                                        {moduleLessonGet.response && moduleLessonGet.response.map((item: any) => (
                                            <option value={item.id}>{item.name}</option>
                                        ))}
                                    </select>
                                </>}
                            </>)}
                            <p className={`text-center mt-4`}>
                                {editOrDeleteStatus === 'EDIT' && 'Variantlarni uzgartirishingiz mumkin!!!'}
                            </p>
                            {editOrDeleteStatus === 'EDIT' ?
                                <TestCrudCheck defQues={crudTest?.optionDto}/> : <TestCrudCheck/>
                            }
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
                                text={testDataAdd.loading ? 'Saqlanmoqda...' : 'Saqlash'}
                                className={`bg-darkGreen ${testDataAdd.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!testDataAdd.loading) {
                                        if (crudTest?.name) testDataAdd.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'EDIT' && (
                            <ShinyButton
                                text={testDataEdit.loading ? 'Yuklanmoqda...' : 'Taxrirlash'}
                                className={`bg-darkGreen ${testDataEdit.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!testDataEdit.loading) {
                                        if (crudTest?.name && crudTest?.optionDto && admin_role === 'ADMIN_QUIZ' ? crudTest?.categoryId : crudTest?.lessonId) testDataEdit.globalDataFunc()
                                        else toast.error('Ma\'lumotlar tuliqligini tekshirib kuring')
                                    }
                                }}
                            />
                        )}
                        {editOrDeleteStatus === 'DELETE' && (
                            <ShinyButton
                                text={testDataDelete.loading ? 'O\'chirilmoqda...' : 'Xa'}
                                className={`bg-darkGreen ${testDataDelete.loading && 'cursor-not-allowed opacity-60'}`}
                                onClick={() => {
                                    if (!testDataDelete.loading) testDataDelete.globalDataFunc()
                                }}
                            />
                        )}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Tests;

const TBody = (quiz: TestList, idx: number, openModal: () => void, setEditOrDeleteStatus: (v: string) => void, setCrudTest: (v: any) => void, page: number) => {
    return (
        <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
            <td className="border-b border-[#eee] p-5">
                <p className="text-black">
                    {(page * 10) + idx + 1}
                </p>
            </td>
            <td className="border-b border-[#eee] p-5">
                <p className="text-black">
                    {quiz.name}
                </p>
            </td>
            <td className="border-b border-[#eee] p-5">
                <p className="text-black">
                    {quiz.lessonName ? quiz.lessonName : quiz.categoryName}
                </p>
            </td>
            <td className="border-b border-[#eee] p-5">
                <p className="text-black flex items-center justify-start gap-5 text-xl">
                    <FaEdit
                        className={`hover:text-yellow-500 duration-300 cursor-pointer`}
                        onClick={() => {
                            openModal()
                            setCrudTest(quiz)
                            setEditOrDeleteStatus('EDIT')
                        }}
                    />
                    <RiDeleteBin7Fill
                        className={`hover:text-red-500 duration-300 cursor-pointer`}
                        onClick={() => {
                            openModal()
                            setCrudTest(quiz)
                            setEditOrDeleteStatus('DELETE')
                        }}
                    />
                </p>
            </td>
        </tr>
    )
}

const NotFoundList = () => {
    return (
        <tr className={`hover:bg-whiteGreen duration-100`}>
            <td
                className="border-b border-[#eee] p-5 text-black text-center"
                colSpan={testThead.length}
            >
                Ma'lumot topilmadi
            </td>
        </tr>
    )
}
