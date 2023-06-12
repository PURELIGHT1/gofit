import React, { useMemo, useRef, useState } from 'react'
import ReactSelect from 'react-select'
import ReactToPrint from 'react-to-print'
import BarChartKinerja from '../../../../components/table/BarChartKinerja';
import TabelLaporanKinerja from '../../../../components/cetak/TabelLaporanKinerja';

const LaporanKinerjaInstrukturPage = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [label, setLabel] = useState('');
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

  const monthOptions = [
    { value: 1, label: 'Jan' },
    { value: 2, label: 'Feb' },
    { value: 3, label: 'Mar' },
    { value: 4, label: 'Apr' },
    { value: 5, label: 'May' },
    { value: 6, label: 'Jun' },
    { value: 7, label: 'Jul' },
    { value: 8, label: 'Aug' },
    { value: 9, label: 'Sep' },
    { value: 10, label: 'Oct' },
    { value: 11, label: 'Nov' },
    { value: 12, label: 'Dec' },
  ];
  return (
    <>
      <div className="mx-8">
        <h2 className="text-2xl font-bold">Laporan</h2>
        <div className="flex items-center justify-between mt-4 mb-2">
          <h1 className="text-xl font-bold">Grafik Kinerja Instruktur</h1>
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
              options={monthOptions}
              className="text-sm"
              onChange={(e) => {
                setMonth(e.value);
              }}
              defaultValue={{ value: month, label: label }}
            />
            <ReactSelect
              options={yearOptions}
              className="text-sm"
              onChange={(e) => {
                setYear(e.value);
              }}
              defaultValue={{ value: year, label: year }}
            />
          </div>
        </div>

        <div className="px-8 py-8 bg-white shadow-sm border-[1px]">
          <BarChartKinerja year={year} month={month} />
        </div>
        <div className="mt-10 mb-2">
          <h1 className="text-xl font-semibold">Tabel Kinerja Instruktur</h1>
        </div>
      </div>
        <div className="mx-8 px-8 py-8 bg-white shadow-sm border-[1px]">
          <TabelLaporanKinerja
            year={year}
            month={month}
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

export default LaporanKinerjaInstrukturPage
