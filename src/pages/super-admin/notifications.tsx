import { useEffect, useState } from "react";
import Breadcrumb from "@/components/custom/breadcrumb/Breadcrumb.tsx";
import { Card, CardTitle, HoverEffect } from "@/components/ui/card-hover-effect.tsx";
import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";
import { MdNote } from "react-icons/md";
import { Pagination, Modal, Select } from "antd";
import toast from "react-hot-toast";
import { useGlobalRequest } from "@/helpers/functions/restApi-function.tsx";
import { notificationConfirmation, notificationDelete, notificationGet, notificationRead } from "@/helpers/api.tsx";
import { consoleClear } from "@/helpers/functions/toastMessage.tsx";
import ShinyButton from "@/components/magicui/shiny-button";

const { Option } = Select;

const Notifications = () => {
    const [readID, setReadID] = useState<number | null>(null);
    const [page, setPage] = useState(0);
    const [deleteIDs, setDeleteIDs] = useState<number[]>([]); // IDs for delete
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false); // Delete modal state
    const [isConfirmationModalVisible, setIsConfirmationModalVisible] = useState(false); // Confirmation modal state
    const [confirmation, setConfirmation] = useState(''); // Confirmation state
    const [selectedNotificationID, setSelectedNotificationID] = useState<number | null>(null); // Selected notification ID
    const { response, loading, globalDataFunc } = useGlobalRequest(
        `${notificationGet}?page=${page}&size=10`,
        'GET'
    );

    const readNotification = useGlobalRequest(notificationRead, 'POST', { ids: [readID] });
    const { response: deleteNotification, globalDataFunc: deleteNotificationFunc } = useGlobalRequest(notificationDelete, 'POST', { list: deleteIDs });
    const { response: ResNotificationConfirmation, globalDataFunc: notificationConfirmationFunc } = useGlobalRequest(
        `${notificationConfirmation}?id=${selectedNotificationID}&status=${confirmation}`,
        'POST'
    );

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
                setIsDeleteModalVisible(false);
                globalDataFunc();
                toast.success('Барча билдиришномалар ўчирилди');
            }
        } catch {
            toast.error('Билдиришномаларни ўчиришда хатолик юз берди');
        }
    };

    useEffect(() => {
        if (readNotification.response) {
            globalDataFunc();
            setReadID(null);
            toast.success('Билдиришномани ўқилган қилиб белгиладингиз');
        }
        consoleClear();
    }, [readNotification.response]);

    const handleDeleteAll = () => {
        const idsToDelete = response && response.body?.object?.map((n: { id: number }) => n.id) || [];
        setDeleteIDs(idsToDelete);
        setIsDeleteModalVisible(true);
    };

    const handleConfirmationChange = (value: string, id: number) => {
        setConfirmation(value);
        setSelectedNotificationID(id);
        setIsConfirmationModalVisible(true);
    };

    const confirmStatusChange = async () => {
        try {
            await notificationConfirmationFunc();
            if (ResNotificationConfirmation.success) {
                toast.success('Билдиришнома муваффақиятли янгиланди');
                globalDataFunc();
            }
        } catch {
            toast.error('Билдиришномани янгилашда хатолик юз берди');
        }
        setIsConfirmationModalVisible(false);
    };

    return (
        <>
            <Breadcrumb pageName="Билдиришномалар" />

            <Card className="mb-10">
                <CardTitle className="text-center">
                    Админ учун билдиришномалар
                </CardTitle>
            </Card>
            {response?.body?.object?.length > 0 && <ShinyButton text="Barcha bildirishnomalarni o'chirish" className=" py-3 px-8 mb-5  bg-[#9a1e1e] text-white" onClick={handleDeleteAll} />}
            <ShinyButton text="Барча билдиришномаларни ўчириш" className=" py-3 px-8 mb-5  bg-[#9a1e1e] text-white" onClick={handleDeleteAll} />

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
                            description={
                                <>
                                    <p>Тавсиф: {n.status}</p>
                                    <p>Фойдаланувчи: {n.userFullName}</p>
                                </>
                            }
                            date={n.createdAt}
                            read={!n.read}
                            children={
                                <Select
                                    className="w-full bg-[#9a1e1e] text-white custom-select"
                                    defaultValue="Select status"
                                    onChange={(value) => handleConfirmationChange(value, n.id)} // Pass notification ID
                                >
                                    <Option value="RUXSAT_SURALMOQDA">RUXSAT_SURALMOQDA</Option>
                                    <Option value="RUXSAT_BERILDI">RUXSAT_BERILDI</Option>
                                </Select>
                            }
                            onClick={() => {
                                if (!n.read) setReadID(n.id);
                            }}
                        />
                    ))
                ) : (
                    <Card className="mt-10">
                        <CardTitle className="flex items-center justify-center gap-3">
                            Маълумот топилмади <MdNote className="text-darkGreen text-3xl" />
                        </CardTitle>
                    </Card>
                )
            ) : (
                <Card className="mt-10">
                    <CardTitle className="flex items-center justify-center gap-3">
                        Маълумот топилмади <MdNote className="text-darkGreen text-3xl" />
                    </CardTitle>
                </Card>
            )}

            {response?.body?.object?.length > 0 && <Pagination
                showSizeChanger={false}
                responsive={true}
                defaultCurrent={1}
                total={response?.success ? response.body?.totalElements : 0}
                onChange={(page: number) => setPage(page - 1)}
                rootClassName="mt-8 mb-5"
            />}

            {/* Delete all notifications modal */}
            <Modal
                title="Тасдиқлаш"
                visible={isDeleteModalVisible}
                onOk={deleteNotificationEffect}
                onCancel={() => setIsDeleteModalVisible(false)}
                okText="Tasdiqlash"
                cancelText="Бекор қилиш"
            >
                Барча билдиришномаларни ўчиришни тасдиқлайсизми?
            </Modal>

            {/* Status change confirmation modal */}
            <Modal
                title="Тасдиқлаш"
                visible={isConfirmationModalVisible}
                onOk={confirmStatusChange}
                onCancel={() => setIsConfirmationModalVisible(false)}
                okText="Тасдиқлаш"
                cancelText="Бекор қилиш"
            >
                Билдиришнома ҳолатини ўзгартиришни тасдиқлайсизми?
            </Modal>
        </>
    );
};

export default Notifications;
