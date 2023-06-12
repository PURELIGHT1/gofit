import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { useAktivasiPerTahun, useDepositPerTahun } from './hooks/queries';

const BarChartPendapatan = ({ year }) => {
    const { data: dataAktivasi, isLoading: loadingAktivasi } = useAktivasiPerTahun(year);
    const { data: dataDeposit, isLoading: loadingDeposit } = useDepositPerTahun(year);

    if (loadingDeposit || loadingAktivasi) return <div>Loading...</div>;
    
    const series = [
        {
            name: 'Aktivasi',
            data: dataAktivasi && dataAktivasi.map((item) => (item ? item : 0)),
        },
        {
            name: 'Deposit',
            data: dataDeposit && dataDeposit.map((item) => (item ? item : 0)),
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

export default BarChartPendapatan;
