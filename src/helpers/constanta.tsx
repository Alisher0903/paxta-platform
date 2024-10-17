import {LuLayoutDashboard} from "react-icons/lu";
import {PiStudentFill} from "react-icons/pi";
import {MdOutlineCategory} from "react-icons/md";
import {SiCoursera, SiTestcafe} from "react-icons/si";
import {IoNotifications} from "react-icons/io5";
import {IThead} from "@/components/custom/tables/table.tsx";
import {VscFileSubmodule} from "react-icons/vsc";
import {FaCompress} from "react-icons/fa6";

// ===============SIDEBAR DATA================
export const sideData = {
    superAdmin: [
        {title: 'Boshqaruv paneli', icon: <LuLayoutDashboard size={20}/>, path: '/super-admin/dashboard'},
        {title: 'Foydalanuvchilar', icon: <PiStudentFill size={20}/>, path: '/super-admin/users'},
        {title: 'Tumanlar', icon: <MdOutlineCategory size={20}/>, path: '/super-admin/category'},
        {title: 'Mashinalar', icon: <SiTestcafe size={20}/>, path: '/super-admin/test'},
        {title: 'Fermalar', icon: <FaCompress size={20}/>, path: '/super-admin/result'},
        {title: 'Hisobotlar', icon: <IoNotifications size={20}/>, path: '/super-admin/notification'},
        {title: 'Statistika', icon: <IoNotifications size={20}/>, path: '/super-admin/statistics'},
    ],
    user: [
        {title: 'Hisobotlar', icon: <LuLayoutDashboard size={20}/>, path: '/user/report'},
        // {title: 'Hisobot qo\'shish', icon: <SiCoursera size={20}/>, path: '/user/course'},
        {title: 'Mashinalar holati', icon: <VscFileSubmodule size={20}/>, path: '/user/module'},
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

export const userTableHead: IThead[] = [
    {id: 1, name: 'ID'},
    {id: 7, name: 'Rasm'},
    {id: 2, name: 'Ismi'},
    {id: 3, name: 'Familiyasi'},
    {id: 5, name: 'Telefon raqami'},
    {id: 7, name: 'Roli'},
    {id: 6, name: 'Xarakat'},
]

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

export const groupThead: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Guruh nomi'},
    {id: 2, name: 'O\'qituvchi'},
    {id: 3, name: 'Ochilgan sanasi'},
    {id: 4, name: 'Activligi'},
    {id: 6, name: 'Harakatlar'},
];

export const rateThead: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Tuliq ismi'},
    {id: 6, name: 'Guruh nomi'},
    {id: 2, name: 'Kurs nomi'},
    {id: 3, name: 'To\'plagan bali'},
    {id: 4, name: 'Reytingi'},
];

export const lessonThead: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Dars nomi'},
    {id: 7, name: 'Yunalish nomi'},
    {id: 8, name: 'Modul nomi'},
    {id: 6, name: 'Tavsifi'},
    {id: 2, name: 'Vedio linki'},
    {id: 3, name: 'Vedio davomiyligi'},
    {id: 4, name: 'Foydalanuvchi aktivligi'},
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
    {id: 7, name: 'Harakat'},
];

export const teacherThead: IThead[] = [
    {id: 5, name: 'ID'},
    {id: 1, name: 'Rasmi'},
    {id: 6, name: 'Ismi'},
    {id: 2, name: 'Familiyasi'},
    {id: 3, name: 'Telefon raqami'},
    {id: 4, name: 'Guruhlari soni'},
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