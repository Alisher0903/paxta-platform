import React from 'react';

interface IMasterTableProps {
    data: any[]; // You can define the actual type of your data here
}

const StatisticTables: React.FC<IMasterTableProps> = ({data}) => {
    return (
        <div className="rounded-sm bg-white shadow-default">
            <div className="max-w-full overflow-x-auto w-[100%]">
                <table className="w-full table-auto border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th rowSpan={3} className="p-2 border border-black/30 text-center">№</th>
                            <th rowSpan={3} className="p-2 border border-black/30 text-center">Туманлар</th>
                            <th colSpan={3} rowSpan={2} className="p-2 border border-black/30 text-center"></th>
                            <th colSpan={15} className="p-2 border border-black/30 text-center">Пахта терим машиналари
                                шундан русумлар бўйича
                            </th>
                            <th colSpan={5} rowSpan={2} className="p-2 border border-black/30 text-center">Ишламаслик
                                сабаблари
                            </th>
                        </tr>

                        <tr>
                            <th colSpan={2} className="p-2 border border-black/30 text-center">CE-220</th>
                            <th colSpan={2} className="p-2 border border-black/30 text-center">John Deere</th>
                            <th colSpan={2} className="p-2 border border-black/30 text-center">BOSHIRAN</th>
                            <th colSpan={2} className="p-2 border border-black/30 text-center">FM WORLD</th>
                            <th colSpan={2} className="p-2 border border-black/30 text-center">Dong feng</th>
                            <th rowSpan={2} className="p-2 border border-black/30 text-center">Ишламаётгани</th>
                        </tr>

                        <tr>
                            <th className="p-2 border border-black/30 text-center">Мавжуд сони</th>
                            <th className="p-2 border border-black/30 text-center">Ишлаётгани</th>
                            <th className="p-2 border border-black/30 text-center">Терилган пахтаси тн</th>
                            <th className="p-2 border border-black/30 text-center">Сони</th>
                            <th className="p-2 border border-black/30 text-center">Терган пахтаси, тн</th>
                            <th className="p-2 border border-black/30 text-center">Сони</th>
                            <th className="p-2 border border-black/30 text-center">Терган пахтаси, тн</th>
                            <th className="p-2 border border-black/30 text-center">Сони</th>
                            <th className="p-2 border border-black/30 text-center">Терган пахтаси, тн</th>
                            <th className="p-2 border border-black/30 text-center">Сони</th>
                            <th className="p-2 border border-black/30 text-center">Терган пахтаси, тн</th>
                            <th className="p-2 border border-black/30 text-center">Сони</th>
                            <th className="p-2 border border-black/30 text-center">Терган пахтаси, тн</th>
                            <th className="p-2 border border-black/30 text-center">Ёқилғи етказиб берилмаган</th>
                            <th className="p-2 border border-black/30 text-center">Ростлаш олдига олиб борилмаган</th>
                            <th className="p-2 border border-black/30 text-center">Оператор йўқ (механизатор)</th>
                            <th className="p-2 border border-black/30 text-center">Таъмирда</th>
                            <th className="p-2 border border-black/30 text-center">Ташкилий сабаб</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex} className={'hover:bg-veryPaleGreen/60 duration-200'}>
                            <td className="p-2 border border-black/30 text-center">{rowIndex + 1}</td>
                            <td className="p-2 border border-black/30 text-center">{row.districtName}</td>
                            <td className="p-2 border border-black/30 text-center">{row.cambaySoni}</td>
                            <td className="p-2 border border-black/30 text-center">{row.ishlayotgani}</td>
                            <td className="p-2 border border-black/30 text-center">{row.terilganPaxtaMavsumBoshidan}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[0].ishlayotgani}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[0].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[1].ishlayotgani}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[1].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[2].ishlayotgani}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[2].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[3].ishlayotgani}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[3].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[4].ishlayotgani}</td>
                            <td className="p-2 border border-black/30 text-center">{row.resReportCarList[4].terilganPaxtaBirKunda}</td>
                            <td className="p-2 border border-black/30 text-center">{row.ishlamayotganiSoni}</td>
                            <td className="p-2 border border-black/30 text-center">{row.machineStatsDTO.getYoqilgiCount}</td>
                            <td className="p-2 border border-black/30 text-center">{row.machineStatsDTO.getRostlashCount}</td>
                            <td className="p-2 border border-black/30 text-center">{row.machineStatsDTO.getOperatorCount}</td>
                            <td className="p-2 border border-black/30 text-center">{row.machineStatsDTO.getTamirdaCount}</td>
                            <td className="p-2 border border-black/30 text-center">{row.machineStatsDTO.getTashkiliyCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StatisticTables;
