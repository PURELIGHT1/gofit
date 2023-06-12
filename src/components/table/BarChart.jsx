import React from 'react';
import ReactApexChart from 'react-apexcharts'
import { usePendapatanPerTahun } from './hooks/queries'
import { formatMoney2 } from '../../utils/Format'

const BarChart = ({ year }) => {
    const { data: dataPendapatan, isLoading: loadingPendapatan } = usePendapatanPerTahun(year);
    if (loadingPendapatan) return <div>Loading...</div>;
    
    const series = [
        {
            name: 'Pendapatan',
            data: dataPendapatan
        },
    ];

    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: false,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Jan','Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yaxis: {
            title: {
                text: 'Total Uang'
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            y: {
                formatter: function formatMoney2(value) {
                    return new Intl.NumberFormat('id-ID', {
                        style: 'currency',
                        currency: 'IDR',
                    }).format(value);
                }
            }
        }
    };

    return (
        <div id="chart">
            <ReactApexChart 
                options={options} 
                series={series} 
                type="bar" 
                height={350} 
            />
        </div>
    );
};

export default BarChart;
