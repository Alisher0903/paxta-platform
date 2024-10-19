import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {excelDownload, stsReport} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import StatisticTables from "@/components/custom/tables/statistic-table.tsx";
import ShinyButton from "@/components/magicui/shiny-button.tsx";
import axios from "axios";
import {config} from "@/helpers/token.tsx";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {Select} from "antd";
import {dateGenerate} from "@/helpers/functions/common-functions.tsx";

const Statistics = () => {
    const [date, setDate] = useState<string>(dateGenerate());
    const [hour, setHour] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // =====================REQUESTS======================
    const getModuleUrl = () => {
        const queryParams: string = [
            hour ? `hour=${hour.slice(0, 2)}` : '',
            hour ? `minute=0` : ''
        ].filter(Boolean).join('&');

        return `${stsReport}?date=${date ? date : dateGenerate()}${queryParams ? `&${queryParams}` : ''}`;
    }
    const {response, loading, globalDataFunc} = useGlobalRequest(getModuleUrl(), 'GET')

    useEffect(() => {
        globalDataFunc()
    }, []);

    useEffect(() => {
        globalDataFunc()
    }, [hour, date]);

    const downloadFile = (url: string) => {
        setIsLoading(true)
        axios.post(url, '', {...config, responseType: 'blob'})
            .then((res) => {
                const blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${date}.xlsx`;
                document.body.appendChild(a);
                a.click();
                setIsLoading(false)
                consoleClear();
            })
            .catch(() => {
                setIsLoading(false)
                consoleClear()
            });
    };

    return (
        <>
            <Breadcrumb pageName={`Statistikalar`}/>

            <div className={`w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-end gap-5 mt-10`}>
                <div className="custom-date-input">
                    <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-white border border-lighterGreen text-gray-900 rounded-lg focus:border-darkGreen block w-full p-2.5"
                    />
                </div>
                <div>
                    <Select
                        placeholder={`Soatni tanlang`}
                        className={`w-full bg-transparent h-11 custom-select`}
                        onChange={(e) => setHour(e)}
                        allowClear
                    >
                        <Select.Option value={'09:00'}>09:00</Select.Option>
                        <Select.Option value={'13:00'}>13:00</Select.Option>
                        <Select.Option value={'19:00'}>19:00</Select.Option>
                        <Select.Option value={'23:00'}>23:00</Select.Option>
                    </Select>
                </div>
                {(date && hour) && (
                    <div className={'flex lg:justify-end items-center'}>
                        <ShinyButton
                            text={`${isLoading ? 'Yuklanmoqda...' : 'Statistikani yuklab olish'}`}
                            onClick={() => {
                                if (!isLoading) downloadFile(`${excelDownload}?date=${date}&hour=${hour.slice(0, 2)}&minute=0`)
                            }}
                            className={`bg-darkGreen py-3 ${isLoading ? 'cursor-not-allowed opacity-70' : ''}`}
                        />
                    </div>
                )}
            </div>

            {/*==================BODY===============*/}
            <div className={`mt-7`}>
                {loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                    <Skeleton/>
                    <Skeleton/>
                </div> : (
                    (response?.success && response?.body?.length > 0) ? <StatisticTables data={response.body}/> : <>
                        <h2 className={'text-center mt-10 font-bold text-xl sm:2xl lg:5xl'}>Malumot topilmadi</h2>
                    </>
                )}
            </div>
        </>
    );
};

export default Statistics;
