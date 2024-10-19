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
        {title: 'Boshqaruv paneli', icon: <LuLayoutDashboard size={20}/>, path: '/super-admin/dashboard'},
        {title: 'Sectorlar', icon: <BsIntersect size={20}/>, path: '/super-admin/sector'},
        {title: 'Foydalanuvchilar', icon: <FaUsers size={20}/>, path: '/super-admin/users'},
        {title: 'Tumanlar', icon: <FaLocationDot size={20}/>, path: '/super-admin/district'},
        {title: 'Mashinalar', icon: <FaTractor size={20}/>, path: '/super-admin/machine'},
        {title: 'Paxta teriladigan hududlar', icon: <FaLocationCrosshairs size={20}/>, path: '/super-admin/cotton'},
        {title: 'Fermer xo\'jaligi', icon: <PiFarmFill size={20}/>, path: '/super-admin/farm'},
        {title: 'Hisobotlar', icon: <TbReportSearch size={20}/>, path: '/super-admin/report'},
        {title: 'Statistika', icon: <FcStatistics size={20}/>, path: '/super-admin/statistics'},
    ],
    user: [
        {title: 'Hisobotlar', icon: <TbReportSearch size={20}/>, path: '/user/report'},
        {title: 'Mashinalar holati', icon: <FaTractor size={20}/>, path: '/user/machine'},
    ]
};

// ===================THEAD DATA==================
export const confirmUserTHead: IThead[] = [
    {id: 1, name: 'ID'},
    {id: 2, name: 'Ismi'},
    {id: 3, name: 'Familiyasi'},
    {id: 5, name: 'Telefon raqami'},
    {id: 6, name: 'Xarakat'},
]

export const testThead: IThead[] = [
    {id: 4, name: 'ID'},
    {id: 1, name: 'Savol nomi'},
    {id: 2, name: `Yo'nalish nomi`},
    {id: 3, name: 'Xarakat'},
];

export const rateThead: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Tuliq ismi'},
    {id: 6, name: 'Guruh nomi'},
    {id: 2, name: 'Kurs nomi'},
    {id: 3, name: 'To\'plagan bali'},
    {id: 4, name: 'Reytingi'},
];

export const resultThead: IThead[] = [
    {id: 1, name: 'ID'},
    {id: 2, name: 'F.I.O'},
    {id: 3, name: 'Yunalishi'},
    {id: 4, name: 'Savollar soni'},
    {id: 5, name: 'To\'g\'ri javoblar soni'},
    {id: 6, name: 'Ketgan vaqti'},
    {id: 7, name: 'Holati'},
    {id: 8, name: 'Test ishlangan sanasi'},
];

// ============PAXTA================
export const machineReportList: IThead[] = [
    {id: 1, name: 'T/r'},
    {id: 2, name: 'Tuman nomi'},
    {id: 3, name: 'Sector raqami'},
    {id: 4, name: 'Area nomi'},
    {id: 5, name: 'Fermer xo\'jaligi nomi'},
    {id: 6, name: "Mashina statusi"},
    {id: 7, name: "Mashina buzilgan vaqti"},
    {id: 8, name: "Mashina sozlangan vaqti"},
    {id: 9, name: "Harakat"},
];

export const machineReportThead: IThead[] = [
    {id: 1, name: 'T/r'},
    {id: 2, name: 'Mashina modeli '},
    {id: 3, name: 'Tuman'},
    {id: 4, name: 'Sector raqami'},
    {id: 5, name: 'Area nomi'},
    {id: 6, name: "Fermer xo'jaligi nomi"},
    {id: 7, name: "Yer maydoni (gektar)"},
    {id: 8, name: "Terilgan (tonna)"},
    {id: 9, name: "Mashina holati"},
    {id: 10, name: "Buzilgan sanasi"},
    {id: 11, name: "Buzilgan vaqti"},
    {id: 12, name: "Mashina statusi"},
    {id: 13, name: "Masul shaxs"},
    {id: 14, name: "Kun"},
    {id: 15, name: "Vaqt"},
    {id: 16, name: "Harakat"},
];

export const districtsThead: IThead[] = [
    {id: 5, name: 'T/r'},
    {id: 1, name: 'Tuman nomi'},
    {id: 7, name: 'Harakat'},
];

export const sectorThead: IThead[] = [
    {id: 5, name: 'T/r'},
    {id: 1, name: 'Sector nomi'},
    {id: 8, name: 'Tuman nomi'},
    {id: 9, name: 'Sector raqami'},
    {id: 7, name: 'Harakat'},
];

export const farmThead: IThead[] = [
    {id: 5, name: 'T/r'},
    {id: 1, name: 'Ferma nomi'},
    {id: 8, name: 'Inn'},
    {id: 9, name: 'Area nomi'},
    {id: 10, name: 'Sector raqami'},
    {id: 7, name: 'Harakat'},
];

export const cottonThead: IThead[] = [
    {id: 5, name: 'T/r'},
    {id: 1, name: 'Area nomi'},
    {id: 8, name: 'Tuman'},
    {id: 10, name: 'Sector raqami'},
    {id: 7, name: 'Harakat'},
];

export const machineThead: IThead[] = [
    {id: 1, name: 'T/r'},
    {id: 8, name: 'Tuman'},
    {id: 3, name: 'Firma nomi'},
    {id: 4, name: 'Operator F.I.O'},
    {id: 5, name: 'Operator raqami'},
    {id: 6, name: 'Mashina id'},
    {id: 7, name: 'Mashina modeli'},
    {id: 9, name: 'Yil'},
    {id: 2, name: 'F.I.O'},
    {id: 6, name: 'Lavozimi'},
    {id: 11, name: 'Telefon raqami'},
    {id: 10, name: 'Harakatlar'},
];

export const userTableHead: IThead[] = [
    {id: 1, name: 'T/r'},
    {id: 2, name: 'Ismi'},
    {id: 3, name: 'Familiyasi'},
    {id: 5, name: 'Telefon raqami'},
    {id: 7, name: 'Lavozimi'},
    {id: 8, name: 'Statusi'},
    {id: 5, name: 'Tuman'},
    {id: 9, name: 'Sector nomi'},
    {id: 10, name: 'Sector raqami'},
    {id: 6, name: 'Xarakat'},
]

export const reportThead: IThead[] = [
    {id: 1, name: 'T/r'},
    {id: 5, name: 'Mashina modeli'},
    {id: 7, name: 'Tuman'},
    {id: 10, name: 'Sector raqami'},
    {id: 4, name: 'Area nomi'},
    {id: 3, name: 'Firma nomi'},
    {id: 11, name: 'Terim maydoni (gektar)'},
    {id: 8, name: 'Paxta hajmi (tonna)'},
    {id: 9, name: 'Mashina activligi'},
    {id: 13, name: 'Tugagan sanasi'},
    {id: 15, name: 'Tugagan vaqti'},
    {id: 6, name: 'Mashina holati'},
    {id: 2, name: 'F.I.O'},
    {id: 12, name: 'Sana'},
    {id: 14, name: 'Vaqt'},
];