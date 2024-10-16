import {Link, useNavigate} from 'react-router-dom';

interface BreadcrumbProps {
    pageName: string;
    subPage?: string
}

const Breadcrumb = ({pageName, subPage}: BreadcrumbProps) => {
    const role = sessionStorage.getItem('admin_roles');
    const navigate = useNavigate()

    const roles = (role: string | null) => {
        if (role === 'ADMIN_EDU') return '/edu/dashboard'
        else if (role === 'ADMIN_ONLINE') return '/online/dashboard'
        else if (role === 'ADMIN_QUIZ') return '/quiz/dashboard'
        else return '#'
    }

    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-title-md2 font-semibold text-black dark:text-white">
                {pageName}
            </h2>
            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="font-medium text-darkGreen" to={roles(role)}>
                            Boshqaruv paneli /
                        </Link>
                    </li>
                    <li className="font-medium text-lighterGreen">
                        {subPage ? <span className="font-medium hover:cursor-pointer hover:text-primary text-darkGreen" onClick={() => navigate(-1)}>
                            {pageName} /
                        </span> : pageName}
                    </li>
                    {subPage && <li className="font-normal text-lighterGreen">{subPage}</li>}
                </ol>
            </nav>
        </div>
    );
};

export default Breadcrumb;
