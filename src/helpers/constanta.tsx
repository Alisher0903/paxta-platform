import {LuLayoutDashboard} from "react-icons/lu";
import {IThead} from "@/components/custom/tables/table.tsx";
import {FaLocationCrosshairs, FaLocationDot, FaTractor} from "react-icons/fa6";
import {BsIntersect} from "react-icons/bs";
import {FaUsers} from "react-icons/fa";
import {PiFarmFill} from "react-icons/pi";
import {TbReportSearch} from "react-icons/tb";
import {FcStatistics} from "react-icons/fc";

// ===============SIDEBAR DATA================
export const sideData = {
    superAdmin: [
        {title: 'Бошқарув панели', icon: <LuLayoutDashboard size={20}/>, path: '/super-admin/dashboard'},
        {title: 'Секторлар', icon: <BsIntersect size={20}/>, path: '/super-admin/sector'},
        {title: 'Фойдаланувчилар', icon: <FaUsers size={20}/>, path: '/super-admin/users'},
        {title: 'Туманлар', icon: <FaLocationDot size={20}/>, path: '/super-admin/district'},
        {title: 'Машиналар', icon: <FaTractor size={20}/>, path: '/super-admin/machine'},
        {title: 'Пахта териладиган ҳудудлар', icon: <FaLocationCrosshairs size={20}/>, path: '/super-admin/cotton'},
        {title: 'Фермер хўжалиги', icon: <PiFarmFill size={20}/>, path: '/super-admin/farm'},
        {title: 'Масъул ходимлар', icon: <PiFarmFill size={20}/>, path: '/super-admin/resp-user'},
        {title: 'Ҳисоботлар', icon: <TbReportSearch size={20}/>, path: '/super-admin/report'},
        {title: 'Статистика', icon: <FcStatistics size={20}/>, path: '/super-admin/statistics'},
    ],
    user: [
        {title: 'Ҳисоботлар', icon: <TbReportSearch size={20}/>, path: '/user/report'},
        {title: 'Машиналар ҳолати', icon: <FaTractor size={20}/>, path: '/user/machine'},
    ]
};

// ===================THEAD DATA==================
export const confirmUserTHead: IThead[] = [
    {id: 1, name: 'Т/р'},
    {id: 2, name: 'Ф.И.О'},
    {id: 3, name: 'Туман'},
    {id: 5, name: 'Телефон рақами'},
    {id: 6, name: 'Машина ҳолати'},
    {id: 6, name: 'Ҳаракат'},
]

export const machineReportList: IThead[] = [
    {id: 1, name: 'Т/р'},
    {id: 2, name: 'Туман номи'},
    {id: 3, name: 'Сектор рақами'},
    {id: 4, name: 'Ареа номи'},
    {id: 5, name: 'Фермер хўжалиги номи'},
    {id: 6, name: "Машина статуси"},
    {id: 7, name: "Машина бузилган вақти"},
    {id: 8, name: "Машина созланган вақти"},
    {id: 9, name: "Ҳаракат"},
];

export const machineReportThead: IThead[] = [
    {id: 1, name: 'Т/р'},
    {id: 2, name: 'Машина модели'},
    {id: 3, name: 'Туман'},
    {id: 4, name: 'Сектор рақами'},
    {id: 5, name: 'Ареа номи'},
    {id: 6, name: "Фермер хўжалиги номи"},
    {id: 7, name: "Ер майдони (гектар)"},
    {id: 8, name: "Терилган (тонна)"},
    {id: 9, name: "Машина ҳолати"},
    {id: 10, name: "Бузилган санаси"},
    {id: 11, name: "Бузилган вақти"},
    {id: 12, name: "Машина статуси"},
    {id: 13, name: "Масъул шахс"},
    {id: 14, name: "Кун"},
    {id: 15, name: "Вақт"},
    {id: 16, name: "Ҳаракат"},
];

export const districtsThead: IThead[] = [
    {id: 5, name: 'Т/р'},
    {id: 1, name: 'Туман номи'},
    {id: 7, name: 'Ҳаракат'},
];

export const sectorThead: IThead[] = [
    {id: 5, name: 'Т/р'},
    {id: 1, name: 'Сектор номи'},
    {id: 8, name: 'Туман номи'},
    {id: 9, name: 'Сектор рақами'},
    {id: 7, name: 'Ҳаракат'},
];

export const farmThead: IThead[] = [
    {id: 5, name: 'Т/р'},
    {id: 1, name: 'Фермер хўжалиги номи'},
    {id: 8, name: 'Инн'},
    {id: 9, name: 'Ареа номи'},
    {id: 10, name: 'Сектор рақами'},
    {id: 7, name: 'Ҳаракат'},
];

export const cottonThead: IThead[] = [
    {id: 5, name: 'Т/р'},
    {id: 1, name: 'Ареа номи'},
    {id: 8, name: 'Туман'},
    {id: 10, name: 'Сектор рақами'},
    {id: 7, name: 'Ҳаракат'},
];

export const machineThead: IThead[] = [
    {id: 1, name: 'Т/р'},
    {id: 8, name: 'Туман'},
    {id: 3, name: 'Фермер хўжалиги номи'},
    {id: 4, name: 'Оператор Ф.И.О'},
    {id: 5, name: 'Оператор рақами'},
    {id: 6, name: 'Машина ид'},
    {id: 7, name: 'Машина модели'},
    {id: 9, name: 'Йил'},
    {id: 2, name: 'Ф.И.О'},
    {id: 6, name: 'Лавозими'},
    {id: 11, name: 'Телефон рақами'},
    {id: 10, name: 'Ҳаракат'},
];

export const userTableHead: IThead[] = [
    {id: 1, name: 'Т/р'},
    {id: 2, name: 'Исми'},
    {id: 3, name: 'Фамилияси'},
    {id: 5, name: 'Телефон рақами'},
    {id: 7, name: 'Лавозими'},
    {id: 8, name: 'Статуси'},
    {id: 5, name: 'Туман'},
    {id: 9, name: 'Сектор номи'},
    {id: 10, name: 'Сектор рақами'},
    {id: 6, name: 'Ҳаракат'},
]

export const reportThead: IThead[] = [
    {id: 1, name: 'Т/р'},
    {id: 5, name: 'Машина модели'},
    {id: 7, name: 'Туман'},
    {id: 10, name: 'Сектор рақами'},
    {id: 4, name: 'Ареа номи'},
    {id: 3, name: 'Фермер хўжалиги номи'},
    {id: 11, name: 'Терим майдони (гектар)'},
    {id: 8, name: 'Пахта ҳажми (тонна)'},
    {id: 9, name: 'Машина активлиги'},
    {id: 13, name: 'Тугаган санаси'},
    {id: 15, name: 'Тугаган вақти'},
    {id: 6, name: 'Машина ҳолати'},
    {id: 2, name: 'Ф.И.О'},
    {id: 12, name: 'Сана'},
    {id: 14, name: 'Вақт'},
];