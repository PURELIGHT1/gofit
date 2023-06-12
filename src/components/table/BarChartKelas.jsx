import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useKelasPerBulanDalamSatuTahun } from './hooks/queries';

const BarChartKelas = ({ year, month }) => {
    const { data: dataLaporan, isLoading } = useKelasPerBulanDalamSatuTahun(month, year);
    console.log(dataLaporan);
    if (isLoading) return <div>Loading...</div>;
    
    const series = [
        {
            name: 'Peserta',
            data: dataLaporan.jlhPeserta,
        },
        {
            name: 'Libur',
            data: dataLaporan.libur,
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
            categories: dataLaporan.kelas,
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

export default BarChartKelas;
