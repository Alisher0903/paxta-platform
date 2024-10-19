import Skeleton from "@/components/custom/skeleton/skeleton-cards.tsx";

const Dashboard = () => {
    return (
        <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'}>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
            <Skeleton/>
        </div>
    );
};

export default Dashboard;
