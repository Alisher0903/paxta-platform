import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import {Card, CardTitle, HoverEffect} from "@/components/ui/card-hover-effect.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";
import {notificationGet, notificationRead} from "@/helpers/api.tsx";
import {useEffect, useState} from "react";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import {MdNote} from "react-icons/md";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import toast from "react-hot-toast";

const Notifications = () => {
    const [readID, setReadID] = useState<number | null>(null)
    const {response, loading, globalDataFunc} = useGlobalRequest(notificationGet, 'GET')
    const readNotification = useGlobalRequest(notificationRead, 'POST', {
        ids: [readID]
    })

    useEffect(() => {
        globalDataFunc();
        consoleClear()
    }, []);

    useEffect(() => {
        if (readID) readNotification.globalDataFunc();
    }, [readID]);

    useEffect(() => {
        if (readNotification.response) {
            globalDataFunc();
            setReadID(null)
            toast.success('Bildirishnomani o\'qilgan qilib belgiladingiz')
        }
        consoleClear()
    }, [readNotification.response]);

    return (
        <>
            <Breadcrumb pageName={`Bildirishnomalar`}/>
            <Card className={`mb-10`}>
                <CardTitle className={`text-center`}>
                    Admin uchun bildirishnomalar
                </CardTitle>
            </Card>
            {loading ? <div className={`w-full grid grid-cols-1 gap-3`}>
                {[...Array(4)].map((_, index) => <Skeleton key={index}/>)}
            </div> : response ? response.map((n: any, idx: number) => (
                <HoverEffect
                    idx={idx}
                    title={n.title}
                    description={`Tavsif: ${n.content}`}
                    date={n.create}
                    read={!n.read}
                    onClick={() => {
                        if (!n.read) setReadID(n.id)
                    }}
                />
            )) : <Card className={`mt-10`}>
                <CardTitle className={`flex items-center justify-center gap-3`}>
                    Ma'lumot topilmadi <MdNote className={`text-darkGreen text-3xl`}/>
                </CardTitle>
            </Card>}
        </>
    );
};

export default Notifications;
