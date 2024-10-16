import {LuLayoutDashboard} from "react-icons/lu";
import {PiChalkboardTeacherBold, PiStudentFill} from "react-icons/pi";
import {MdOutlineCategory, MdPlayLesson} from "react-icons/md";
import {SiCoursera, SiTestcafe} from "react-icons/si";
import {FaLayerGroup} from "react-icons/fa";
import {IoNotifications} from "react-icons/io5";
import {IThead} from "@/components/custom/tables/table.tsx";
import {TbHeartRateMonitor} from "react-icons/tb";
import {VscFileSubmodule} from "react-icons/vsc";
import {FaCompress} from "react-icons/fa6";

// ===============SIDEBAR DATA================
export const sideData = {
    quizData: [
        {title: 'Boshqaruv paneli', icon: <LuLayoutDashboard size={20}/>, path: '/quiz/dashboard'},
        {title: 'Yo\'nalishlar', icon: <MdOutlineCategory size={20}/>, path: '/quiz/category'},
        {title: 'Test', icon: <SiTestcafe size={20}/>, path: '/quiz/test'},
        {title: 'Foydalanuvchilar', icon: <PiStudentFill size={20}/>, path: '/quiz/users'},
        {title: 'Natijalar', icon: <FaCompress size={20}/>, path: '/quiz/result'},
        {title: 'Bildirishnoma', icon: <IoNotifications size={20}/>, path: '/quiz/notification'},
    ],
    onlineData: [
        {title: 'Boshqaruv paneli', icon: <LuLayoutDashboard size={20}/>, path: '/online/dashboard'},
        {title: 'Kurslar', icon: <SiCoursera size={20}/>, path: '/online/course'},
        {title: 'Module', icon: <VscFileSubmodule size={20}/>, path: '/online/module'},
        {title: 'Darslar', icon: <MdPlayLesson size={20}/>, path: '/online/lesson'},
        {title: 'Test', icon: <SiTestcafe size={20}/>, path: '/online/test'},
        {title: 'Foydalanuvchilar', icon: <PiStudentFill size={20}/>, path: '/online/users'},
        {title: 'Bildirishnoma', icon: <IoNotifications size={20}/>, path: '/online/notification'},
    ],
    eduData: [
        {title: 'Boshqaruv paneli', icon: <LuLayoutDashboard size={20}/>, path: '/edu/dashboard'},
        {title: 'Kurslar', icon: <SiCoursera size={20}/>, path: '/edu/course'},
        {title: 'Module', icon: <VscFileSubmodule size={20}/>, path: '/edu/module'},
        {title: 'Darslar', icon: <MdPlayLesson size={20}/>, path: '/edu/lesson'},
        {title: 'O\'qituvchilar', icon: <PiChalkboardTeacherBold size={20}/>, path: '/edu/teacher'},
        {title: 'Guruhlar', icon: <FaLayerGroup size={20}/>, path: '/edu/group'},
        {title: 'Foydalanuvchilar', icon: <PiStudentFill size={20}/>, path: '/edu/users'},
        {title: 'Tasdiqlanishi kerak bulganlar', icon: <PiStudentFill size={24}/>, path: '/edu/users-confirm'},
        {title: 'Baholar', icon: <TbHeartRateMonitor size={20}/>, path: '/edu/rate'},
        {title: 'Bildirishnoma', icon: <IoNotifications size={20}/>, path: '/edu/notification'},
    ],
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