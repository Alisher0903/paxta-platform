import React, {ReactNode} from 'react';
import {Popover} from "antd";

// global table
export interface IMasterTableProps {
    thead: IThead[];
    children: ReactNode;
}

// global table thead lists
export interface IThead {
    id: number;
    name: string;
}

const Tables: React.FC<IMasterTableProps> = ({thead, children}) => {
    return (
        <div className="rounded-sm bg-white shadow-default">
            <div className="max-w-full overflow-x-auto w-[100%]">
                <table className="w-full table-auto">
                    <thead>
                    <tr className="text-left bg-veryPaleGreen">
                        {thead.map((item) => (
                            <th
                                key={item.id}
                                className="min-w-[150px] p-5 font-medium text-black"
                            >
                                {item.name.length > 10 ?
                                    <Popover title={item.name} overlayStyle={{textAlign: 'center', maxWidth: '400px'}}>
                                        {item.name.slice(0, 10)}...
                                    </Popover> : item.name}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>{children}</tbody>
                </table>
            </div>
        </div>
    );
};

export default Tables;