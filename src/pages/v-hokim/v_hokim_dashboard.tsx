import CardDataStats from '@/components/custom/cards/statistic-card'
import { Card } from '@/components/ui/card-hover-effect'
import { statistic_H_page } from '@/helpers/api'
import { useGlobalRequest } from '@/helpers/functions/restApi-function'
import { Button, Input, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import { FaCottonBureau, FaTractor } from 'react-icons/fa6'
import { useNavigate } from 'react-router-dom'

export default function V_hokim_dashboard() {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [active, setActive] = useState<string>('active')
    const { error, globalDataFunc, response, loading } = useGlobalRequest(
        `${statistic_H_page}${active}?date=${selectedDate}`,
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
            <h1 className={active === 'active' ? 'text-lg mb-2 select-none text-[#6A9C89]' : 'text-lg mb-2 select-none text-[#9a1e1e]'}>Statistika uchun sanani tanlang:</h1>
            <div className="flex justify-between select-none">
                <Input
                    className={'custom-input w-[200px]'}
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                />

                <div className={active === 'active' ? "flex gap-5 border-2 px-2 rounded-md border-[#6A9C89]" : "flex gap-5 border-2 px-2 rounded-md border-[#9a1e1eb7]"} >
                    <div
                        onClick={() => setActive('active')}
                        className={active === 'active' ? 'text-[#6A9C89]  cursor-pointer select-none underline' : 'text-[#6A9C89]  cursor-pointer select-none'}
                    >
                        Ishlayotgan
                    </div>
                    /
                    <div
                        onClick={() => setActive('deActive')}
                        className={active === 'deActive' ? 'text-[#9a1e1e] cursor-pointer select-none underline' : 'text-[#9a1e1e]  cursor-pointer select-none'}
                    >
                        Ishlamayotgan
                    </div>
                </div>
            </div>

            <div className=" w-full flex justify-center py-16">
                <h1 className=' lg:text-2xl font-semibold uppercase align-middle'>
                    barcha tumanlarning
                    <span className='font-semibold mr-1'>
                        ({response && response?.body?.length || '0'})
                    </span>
                    {active === 'active' ?
                        <span className='text-[#6A9C89] mx-1'>ishlayotgan</span>
                        : (
                            <span className='text-[#9a1e1e] mx-1'>
                                ishlamayotgan
                            </span>
                        )}
                    {active === 'active' ? 'mashinalari va terilgan paxta' : 'mashinalari'}
                </h1>
            </div>
            {loading ? (
                <div className="flex justify-center items-center">
                    <Spin tip="Yuklanmoqda..." />
                </div>
            ) : (
                <div className="flex flex-wrap justify-between gap-10 ">
                    {response && response?.body?.length > 0 ? (
                        response?.body.map((item: {
                            districtId: number,
                            districtName: string,
                            cambayCount: number,
                            cottonCount: number | null,
                        }) => (
                            <div className='shadow-3 rounded-3xl' key={item.districtId}
                                onClick={() => navigate(`/v-hokim/getOne/${item.districtId}`)} >
                                <Card
                                    className={active === 'active' ? 'md:w-[400px] text-[#fff] bg-[#6A9C89] hover:bg-[#6A9C89cf] cursor-pointer' : 'w-[400px] bg-[#ffeaea] hover:bg-[#fffafa] cursor-pointer'}
                                >
                                    <div className='text-2xl font-semibold py-3 pb-10'>{item.districtName}</div>
                                    <div className='flex justify-between uppercase border-b'>
                                        <div className='flex gap-2 '>
                                            <FaTractor size={20} color='red' />ishlayotgan Mashinalar soni
                                        </div>
                                        <div>
                                            {item.cambayCount}
                                        </div>
                                    </div>
                                    <div className='flex pt-5 mb-8 justify-between border-b uppercase'>
                                        <div className='flex gap-2'>
                                            <FaCottonBureau size={20} color='green' /> Terilgan paxta
                                        </div>
                                        <div>
                                            {item.cottonCount}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        ))
                    ) : (
                        <div>{error || 'Tumanlar mavjud emas'}</div>
                    )}
                </div>
            )}
        </div>
    )
}
