import PageTitle from "@/components/custom/Header/PageTitle.tsx";
import {
    Courses, Dashboard, Login, Users, Notifications, Tests, Rate, Module, CategoryDetails, Lesson, Task,
    Teacher, Result, UsersEdu
} from "@/pages";
import V_hokim_getOne from "@/pages/v-hokim/v-hokim_getOne";
import V_hokim_dashboard from "@/pages/v-hokim/v_hokim_dashboard";

export const routes = [
    // ====================GLOBAL ROUTE===================
    {
        path: '/auth/login',
        element: <>
            <PageTitle title="Login" />
            <Login />
        </>
    },
    {
        path: '/super-admin/dashboard',
        element: <>
            <PageTitle title="Quiz | Dashboard" />
            <Dashboard />
        </>
    },
    {
        path: '/quiz/category',
        element: <>
            <PageTitle title="Quiz | Courses" />
            <Courses />
        </>
    },
    {
        path: '/quiz/category/:id',
        element: <>
            <PageTitle title="Quiz | Courses details" />
            <CategoryDetails />
        </>
    },
    {
        path: '/quiz/test',
        element: <>
            <PageTitle title="Quiz | Test" />
            <Tests />
        </>
    },
    {
        path: '/quiz/users',
        element: <>
            <PageTitle title="Quiz | Users" />
            <Users />
        </>
    },
    {
        path: '/quiz/notification',
        element: <>
            <PageTitle title="Quiz | Notification" />
            <Notifications />
        </>
    },
    {
        path: '/quiz/result',
        element: <>
            <PageTitle title="Quiz | Result" />
            <Result />
        </>
    },
    {
        path: '/online/dashboard',
        element: <>
            <PageTitle title="Online platform | Dashboard" />
            <Dashboard />
        </>
    },
    {
        path: '/online/test',
        element: <>
            <PageTitle title="Online platform | Test" />
            <Tests />
        </>
    },
    {
        path: '/online/users',
        element: <>
            <PageTitle title="Online platform | Users" />
            <Users />
        </>
    },
    {
        path: '/online/notification',
        element: <>
            <PageTitle title="Online platform | Notification" />
            <Notifications />
        </>
    },
    {
        path: '/online/course',
        element: <>
            <PageTitle title="Online platform | Courses" />
            <Courses />
        </>
    },
    {
        path: '/online/module',
        element: <>
            <PageTitle title="Online platform | Module" />
            <Module />
        </>
    },
    {
        path: '/online/lesson',
        element: <>
            <PageTitle title="Online platform | Lesson" />
            <Lesson />
        </>
    },
    {
        path: '/edu/dashboard',
        element: <>
            <PageTitle title="Education | Dashboard" />
            <Dashboard />
        </>
    },
    {
        path: '/edu/users',
        element: <>
            <PageTitle title="Education | Users" />
            <Users />
        </>
    },

    // v-hokim routes
    {
        path: '/v-hokim/dashboard',
        element: <>
            <PageTitle title="V-Hokim | Dashboard" />
            <V_hokim_dashboard />
        </>
    },
    {
        path: '/v-hokim/getOne/:id',
        element: <>
            <PageTitle title="V-Hokim | Dashboard" />
            <V_hokim_getOne />
        </>
    },


    {
        path: '/edu/module',
        element: <>
            <PageTitle title="Education | Module" />
            <Module />
        </>
    },
    {
        path: '/edu/rate',
        element: <>
            <PageTitle title="Education | Rate" />
            <Rate />
        </>
    },
    {
        path: '/edu/lesson',
        element: <>
            <PageTitle title="Education | Lesson" />
            <Lesson />
        </>
    },
    {
        path: '/edu/task/:id',
        element: <>
            <PageTitle title="Education | Task" />
            <Task />
        </>
    },
    {
        path: '/edu/teacher',
        element: <>
            <PageTitle title="Education | Teacher" />
            <Teacher />
        </>
    },
    {
        path: '/edu/users-confirm',
        element: <>
            <PageTitle title="Education | Confirm Users" />
            <UsersEdu />
        </>
    },
    {
        path: '/user/report',
        element: <>
            <PageTitle title="Education | Confirm Users" />
            <UsersEdu />
        </>
    },
    {
        path: 'user/course',
        element: <>
            <PageTitle title="Education | Module" />
            <Task />
        </>
    },
    {
        path: 'user/module',
        element: <>
            <PageTitle title="Education | Module" />
            <Task />
        </>
    },
]