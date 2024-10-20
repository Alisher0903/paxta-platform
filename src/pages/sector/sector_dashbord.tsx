import { Card } from '@/components/ui/card-hover-effect'
import { statistic_sectorByDistrict } from '@/helpers/api'
import { useGlobalRequest } from '@/helpers/functions/restApi-function'
import { Input, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { FaCottonBureau, FaTractor } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function Sector_dashboard() {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [active, setActive] = useState<string>('deActive')
    const { globalDataFunc, response, loading } = useGlobalRequest(
        `${statistic_sectorByDistrict}${active === '' ? '' : '/deActive'}?date=${selectedDate}`,
        'GET'
    )
    const navigate = useNavigate()

    useEffect(() => {
        if (selectedDate) {
            globalDataFunc()
        }
    }, [selectedDate, active])

    return (
        <div className='container mx-auto font-semibold'>
            <h1 className={active === '' ? 'text-lg mb-2 select-none text-[#6A9C89]' : 'text-lg mb-2 select-none text-[#9a1e1e]'}>Statistika uchun sanani tanlang:</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 select-none">
                <Input
                    className={'custom-input w-[200px]'}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <div className={active === '' ? "flex justify-between px-10 gap-5 md:border-2 rounded-md border-[#6A9C89]" : "flex justify-between px-10 gap-5 md:border-2 rounded-md border-[#9a1e1eb7]"} >
                    <div
                        onClick={() => setActive('')}
                        className={active === '' ? 'text-[#6A9C89]  cursor-pointer select-none underline' : 'text-[#8f8f8f]  cursor-pointer select-none'}
                    >
                        Ishlayotgan
                    </div>
                    /
                    <div
                        onClick={() => {
                            setActive('deActive')
                        }}
                        className={active === 'deActive' ? 'text-[#9a1e1e] cursor-pointer select-none underline' : 'text-[#8f8f8f]  cursor-pointer select-none'}
                    >
                        Ishlamayotgan
                    </div>
                </div>
            </div>

            <div className=" w-full flex justify-b py-16">
                <h1 className=' lg:text-2xl text-lg font-semibold uppercase align-middle'>
                    barcha sectorga tegishli
                    <span className='font-semibold mr-1'>
                        ({response && response?.body?.length || '0'})
                    </span>
                    {active === '' ?
                        <span className='text-[#6A9C89] mx-1'>ishlayotgan</span>
                        : (
                            <span className='text-[#9a1e1e] mx-1'>
                                ishlamayotgan
                            </span>
                        )}
                    {active === '' ? 'mashinalari va terilgan paxta' : 'mashinalari'}
                </h1>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin tip="Yuklanmoqda..." />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {response && response?.body?.length > 0 ? (
                        response?.body.map((item: {
                            sectorId: number,
                            districtName: string,
                            machineCount: number,
                            sectorNumber: number,
                            cottonSize: number,
                        }) => (
                            <div className='shadow-3 rounded-3xl' key={item.sectorId}
                                onClick={() => navigate(`/sector/getOne/${selectedDate}/${item.sectorNumber}/${active === '' ? 'active' : 'invalid'}/${item.sectorId}`)} >
                                <Card
                                    className={active === '' ? 'w-[100%] text-[#fff] bg-[#6A9C89] hover:bg-[#6A9C89cf] cursor-pointer' : 'w-[100%] bg-[#ffeaea] hover:bg-[#fffafa] cursor-pointer'}
                                >
                                    <div className='text-2xl font-semibold py-3 pb-10'>{item.districtName || 'Sector...'}  {item.sectorNumber || '0'}</div>
                                    <div className='flex justify-between uppercase border-b'>
                                        <div className='flex gap-2 '>
                                            <FaTractor size={20} color={active === '' ? 'white' : '#9a1e1e'} /> Sector raqami
                                        </div>
                                        <div>
                                            {item.sectorNumber || '0'}
                                        </div>
                                    </div>
                                    <div className='flex pt-5  justify-between uppercase border-b'>
                                        <div className='flex gap-2 '>
                                            <FaTractor size={20} color={active === '' ? 'white' : '#9a1e1e'} />ishlayotgan Mashinalar soni
                                        </div>
                                        <div>
                                            {item.sectorNumber || '0'}
                                        </div>
                                    </div>
                                    <div className='flex pt-5 mb-8 justify-between border-b uppercase'>
                                        <div className='flex gap-2'>
                                            <FaCottonBureau size={20} color={active === '' ? 'white' : '#9a1e1e'} /> Terilgan paxta
                                        </div>
                                        <div>
                                            {item.cottonSize || '0'}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div>Tumanlar mavjud emas</div>
                    )}
                </div>
            )}
        </div>
    )
}
