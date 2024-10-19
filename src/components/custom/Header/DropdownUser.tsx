import AnimatedShinyText from "@/components/magicui/animated-shiny-text.tsx";
import avatar from '@/assets/images/avatar.png'
import BlurFade from "@/components/magicui/blur-fade.tsx";
import globalStore from "@/helpers/state-management/globalStore.tsx";

const DropdownUser = () => {
    const admin_role = sessionStorage.getItem('admin_roles');
    const {meData} = globalStore()

    const roles = (role: string | null) => {
        if (role === 'ROLE_MASTER') return 'operator'
        else if (role === 'ROLE_ADMIN') return 'Super admin'
        else if (role === 'ROLE_THOKIM') return 'Tuman hokimi'
        else if (role === 'ROLE_VHOKIM') return 'Viloyat hokimi'
        else if (role === 'ROLE_SECTOR') return 'Sector raxbari'
    }

    return (
        <>
            <div className="flex items-center gap-4">
                <span className="hidden xsm:flex flex-col text-right">
                    <span className="text-xl font-semibold text-white">
                        <AnimatedShinyText
                            className={`inline-flex items-center justify-center transition ease-out hover:text-whiten-600 hover:duration-300`}>
                            <span>{meData?.firstName} {meData?.lastName} {!meData && `${roles(admin_role)}`}</span>
                        </AnimatedShinyText>
                    </span>
                    <span className="text-sm font-normal text-white">
                        <AnimatedShinyText
                            className={`inline-flex items-center justify-center transition ease-out hover:text-whiten-600 hover:duration-300`}>
                            <BlurFade className={`mt-1`}>
                                <span>{meData?.phoneNumber} {!meData && `${roles(admin_role)}`}</span>
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
