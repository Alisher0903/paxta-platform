import PageTitle from "@/components/custom/Header/PageTitle.tsx";
import {
    Courses, Dashboard, Login, Users, Groups, Notifications, Rate, Module, Task,
    District, UsersEdu, Sectors
} from "@/pages";
import MasterAddReport from "@/pages/master/MasterAddReport";
import MasterMachine from "@/pages/master/masterMachine";

export const routes = [
    // ====================GLOBAL ROUTE===================
    {
        path: '/auth/login',
        element: <>
            <PageTitle title="Login"/>
            <Login/>
        </>
    },
    {
        path: '/super-admin/dashboard',
        element: <>
            <PageTitle title="Super Admin | Dashboard"/>
            <Dashboard/>
        </>
    },
    {
        path: '/super-admin/users',
        element: <>
            <PageTitle title="Super Admin | Users"/>
            <Users/>
        </>
    },
    {
        path: '/super-admin/district',
        element: <>
            <PageTitle title="Super admin | District"/>
            <District/>
        </>
    },
    {
        path: '/super-admin/sector',
        element: <>
            <PageTitle title="Super admin | Sectors"/>
            <Sectors/>
        </>
    },
    {
        path: '/online/notification',
        element: <>
            <PageTitle title="Online platform | Notification"/>
            <Notifications/>
        </>
    },
    {
        path: '/online/course',
        element: <>
            <PageTitle title="Online platform | Courses"/>
            <Courses/>
        </>
    },
    {
        path: '/online/module',
        element: <>
            <PageTitle title="Online platform | Module"/>
            <Module/>
        </>
    },
    {
        path: '/edu/dashboard',
        element: <>
            <PageTitle title="Education | Dashboard"/>
            <Dashboard/>
        </>
    },
    {
        path: '/edu/users',
        element: <>
            <PageTitle title="Education | Users"/>
            <Users/>
        </>
    },
    {
        path: '/edu/group',
        element: <>
            <PageTitle title="Education | Groups"/>
            <Groups/>
        </>
    },
    {
        path: '/edu/notification',
        element: <>
            <PageTitle title="Education | Notification"/>
            <Notifications/>
        </>
    },
    {
        path: '/edu/course',
        element: <>
            <PageTitle title="Education | Courses"/>
            <Courses/>
        </>
    },
    {
        path: '/edu/module',
        element: <>
            <PageTitle title="Education | Module"/>
            <Module/>
        </>
    },
    {
        path: '/edu/rate',
        element: <>
            <PageTitle title="Education | Rate"/>
            <Rate/>
        </>
    },
    {
        path: '/edu/task/:id',
        element: <>
            <PageTitle title="Education | Task"/>
            <Task/>
        </>
    },
    {
        path: '/edu/users-confirm',
        element: <>
            <PageTitle title="Education | Confirm Users"/>
            <UsersEdu/>
        </>
    },
    {
        path: '/user/report',
        element: <>
            <PageTitle title="Hisobotlar"/>
            <MasterAddReport/>
        </>
    },
    // {
    //     path: 'user/course',
    //     element: <>
    //         <PageTitle title="Education | Module"/>
    //         <Task/>
    //     </>
    // },
    {
        path: '/user/machine',
        element: <>
            <PageTitle title="Mashinalar holati"/>
            <MasterMachine/>
        </>
    },
]