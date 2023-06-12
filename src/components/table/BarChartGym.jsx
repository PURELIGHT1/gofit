import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useGymPerBulanDalamSatuTahun } from './hooks/queries'
import { formatDate3 } from '../../utils/Format';

const BarChartGym = ({ year, month }) => {
    const { data: dataLaporan, isLoading } = useGymPerBulanDalamSatuTahun(month, year);
    console.log(dataLaporan);
    if (isLoading) return <div>Loading...</div>;
    
    const series = [
        {
            name: 'Member',
            data: dataLaporan.member,
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
            // categories: formatDate3(dataLaporan.tgl),
            categories: dataLaporan.tgl,
        },
        yaxis: {
            title: {
            }
        },
        fill: {
            opacity: 2
        },
        tooltip: {
            y: {
                formatter: function (value) {
                    return value + ' orang';
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

export default BarChartGym;
