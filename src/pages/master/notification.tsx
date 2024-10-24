import {HoverEffect} from "@/components/ui/card-hover-effect.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {notificationGetMaster} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import moment from "moment";
import {Pagination} from "antd";

const NotificationMaster = () => {
    const [page, setPage] = useState(0)
    const {response, loading, globalDataFunc} = useGlobalRequest(`${notificationGetMaster}?page=${page}&size=10`, 'GET')

    useEffect(() => {
        globalDataFunc()
    }, []);

    return (
        <section>
            <Breadcrumb pageName={'Билдиришномалар'}/>

            {loading ?
                <div className={'grid grid-cols-1 gap-5'}>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </div>
                : response?.success ?
                    response.body?.object?.length > 0 ? response.body.object.map((item: {
                        id: number
                        title: string
                        createdAt: string
                        userFullName: string
                        status: string
                        read: boolean
                    }, idx: number) => (
                        <HoverEffect
                            title={`Юборилган: ${item.userFullName}`}
                            description={`Ҳолати: ${item.status}. Сарлавҳа: ${item.title}`}
                            idx={idx}
                            date={moment(item.createdAt?.slice(0, 9)).format('DD.MM.YYYY')}
                            key={idx}
                        />
                    )) : <p className={'text-center font-bold'}>Маълумот топилмади</p>
                    : <p className={'text-center font-bold'}>Маълумот топилмади</p>
            }

            <Pagination
                showSizeChanger={false}
                responsive={true}
                defaultCurrent={1}
                total={response ? response.body?.totalElements : 0}
                onChange={(page: number) => setPage(page - 1)}
                rootClassName={`mt-8 mb-5`}
            />
        </section>
    );
};

export default NotificationMaster;
