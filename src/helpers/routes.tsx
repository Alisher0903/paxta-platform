import PageTitle from "@/components/custom/Header/PageTitle.tsx";
import {
    Courses, Dashboard, Login, Users, Machine, Notifications, Rate, Reports, Task,
    District, UsersEdu, Sectors, Farms, Statistics, Cotton
} from "@/pages";
import MasterAddReport from "@/pages/master/MasterAddReport";
import MasterMachine from "@/pages/master/masterMachine";
import V_hokim_getOne from "@/pages/v-hokim/v-hokim_getOne";
import V_hokim_dashboard from "@/pages/v-hokim/v_hokim_dashboard";
import V_hokim_hisobot from "@/pages/v-hokim/v_hokim_hisobot";

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
        path: '/super-admin/machine',
        element: <>
            <PageTitle title="Super admin | Machine"/>
            <Machine/>
        </>
    },
    {
        path: '/super-admin/farm',
        element: <>
            <PageTitle title="Super admin | Fermer xo'jaligi"/>
            <Farms/>
        </>
    },
    {
        path: '/super-admin/cotton',
        element: <>
            <PageTitle title="Super admin | Hududlar"/>
            <Cotton/>
        </>
    },
    {
        path: '/super-admin/report',
        element: <>
            <PageTitle title="Super admin | Reports"/>
            <Reports/>
        </>
    },
    {
        path: '/super-admin/statistics',
        element: <>
            <PageTitle title="Super admin | Statistics"/>
            <Statistics/>
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
            <PageTitle title="Education | Reports"/>
            <Reports/>
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
    //         <PageTitle title="Education | Reports"/>
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
    {
        path: '/v-hokim/dashboard',
        element: <>
            <PageTitle title="V-Hokim | Dashboard" />
            <V_hokim_dashboard />
        </>
    },
    {
        path: '/v-hokim/getOne/:status/:id',
        element: <>
            <PageTitle title="V-Hokim | Dashboard" />
            <V_hokim_getOne />
        </>
    },
    {
        path: '/v-hokim/hisobot/:id',
        element: <>
            <PageTitle title="V-Hokim | Hisobot" />
            <V_hokim_hisobot />
        </>
    },
]
