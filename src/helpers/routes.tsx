import PageTitle from "@/components/custom/Header/PageTitle.tsx";
import {Login, Users, Machine, Notifications, Reports, District, Sectors, Farms, Statistics, Cotton} from "@/pages";
import MasterAddReport from "@/pages/master/MasterAddReport";
import MasterMachine from "@/pages/master/masterMachine";
import Sector_dashboard from "@/pages/sector/sector_dashbord";
import Sector_getOne from "@/pages/sector/sector_getOne";
import Sector_hisobot from "@/pages/sector/sertor_hisobot";
import T_hokim_getOne from "@/pages/t-hokim/t-hokim_getOne";
import T_hokim_dashboard from "@/pages/t-hokim/t_hokim_dashboard";
import T_hokim_hisobot from "@/pages/t-hokim/t_hokim_hisobot";
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
            <V_hokim_dashboard/>
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
        path: '/super-admin/notification',
        element: <>
            <PageTitle title="Super admin | Notification"/>
            <Notifications/>
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
            <PageTitle title="V-Hokim | Dashboard"/>
            <V_hokim_dashboard/>
        </>
    },
    {
        path: '/v-hokim/getOne/:status/:date/:id',
        element: <>
            <PageTitle title="V-Hokim | Dashboard"/>
            <V_hokim_getOne/>
        </>
    },

    // ====================T-HOKIM ROUTE===================
    {
        path: '/t-hokim/hisobot/:status/:date/:id',
        element: <>
            <PageTitle title="T-Hokim | Hisobot"/>
            <T_hokim_hisobot/>
        </>
    },
    {
        path: '/t-hokim/dashboard',
        element: <>
            <PageTitle title="T-Hokim | Dashboard"/>
            <T_hokim_dashboard/>
        </>
    },
    {
        path: '/t-hokim/getOne/:status/:date/:id',
        element: <>
            <PageTitle title="T-Hokim | Dashboard"/>
            <T_hokim_getOne/>
        </>
    },
    {
        path: '/v-hokim/hisobot/:status/:date/:id',
        element: <>
            <PageTitle title="V-Hokim | Hisobot"/>
            <Sector_hisobot/>
        </>
    },
    // ====================T-sector ROUTE===================
    {
        path: '/sector/dashboard',
        element: <>
            <PageTitle title="Sector | Dashboard"/>
            <Sector_dashboard/>
        </>
    },
    {
        path: '/sector/getOne/:status/:date/:id',
        element: <>
            <PageTitle title="Sector | Dashboard"/>
            <Sector_getOne/>
        </>
    },
    {
        path: '/sector/hisobot/:status/:date/:id',
        element: <>
            <PageTitle title="Sector | Hisobot"/>
            <Sector_hisobot/>
        </>
    },
]
