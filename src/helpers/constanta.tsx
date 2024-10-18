import {LuLayoutDashboard} from "react-icons/lu";
import {PiStudentFill} from "react-icons/pi";
import {MdOutlineCategory} from "react-icons/md";
import {SiTestcafe} from "react-icons/si";
import {IoNotifications} from "react-icons/io5";
import {IThead} from "@/components/custom/tables/table.tsx";
import {VscFileSubmodule} from "react-icons/vsc";
import {FaCompress} from "react-icons/fa6";

// ===============SIDEBAR DATA================
export const sideData = {
    superAdmin: [
        {title: 'Boshqaruv paneli', icon: <LuLayoutDashboard size={20}/>, path: '/super-admin/dashboard'},
        {title: 'Sectorlar', icon: <MdOutlineCategory size={20}/>, path: '/super-admin/sector'},
        {title: 'Foydalanuvchilar', icon: <PiStudentFill size={20}/>, path: '/super-admin/users'},
        {title: 'Tumanlar', icon: <MdOutlineCategory size={20}/>, path: '/super-admin/district'},
        {title: 'Mashinalar', icon: <SiTestcafe size={20}/>, path: '/super-admin/machine'},
        {title: 'Fermalar', icon: <FaCompress size={20}/>, path: '/super-admin/farm'},
        {title: 'Hisobotlar', icon: <IoNotifications size={20}/>, path: '/super-admin/report'},
        {title: 'Statistika', icon: <IoNotifications size={20}/>, path: '/super-admin/statistics'},
    ],
    user: [
        {title: 'Hisobotlar', icon: <LuLayoutDashboard size={20}/>, path: '/user/report'},
        // {title: 'Hisobot qo\'shish', icon: <SiCoursera size={20}/>, path: '/user/course'},
        {title: 'Mashinalar holati', icon: <VscFileSubmodule size={20}/>, path: '/user/machine'},
    ]
};

// ===================THEAD DATA==================
export const topGroupEdu: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Guruh nomi'},
    {id: 2, name: 'O\'quvchilar soni'},
    {id: 3, name: 'Guruh umumiy bali'},
];

export const topTeacherEdu: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Guruh nomi'},
    {id: 2, name: 'O\'quvchilar soni'},
    {id: 3, name: 'Guruh umumiy bali'},
];

export const topStudentEdu: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'F.I.O'},
    {id: 2, name: 'Guruh nomi'},
    {id: 3, name: 'Umumiy bali'},
];

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

export const lessonPageThead: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Dars nomi'},
    {id: 8, name: 'Yunalish nomi'},
    {id: 9, name: 'Modul nomi'},
    {id: 6, name: 'Tavsifi'},
    {id: 2, name: 'Vedio linki'},
    {id: 3, name: 'Vedio davomiyligi'},
    {id: 4, name: 'Foydalanuvchi aktivligi'},
]

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
    {id: 2, name: 'Ferma nomi '},
    {id: 3, name: 'Mashinani ishlamaslik sababi'},
    {id: 4, name: 'Mashinani ishlamay qolgan vaqti'},
    {id: 5, name: 'Mashina tuzilgan vaqt'},
    {id: 5, name: "Mashinani holatini o'zgartirish"},
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