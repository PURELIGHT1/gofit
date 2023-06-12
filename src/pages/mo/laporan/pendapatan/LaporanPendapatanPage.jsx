import React, { useMemo, useRef, useState } from 'react'
import ReactSelect from 'react-select'
import BarChart from '../../../../components/table/BarChart'
import BarChartPendapatan from '../../../../components/table/BarChartPendapatan'
// import { formatMoney2 } from '../../../../utils/Format'
import { usePendapatanBulanan } from '../../../../components/table/hooks/queries'
// import Table from '../../../../components/table/Table'
import ReactToPrint from 'react-to-print'
import TabelPendapatan from './components/TabelPendapatan'
// import { Button } from '../../../../components/Button'

const LaporanPendapatanPage = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const ref = useRef(null);

    const yearOptions = useMemo(() => {
        const currentYear = new Date().getFullYear();
        const start = 2020;
        const end = currentYear;
        const options = [];
        for (let year = start; year <= end; year++) {
            options.push({
                value: year,
                label: year,
            });
        }
        return options;
    }, []);

  return (
    <>
        <div className="mx-8">
          <h2 className="text-2xl font-bold">Laporan</h2>
          <div className="flex items-center justify-between mt-4 mb-2">
            <h1 className="text-xl font-bold">Grafik Pendapatan</h1>
            <div className="flex space-x-2">
                <ReactToPrint
                  trigger={() => {
                    return (
                       <button
                          type="button"
                          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <i class="fa fa-print mr-2" aria-hidden="true"></i>
                        Export
                      </button>
                    );
                  }}
                  content={() => ref.current}
                />
                <ReactSelect
                  options={yearOptions}
                  className="text-xs"
                  onChange={(e) => {
                    setYear(e.value);
                  }}
                  defaultValue={{ value: year, label: year }}
                />
            </div>
          </div>

          <div className="px-8 py-8 bg-white shadow-sm border-[1px]">
            <BarChartPendapatan year={year} />
          </div>
          <div className="mt-10 mb-2">
            <h1 className="text-xl font-semibold">Tabel Pendapatan</h1>
          </div>
        </div>
        <div className="mx-8 px-8 py-8 bg-white shadow-sm border-[1px]">
           <TabelPendapatan
            tahun={year}
            cetak={
              new Date().toLocaleString('id-ID', 
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }
              )
            }
            ref={ref}
          />
        </div>
       
    </>
  )
}

export default LaporanPendapatanPage
