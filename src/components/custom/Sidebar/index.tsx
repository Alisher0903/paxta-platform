import {useEffect, useRef} from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {IoIosLogOut} from 'react-icons/io';
import ShinyButton from '@/components/magicui/shiny-button';
import logo from '@/assets/images/Sfer 1.png';
import {sideData} from "@/helpers/constanta.tsx";
import BlurFade from "@/components/magicui/blur-fade.tsx";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (arg: boolean) => void;
    toggleModal: () => void;
}

const MenuItem = ({title, to, pathname, icon}: { pathname: string, icon: any, title: string, to: string }) => {
    return (
        <NavLink to={to}>
            <div
                className={`py-3 px-4 my-3 ${pathname === to
                    ? 'bg-darkGreen group relative shadow flex items-center gap-2.5 font-medium text-white duration-300 ease-in-out cursor-pointer border-none rounded-lg'
                    : 'bg-white group relative shadow flex items-center gap-2.5 font-medium text-black duration-300 ease-in-out hover:opacity-80 cursor-pointer border-stroke p-3 rounded-lg'}`
                }
            >
                {icon}
                {title}
            </div>
        </NavLink>
    );
};

const Sidebar = ({sidebarOpen, setSidebarOpen, toggleModal}: SidebarProps) => {
    const location = useLocation();
    const trigger = useRef<any>(null);
    const sidebar = useRef<any>(null);
    const admin_role = sessionStorage.getItem('admin_roles');
    const {superAdmin, user} = sideData

    useEffect(() => {
        const clickHandler = ({target}: MouseEvent) => {
            if (!sidebar.current || !trigger.current) return;
            if (
                !sidebarOpen ||
                sidebar.current.contains(target) ||
                trigger.current.contains(target)
            ) return;
            setSidebarOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    useEffect(() => {
        const keyHandler = ({keyCode}: KeyboardEvent) => {
            if (!sidebarOpen || keyCode !== 27) return;
            setSidebarOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <aside
            ref={sidebar}
            className={`absolute left-0 top-0 z-99 flex h-screen w-72.5 flex-col overflow-y-hidden bg-lighterGreen shadow-4 duration-300 ease-linear lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
            <div className="flex justify-start items-center gap-2 px-6 pb-5.5 lg:pb-6.5">
                <NavLink to="#" className={'hidden lg:inline'}>
                    <img src={logo} alt="Sfera" className='w-46 pt-4 flex justify-center items-center'/>
                </NavLink>
            </div>
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mt-20 py-4 px-4 lg:mt-8 lg:px-6">
                    <div className='flex flex-col'>
                        <ul className="flex flex-col">
                            <li>
                                {admin_role === 'ROLE_ADMIN' && superAdmin.map((side, idx) => (
                                    <BlurFade duration={idx / 10 + .3} delay={idx / 9} key={idx}>
                                        <MenuItem
                                            title={side.title}
                                            icon={side.icon}
                                            pathname={location.pathname}
                                            to={side.path}
                                        />
                                    </BlurFade>
                                ))}
                                {admin_role === 'ROLE_MASTER' && user.map((side, idx) => (
                                    <BlurFade duration={idx / 10 + .3} delay={idx / 9} key={idx}>
                                        <MenuItem
                                            title={side.title}
                                            icon={side.icon}
                                            pathname={location.pathname}
                                            to={side.path}
                                        />
                                    </BlurFade>
                                ))}
                                {admin_role === 'ROLE_SECTOR' && user.map((side, idx) => (
                                    <BlurFade duration={idx / 10 + .3} delay={idx / 9} key={idx}>
                                        <MenuItem
                                            title={side.title}
                                            icon={side.icon}
                                            pathname={location.pathname}
                                            to={side.path}
                                        />
                                    </BlurFade>
                                ))}
                            </li>
                        </ul>
                        <div className={`w-60`}>
                            <ShinyButton
                                onClick={() => toggleModal()}
                                icon={<IoIosLogOut size={25}/>}
                                text='Чиқиш'
                                className='bg-red-500 w-full'
                            />
                        </div>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
