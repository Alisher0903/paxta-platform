import React, {ReactNode} from 'react';
import Meteors from "@/components/magicui/meteors.tsx";
import NumberGenerate from "@/components/magicui/number-ticker.tsx";
import {MagicCard} from "@/components/magicui/magic-card.tsx";

interface CardDataStatsProps {
    title: string;
    total: string|number;
    children: ReactNode;
}

const CardDataStats: React.FC<CardDataStatsProps> = (
    {
        title,
        total,
        children,
    }) => {
    return (
        <MagicCard
            className="relative overflow-hidden rounded-lg border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark"
            gradientColor={"#bff1c6"}
        >
            <Meteors number={60}/>
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
                {children}
            </div>
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <span className="text-sm font-medium">{title}</span>
                    <h4 className="text-title-md font-bold text-black dark:text-white">
                        {+total === 0 ? 0 : <NumberGenerate value={+total}/>}
                    </h4>
                </div>
            </div>
        </MagicCard>
    );
};

export default CardDataStats;
