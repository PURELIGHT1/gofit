import React, { forwardRef, useMemo } from 'react'
import Table from '../table/Table'
import { useExportGym } from '../table/hooks/queries'
import { formatDate } from '../../utils/Format';

const TabelLaporanGym = forwardRef(({ year, month, cetak }, ref) => {
    const { data } = useExportGym(month, year);
    const columns = useMemo(() => {
      return [
          {
            Header: 'No',
            accessor: 'no',
          },
          {
            Header: 'Tanggal',
            accessor: 'tanggal',
          },
          {
            Header: 'Jumlah Member',
            accessor: 'jlhMember',
          },
        ]
    },[]);
    if(month == 1){
      var month = "Januari"
    } else if(month == 2){
      var month = "Februari"
    } else if(month == 3){
      var month = "Maret"
    } else if(month == 4){
      var month = "April"
    } else if(month == 5){
      var month = "Mei"
    } else if(month == 6){
      var month = "Juni"
    } else if(month == 7){
      var month = "Juli"
    } else if(month == 8){
      var month = "Agustus"
    } else if(month == 9){
      var month = "September"
    } else if(month == 10){
      var month = "Oktober"
    } else if(month == 11){
      var month = "November"
    } else if(month == 12){
      var month = "Desember"
    }
  return (
    
    <>  
    <div className="mx-8" ref={ref}>
        <div>
          <h2 className="text-lg font-semibold">Gofit</h2>
          <h2 className="text-sm">Jl. Centralpark No. 10 Yogyakarta</h2>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold underline">LAPORAN AKTIVITAS GYM BULANAN</h2>
          <h2 className="text-sm underline">Bulan : {month} <span className='ml-10'>Tahun : {year}</span></h2>
        </div>
        <div className="mt-4">
          <h2 className="text-sm">Tanggal Cetak : {cetak}</h2>
        </div>
        <div className="mt-4">
          <Table
            data={data || []}
            columns={columns}
            initialState={{
              pageSize: 12,
            }}
          />
        </div>
    </div>
    </>
  )
});

export default TabelLaporanGym
