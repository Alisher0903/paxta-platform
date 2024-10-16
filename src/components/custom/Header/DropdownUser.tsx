import AnimatedShinyText from "@/components/magicui/animated-shiny-text.tsx";
import avatar from '@/assets/images/avatar.png'
import BlurFade from "@/components/magicui/blur-fade.tsx";

const DropdownUser = () => {
    const admin_role = sessionStorage.getItem('admin_roles');

    const roles = (role: string) => {
        if (role === 'ADMIN_EDU') return 'Education admin'
        else if (role === 'ADMIN_QUIZ') return 'Quiz test admin'
        else if (role === 'ADMIN_ONLINE') return 'Online platform admin'
    }
    return (
        <>
            <div className="flex items-center gap-4">
                <span className="hidden xsm:flex flex-col text-right">
                    <span className="text-xl font-semibold text-white">
                        <AnimatedShinyText
                            className={`inline-flex items-center justify-center transition ease-out hover:text-whiten-600 hover:duration-300`}>
                            <span>Sodiqov Alisher</span>
                        </AnimatedShinyText>
                    </span>
                    <span className="text-sm font-normal text-white">
                        <AnimatedShinyText className={`inline-flex items-center justify-center transition ease-out hover:text-whiten-600 hover:duration-300`}>
                            <BlurFade className={`mt-1`}>
                                <span>{admin_role ? roles(admin_role) : 'admin'}</span>
                            </BlurFade>
                        </AnimatedShinyText>
                    </span>
                </span>
                <span className="h-12 w-12 rounded-full bg-slate-200 object-cover overflow-hidden">
                    <img
                        src={avatar}
                        alt="User"
                        className="w-full h-full scale-[1.17]"
                    />
                </span>
            </div>
        </>
    );
};

export default DropdownUser;
