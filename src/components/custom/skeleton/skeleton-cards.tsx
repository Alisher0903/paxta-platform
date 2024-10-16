const Skeleton = () => {
    return (
        <div className="rounded-xl p-4 animate-pulse space-y-4 bg-whiteGreen">
            <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200"></div>
                <div className="flex-1 h-5 bg-gray-200 rounded"></div>
            </div>
            <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
        </div>
    );
};

export default Skeleton;
