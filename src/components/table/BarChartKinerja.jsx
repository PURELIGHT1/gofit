import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { useKinerjaInstrukturPerBulanSatuTahun } from './hooks/queries';

const BarChartKinerja = ({ year, month }) => {
    const { data: dataLaporan, isLoading } = useKinerjaInstrukturPerBulanSatuTahun(month, year);
    console.log(dataLaporan);
    if (isLoading) return <div>Loading...</div>;
    
    const series = [
        {
            name: 'Terlambat',
            data: dataLaporan.telat,
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
            categories: dataLaporan.ins,
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
                    return value + ' detik';
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

export default BarChartKinerja;
