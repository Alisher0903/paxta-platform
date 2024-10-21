import PageTitle from "@/components/custom/Header/PageTitle.tsx";
import {Login, Users, Machine, Notifications, Reports, District, Sectors, Farms, Statistics, Cotton, ResponsibleUsers} from "@/pages";
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
import NotificationMaster from "@/pages/master/notification";
import V_hokim_hisobot from "@/pages/v-hokim/v_hokim_hisobot";

export const routes = [
    // ====================GLOBAL ROUTE===================
    {
        path: '/auth/login',
        element: <>
            <PageTitle title="Логин"/>
            <Login/>
        </>
    },
    {
        path: '/super-admin/dashboard',
        element: <>
            <PageTitle title="Супер Админ | Бошқарув панели"/>
            <V_hokim_dashboard/>
        </>
    },
    {
        path: '/super-admin/users',
        element: <>
            <PageTitle title="Супер Админ | Фойдаланувчилар"/>
            <Users/>
        </>
    },
    {
        path: '/super-admin/district',
        element: <>
            <PageTitle title="Супер Админ | Туманлар"/>
            <District/>
        </>
    },
    {
        path: '/super-admin/sector',
        element: <>
            <PageTitle title="Супер Админ | Секторлар"/>
            <Sectors/>
        </>
    },
    {
        path: '/super-admin/machine',
        element: <>
            <PageTitle title="Супер Админ | Машиналар"/>
            <Machine/>
        </>
    },
    {
        path: '/super-admin/farm',
        element: <>
            <PageTitle title="Супер Админ | Фермер хўжалиги"/>
            <Farms/>
        </>
    },
    {
        path: '/super-admin/cotton',
        element: <>
            <PageTitle title="Супер Админ | Терим ҳудудлари"/>
            <Cotton/>
        </>
    },
    {
        path: '/super-admin/report',
        element: <>
            <PageTitle title="Супер Админ | Ҳисоботлар"/>
            <Reports/>
        </>
    },
    {
        path: '/super-admin/statistics',
        element: <>
            <PageTitle title="Супер Админ | Статистикалар"/>
            <Statistics/>
        </>
    },
    {
        path: '/super-admin/notification',
        element: <>
            <PageTitle title="Супер Админ | Билдиришномалар"/>
            <Notifications/>
        </>
    },
    {
        path: '/super-admin/resp-user',
        element: <>
            <PageTitle title="Супер Админ | Масъул ходимлар"/>
            <ResponsibleUsers/>
        </>
    },
    {
        path: '/user/report',
        element: <>
            <PageTitle title="Ҳисоботлар"/>
            <MasterAddReport/>
        </>
    },
    {
        path: 'user/notification',
        element: <>
            <PageTitle title="Билдиришномалар"/>
            <NotificationMaster/>
        </>
    },
    {
        path: '/user/machine',
        element: <>
            <PageTitle title="Машиналар ҳолати"/>
            <MasterMachine/>
        </>
    },
    {
        path: '/v-hokim/dashboard',
        element: <>
            <PageTitle title="Вилоят ҳокими | Бошқарув панели"/>
            <V_hokim_dashboard/>
        </>
    },
    {
        path: '/v-hokim/getOne/:status/:date/:id',
        element: <>
            <PageTitle title="Вилоят ҳокими | Бошқарув панели"/>
            <V_hokim_getOne/>
        </>
    },
    {
        path: '/v-hokim/hisobot/:status/:date/:id',
        element: <>
            <PageTitle title="Вилоят ҳокими | Ҳисобот"/>
            <V_hokim_hisobot/>
        </>
    },
    // ====================T-HOKIM ROUTE===================
    {
        path: '/t-hokim/hisobot/:status/:date/:id',
        element: <>
            <PageTitle title="Туман ҳокими | Ҳисобот"/>
            <T_hokim_hisobot/>
        </>
    },
    {
        path: '/t-hokim/dashboard',
        element: <>
            <PageTitle title="Туман ҳокими | Бошқарув панели"/>
            <T_hokim_dashboard/>
        </>
    },
    {
        path: '/t-hokim/getOne/:status/:date/:id',
        element: <>
            <PageTitle title="Туман ҳокими | Бошқарув панели"/>
            <T_hokim_getOne/>
        </>
    },

    // ====================T-sector ROUTE===================
    {
        path: '/sector/dashboard',
        element: <>
            <PageTitle title="Сектор | Бошқарув панели"/>
            <Sector_dashboard/>
        </>
    },
    {
        path: '/sector/getOne/:selectedDate/:sectorNumber/:status/:sectorId',
        element: <>
            <PageTitle title="Сектор | Бошқарув панели"/>
            <Sector_getOne/>
        </>
    },
    {
        path: '/sector/hisobot/:status/:date/:id',
        element: <>
            <PageTitle title="Сектор | Ҳисобот"/>
            <Sector_hisobot/>
        </>
    },
]
