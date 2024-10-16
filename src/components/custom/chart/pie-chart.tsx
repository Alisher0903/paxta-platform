import React from 'react';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { BorderBeam } from '@/components/magicui/border-beam';
import Meteors from '@/components/magicui/meteors';

interface PieChartProps {
    names: string[];
    values: number[];
    title: string
}

const PieChart: React.FC<PieChartProps> = ({ names, values, title }) => {

    const hasValidData = values.some(value => value > 0);
    const defaultNames = ['Ma\'lumot mavjud emas'];
    const defaultValues = [1];

    const options: ApexOptions = {
        chart: {
            width: 380,
            type: 'donut',
        },
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }],
        legend: {
            position: 'right',
            offsetY: 0,
            height: 230,
        },
        labels: hasValidData ? names : defaultNames,
        colors: hasValidData ? undefined : ['#D3D3D3'],
        states: {
            hover: {
                filter: {
                    type: 'opacity',
                    value: 0.5
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none'
                }
            }
        }
    }

    return (
        <div className='bg-white relative overflow-hidden rounded-xl border-[1px] border-[#000]'>
            <p className='text-2xl p-2'>{title}</p>
            <BorderBeam
                size={500}
                duration={10}
                delay={2}
                borderWidth={2}
                colorFrom={`#ffaa40`}
                colorTo={`#b36efd`}
            />
            <Meteors number={50} />
            <ReactApexChart
                options={options}
                series={hasValidData ? values : defaultValues}
                type="donut"
                width={380}
            />
        </div>
    )
}

export default PieChart;
