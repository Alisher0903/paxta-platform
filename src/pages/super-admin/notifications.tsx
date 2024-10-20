import { useEffect, useState } from "react";
import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import { Card, CardTitle, HoverEffect } from "@/components/ui/card-hover-effect.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import { MdNote } from "react-icons/md";
import { Button, Pagination, Modal } from "antd";
import toast from "react-hot-toast";
import { useGlobalRequest } from "@/helpers/functions/restApi-function.tsx";
import { notificationDelete, notificationGet, notificationRead } from "@/helpers/api.tsx";
import { consoleClear } from "@/helpers/functions/toastMessage.tsx";

const Notifications = () => {
    const [readID, setReadID] = useState<number | null>(null);
    const [page, setPage] = useState(0);
    const [deleteIDs, setDeleteIDs] = useState<number[]>([]); // Yig'ilgan id'lar uchun
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal oynani boshqarish uchun

    const { response, loading, globalDataFunc } = useGlobalRequest(
        `${notificationGet}?page=${page}&size=10`,
        'GET'
    );

    const readNotification = useGlobalRequest(notificationRead, 'POST', { ids: [readID] });
    const { response: deleteNotification, globalDataFunc: deleteNotificationFunc } = useGlobalRequest(notificationDelete, 'POST', { list: deleteIDs });

    // Fetch notifications on component mount
    useEffect(() => {
        globalDataFunc();
        consoleClear();
    }, []);

    useEffect(() => {
        if (readID) {
            readNotification.globalDataFunc();
        }
    }, [readID]);

    
    const deleteNotificationEffect = async () => {
        try {
            await deleteNotificationFunc();
            if (deleteNotification.success) {
                setIsModalVisible(false); 
                globalDataFunc();
                toast.success('Barcha bildirishnomalar o\'chirildi');
            }
        } catch {
            toast.error('Bildirishnomalarni o\'chirishda xatolik yuz berdi');
        }
    };
    

    useEffect(() => {
        if (readNotification.response) {
            globalDataFunc();
            setReadID(null);
            toast.success('Bildirishnomani o\'qilgan qilib belgiladingiz');
        }
        consoleClear();
    }, [readNotification.response]);

    const handleDeleteAll = () => {
        const idsToDelete = response?.body?.object?.map((n: { id: number }) => n.id) || [];
        setDeleteIDs(idsToDelete); 
        setIsModalVisible(true); 
    };
console.log(deleteIDs);

    return (
        <>
            <Breadcrumb pageName="Bildirishnomalar" />

            <Card className="mb-10">
                <CardTitle className="text-center">
                    Admin uchun bildirishnomalar
                </CardTitle>
            </Card>

            {/* Barcha bildirishnomalarni o'qish tugmasi */}
            <Button className=" py-6 px-10 mb-5 hover:border-none  bg-[#9a1e1e] text-white" onClick={handleDeleteAll}>
                Barcha bildirishnomalarni o'chirish
            </Button>

            {loading ? (
                <div className="w-full grid grid-cols-1 gap-3">
                    {[...Array(4)].map((_, index) => <Skeleton key={index} />)}
                </div>
            ) : response?.success ? (
                response.body?.object?.length > 0 ? (
                    response?.body?.object?.map((n: {
                        id: number,
                        title: string,
                        userFullName: string,
                        createdAt: string,
                        status: string,
                        read: boolean
                    }, idx: number) => (
                        <HoverEffect
                            key={n.id}
                            idx={idx}
                            title={n.title}
                            description={`Tavsif: ${n.status}`}
                            date={n.createdAt}
                            read={!n.read}
                            onClick={() => {
                                if (!n.read) setReadID(n.id);
                            }}
                        />
                    ))
                ) : (
                    <Card className="mt-10">
                        <CardTitle className="flex items-center justify-center gap-3">
                            Ma'lumot topilmadi <MdNote className="text-darkGreen text-3xl" />
                        </CardTitle>
                    </Card>
                )
            ) : (
                <Card className="mt-10">
                    <CardTitle className="flex items-center justify-center gap-3">
                        Ma'lumot topilmadi <MdNote className="text-darkGreen text-3xl" />
                    </CardTitle>
                </Card>
            )}

            {/* Pagination */}
            <Pagination
                showSizeChanger={false}
                responsive={true}
                defaultCurrent={1}
                total={response?.success ? response.body?.totalElements : 0}
                onChange={(page: number) => setPage(page - 1)}
                rootClassName="mt-8 mb-5"
            />

            {/* Modal oynasi */}
            <Modal
                title="Tasdiqlash"
                visible={isModalVisible}
                onOk={deleteNotificationEffect} 
                onCancel={() => setIsModalVisible(false)} 
                okText="O'chirish"
                cancelText="Bekor qilish"
            >
                Barcha bildirishnomalarni o'chirishni xohlaysizmi?
            </Modal>
        </>
    );
};

export default Notifications;
