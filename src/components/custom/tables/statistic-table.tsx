import React from 'react';

interface IMasterTableProps {
    data: any[]; // You can define the actual type of your data here
}

const StatisticTables: React.FC<IMasterTableProps> = ({ data }) => {
    return (
        <div className="rounded-sm bg-white shadow-default">
            <div className="max-w-full overflow-x-auto w-[100%]">
                <table className="w-full table-auto border-collapse border border-gray-400">
                    <thead>
                    {/* First row */}
                    <tr>
                        <th rowSpan={3} className="p-2 border border-gray-300 text-center">№</th>
                        <th rowSpan={3} className="p-2 border border-gray-300 text-center">Туманлар</th>
                        <th colSpan={3} rowSpan={2} className="p-2 border border-gray-300 text-center"></th>
                        <th colSpan={15} className="p-2 border border-gray-300 text-center">Пахта терим машиналари шундан русумлар бўйича</th>
                        <th colSpan={5} rowSpan={2} className="p-2 border border-gray-300 text-center">Ишламаcлик сабаблари</th>
                    </tr>

                    {/* Second row */}
                    <tr>
                        <th colSpan={2} className="p-2 border border-gray-300 text-center">CE-220</th>
                        <th colSpan={2} className="p-2 border border-gray-300 text-center">John Deere</th>
                        <th colSpan={2} className="p-2 border border-gray-300 text-center">BOSHIRAN</th>
                        <th colSpan={2} className="p-2 border border-gray-300 text-center">FM WORLD</th>
                        <th colSpan={2} className="p-2 border border-gray-300 text-center">Dong feng</th>
                        <th rowSpan={2} className="p-2 border border-gray-300 text-center">Ишламаётгани</th>
                    </tr>

                    {/* Third row */}
                    <tr>
                        <th className="p-2 border border-gray-300 text-center">Мавжуд сони</th>
                        <th className="p-2 border border-gray-300 text-center">Ишлаётгани</th>
                        <th className="p-2 border border-gray-300 text-center">Терилган пахтаси тн</th>
                        <th className="p-2 border border-gray-300 text-center">Сони</th>
                        <th className="p-2 border border-gray-300 text-center">Терган пахтаси, тн</th>
                        <th className="p-2 border border-gray-300 text-center">Сони</th>
                        <th className="p-2 border border-gray-300 text-center">Терган пахтаси, тн</th>
                        <th className="p-2 border border-gray-300 text-center">Сони</th>
                        <th className="p-2 border border-gray-300 text-center">Терган пахтаси, тн</th>
                        <th className="p-2 border border-gray-300 text-center">Сони</th>
                        <th className="p-2 border border-gray-300 text-center">Терган пахтаси, тн</th>
                        <th className="p-2 border border-gray-300 text-center">Сони</th>
                        <th className="p-2 border border-gray-300 text-center">Терган пахтаси, тн</th>
                        <th className="p-2 border border-gray-300 text-center">Ёқилғи етказиб берилмаган</th>
                        <th className="p-2 border border-gray-300 text-center">Ростлаш олдига олиб борилмаган</th>
                        <th className="p-2 border border-gray-300 text-center">Оператор йўқ (механизатор)</th>
                        <th className="p-2 border border-gray-300 text-center">Таъмирда</th>
                        <th className="p-2 border border-gray-300 text-center">Ташкилий сабаб</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            <td className="p-2 border border-gray-300 text-center">{rowIndex + 1}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.districtName}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.cambaySoni}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.ishlayotgani}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.terilganPaxtaMavsumBoshidan}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[0].ishlayotgani}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[0].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[1].ishlayotgani}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[1].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[2].ishlayotgani}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[2].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[3].ishlayotgani}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[3].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[4].ishlayotgani}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.resReportCarList[4].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.ishlamayotganiSoni}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.machineStatsDTO.getYoqilgiCount}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.machineStatsDTO.getRostlashCount}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.machineStatsDTO.getOperatorCount}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.machineStatsDTO.getTamirdaCount}</td>
                            <td className="p-2 border border-gray-300 text-center">{row.machineStatsDTO.getTashkiliyCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatisticTables;
