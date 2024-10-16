import DotPattern from '@/components/magicui/dot-pattern';
import ShinyButton from '@/components/magicui/shiny-button';
import {BorderBeam} from "@/components/magicui/border-beam.tsx";
import Meteors from "@/components/magicui/meteors.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from 'react';
import {formatedNumber, validateText} from "@/helpers/functions/common-functions.tsx";
import {authLogin} from "@/helpers/api.tsx";
import toast from "react-hot-toast";
import {consoleClear} from "@/helpers/functions/toastMessage.tsx";
import {useGlobalRequest} from "@/helpers/functions/restApi-function.tsx";

function Login() {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('+998 ')
    const [password, setPassword] = useState('')
    const {loading, response, globalDataFunc} = useGlobalRequest(
        authLogin,
        'POST',
        {phoneNumber: formatedNumber(phoneNumber), password: validateText(password)}
    );

    useEffect(() => {
        if (response) {
            if (response.role === 'ROLE_ADMIN') {
                sessionStorage.setItem('token', response.token)
                sessionStorage.setItem('admin_roles', response.role)
                toast.success('Tizimga muvaffaqiyatli kirdingiz')
                navigate('/edu/dashboard')
            } else toast.error('Tizimga kirish uchun sizga ruxsat berilmagan')
            consoleClear()
        }
    }, [response]);

    const formatPhoneNumber = (value: string) => {
        const numbers = value.replace(/[^\d]/g, '').slice(3);
        if (!value.startsWith('+998 ')) return '+998 ';
        if (numbers.length >= 10) return phoneNumber;
        let formatted = '+998 ';
        numbers.split('').forEach((digit, index) => {
            if (index === 2 || index === 5 || index === 7) formatted += `-${digit}`;
            else formatted += digit;
        });
        return formatted;
    };

    const handlePhoneNumberChange = (event: any) => {
        const formatted = formatPhoneNumber(event.target.value);
        setPhoneNumber(formatted);
    };

    const handleSubmit = () => {
        if (validateText(password) && formatedNumber(phoneNumber)) {
            if (!loading) globalDataFunc()
        } else toast.error('Ma\'lumotlar tuliqligini tekshiring')
    }

    return (
        <>
            <DotPattern/>
            <section className="bg-gray-50 flex justify-center items-center z-20 relative">
                <div
                    className="absolute top-30 sm:px-6 py-8 mx-auto lg:py-0 xl:w-1/3 lg:w-[40%] md:w-1/2 sm:w-[70%] xsm:w-[70%] w-full">
                    <div
                        className="w-full backdrop-blur-sm rounded-2xl border border-[#087E43] dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden">
                        <BorderBeam
                            size={500}
                            duration={10}
                            delay={2}
                            borderWidth={2}
                            colorFrom={`#ffaa40`}
                            colorTo={`#b36efd`}
                        />
                        <Meteors number={50}/>
                        <div className="p-2 space-y-4 md:space-y-6 sm:p-8 relative z-999">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Hisobingizga kiring
                            </h1>
                            <div className="space-y-4 md:space-y-6">
                                <div>
                                    <p className="block mb-2 text-sm font-medium text-gray-900">Telefon raqam</p>
                                    <input
                                        type="tel"
                                        value={phoneNumber}
                                        onChange={handlePhoneNumberChange}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') handleSubmit()
                                        }}
                                        className="bg-white border border-[#087E43] text-gray-900 rounded-lg focus:ring-[#087E43] focus:border-[#087E43] block w-full p-2.5"
                                        placeholder="Telefon raqamingizmi kiriting..."
                                    />
                                </div>
                                <div className='mb-5'>
                                    <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parol</p>
                                    <input
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === 'Enter') handleSubmit()
                                        }}
                                        placeholder="Parolni kiriting..."
                                        className="bg-white border border-[#087E43] text-gray-900 rounded-lg focus:ring-[#087E43] focus:border-[#087E43] block w-full p-2.5"
                                    />
                                </div>
                                <ShinyButton
                                    text={loading ? 'Yuklanmoqda...' : 'Tizimga kirish'}
                                    className={`bg-lighterGreen w-full ${loading && 'cursor-not-allowed opacity-50'}`}
                                    onClick={() => handleSubmit()}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
