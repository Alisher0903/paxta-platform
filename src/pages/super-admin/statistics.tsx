import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {stsReport} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import StatisticTables from "@/components/custom/tables/statistic-table.tsx";

const Statistics = () => {
    const [date, setDate] = useState<string>(dateGenerate());
    const [hour, setHour] = useState<string>('');
    const [minute, setMinute] = useState<string>('');

    // =====================REQUESTS======================
    const getModuleUrl = () => {
        const queryParams: string = [
            hour ? `hour=${hour}` : '',
            minute ? `minute=${minute}` : ''
        ].filter(Boolean).join('&');

        return `${stsReport}?date=${date}${queryParams ? `${queryParams}&` : ''}`;
    }
    const {response, loading, globalDataFunc} = useGlobalRequest(getModuleUrl(), 'GET')

    useEffect(() => {
        globalDataFunc()
    }, []);

    useEffect(() => {
        if (minute && hour && date) globalDataFunc()
    }, [hour, minute, date]);

    function dateGenerate() {
        let month: any = new Date().getMonth() + 1
        let day: any = new Date().getDate()
        if (month < 10) month = `0${month}`
        if (day < 10) day = `0${day}`

        return `${new Date().getFullYear()}-${month}-${day}`
    }

    return (
        <>
            <Breadcrumb pageName={`Statistikalar`}/>

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
