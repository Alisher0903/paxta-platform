import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Input, Pagination, Select} from "antd";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import Tables from "@/components/custom/tables/table.tsx";
import {rateThead} from "@/helpers/constanta.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {RateLists} from "@/types/rate.ts";
import {useEffect, useState} from "react";
import {categoryList, groupList, rateList} from "@/helpers/api.tsx";

const Rate = () => {
    const [page, setPage] = useState<number>(0);
    const [keyword, setKeyword] = useState<string>('');
    const [groupId, setGroupId] = useState<string>('');
    const [categoryId, setCategoryId] = useState<string>('');
    // const [chartData, setChartData] = useState<null | any[]>(null)

    const getTestUrl = () => {
        const queryParams: string = [
            keyword ? `keyword=${keyword}` : '',
            groupId ? `groupId=${groupId}` : '',
            categoryId ? `categoryId=${categoryId}` : ''
        ].filter(Boolean).join('&');

        return `${rateList}?${queryParams ? `${queryParams}&` : ''}page=${page}&size=10`;
    }
    const {loading, response, globalDataFunc} = useGlobalRequest(getTestUrl(), 'GET')
    const groupListGet = useGlobalRequest(groupList, 'GET')
    const categoryListGet = useGlobalRequest(`${categoryList}EDUCATION`, 'GET')

    useEffect(() => {
        globalDataFunc()
        groupListGet.globalDataFunc()
        categoryListGet.globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [page, keyword, groupId, categoryId]);

    return (
        <>
            <Breadcrumb pageName={`Baholar`}/>

            {/*=================SEARCH================*/}
            <div className={`w-full flex justify-between items-center flex-wrap xl:flex-nowrap gap-5 mt-10`}>
                <Input
                    className={`w-full bg-transparent h-11 custom-input`}
                    placeholder="F.I.O buyicha qidiruv..."
                    onChange={(val) => setKeyword(val.target.value)}
                    allowClear
                />
                <Select
                    placeholder={`Kurs buyicha qidirish`}
                    className={`w-full bg-transparent h-11 custom-select`}
                    onChange={(value) => setCategoryId(value)}
                    allowClear
                >
                    {categoryListGet.response && categoryListGet.response.map((item: any) => (
                        <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder={`Guruh buyicha qidirish`}
                    className={`w-full bg-transparent h-11 custom-select`}
                    onChange={(value) => setGroupId(value)}
                    allowClear
                >
                    {groupListGet.response && groupListGet.response.map((item: any) => (
                        <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                    ))}
                </Select>
            </div>

            {/*======================BODY TABLE======================*/}
            <div className={`mt-6`}>
                {loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    <Tables thead={rateThead}>
                        {(response && response.body.length > 0) ? response.body.map((rate: RateLists, idx: number) => (
                            <tr key={idx} className={`hover:bg-whiteGreen duration-100`}>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {(page * 10) + idx + 1}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.fullName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.groupName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.categoryName}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.score}
                                    </p>
                                </td>
                                <td className="border-b border-[#eee] p-5">
                                    <p className="text-black">
                                        {rate.rate}
                                    </p>
                                </td>
                            </tr>
                        )) : <tr className={`hover:bg-whiteGreen duration-100`}>
                            <td
                                className="border-b border-[#eee] p-5 text-black text-center"
                                colSpan={rateThead.length}
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

export default Rate;
