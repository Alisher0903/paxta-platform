import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Input, Pagination, Select} from "antd";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {resultThead} from "@/helpers/constanta.tsx";
import moment from "moment";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {useEffect, useState} from "react";
import {categoryList, resultSearch} from "@/helpers/api.tsx";

const Result = () => {
    const [page, setPage] = useState(0)
    const [name, setName] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [statusFilter, setStatusFilter] = useState('')

    const getTestUrl = () => {
        const queryParams: string = [
            name ? `name=${name}` : '',
            categoryFilter ? `categoryName=${categoryFilter}` : '',
            statusFilter ? `statusCode=${statusFilter}` : ''
        ].filter(Boolean).join('&');

        return `${resultSearch}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
    }
    const {response, loading, globalDataFunc} = useGlobalRequest(getTestUrl(), 'GET')
    const categoryLists = useGlobalRequest(`${categoryList}QUIZ`, 'GET')

    useEffect(() => {
        globalDataFunc()
        categoryLists.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [name, page, categoryFilter, statusFilter]);

    return (
        <>
            <Breadcrumb pageName={`Natijalalar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <Input
                    className={`w-full bg-transparent h-11 custom-input`}
                    placeholder="F.I.O buyicha qidiruv..."
                    onChange={(val) => setName(val.target.value)}
                    allowClear
                />
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
                <Select
                    placeholder={`Holati buyicha qidirish`}
                    className={`w-full bg-transparent h-11 custom-select`}
                    onChange={(value) => setStatusFilter(value)}
                    allowClear
                >
                    <Select.Option value={3}>A'lo</Select.Option>
                    <Select.Option value={2}>Yaxshi</Select.Option>
                    <Select.Option value={1}>Yomon</Select.Option>
                </Select>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {loading ? (
                    <div className={`w-full grid grid-cols-1 gap-3`}>
                        <Skeleton/>
                        <Skeleton/>
                    </div>
                ) : (
                    <Tables thead={resultThead}>
                        {response ? response.body.map((rate: any, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.userName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.categoryName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.countAnswer} ta
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.correctAnswer} ta
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.duration} min
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.status}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] min-w-[200px] p-5">
                                    <p className="text-black">
                                        {moment(rate.createdAt).format('DD.MM.YYYY')}
                                    </p>
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={resultThead.length}
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
                    total={response ? response.totalElements : 0}
                    onChange={(page: number) => setPage(page - 1)}
                    rootClassName={`mt-8 mb-5`}
                />
            </div>
        </>
    );
};

export default Result;
