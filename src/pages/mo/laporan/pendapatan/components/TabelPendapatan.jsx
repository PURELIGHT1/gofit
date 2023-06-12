import React, { forwardRef, useEffect, useMemo, useState } from 'react'
import Table from '../../../../../components/table/Table'
import { formatMoney2 } from '../../../../../utils/Format';
import { usePendapatanBulanan } from '../../../../../components/table/hooks/queries';

// const TabelPendapatan = ({tahun}) => {
const TabelPendapatan = forwardRef(({ tahun, cetak }, ref) => {

    const { data, isLoading } = usePendapatanBulanan(tahun);
    const totalPendapatan = useMemo(() => {
        if (isLoading) return 0;
        return data.reduce((acc, item) => acc + +item.aktivasi +item.deposit, 0);
    }, [data]);

    // const current = new Date();
    // console.log(current);

    const columns = useMemo(
        () => [
            {
                Header: 'No',
                accessor: 'no',
            },
            {
                Header: 'Bulan',
                accessor: 'bulan',
            },
            {
                Header: 'Aktivasi',
                accessor: 'aktivasi',
                Cell: ({ row }) => {
                  const aktivasi = row.original.aktivasi;
                  return (
                      <span>
                        {formatMoney2(aktivasi)}
                      </span>
                  )
                }
            },
            {
                Header: 'Deposit',
                accessor: 'deposit',
                Cell: ({ row }) => {
                  const deposit = row.original.deposit;
                  return (
                      <span>
                        {formatMoney2(deposit)}
                      </span>
                  )
                }
            },
            {
                Header: 'Total',
                accessor: 'total',
                Cell: ({ row }) => {
                  const aktivasi = row.original.aktivasi;
                  const deposit = row.original.deposit;
                  return (
                      <span>
                        {formatMoney2(aktivasi+deposit)}
                      </span>
                  )
                }
            },
        ],
        []
    );

  return (
    
    <>  
    <div className="mx-8" ref={ref}>
        <div>
          <h2 className="text-lg font-semibold">Gofit</h2>
          <h2 className="text-sm">Jl. Centralpark No. 10 Yogyakarta</h2>
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold underline"> LAPORAN PENDAPATAN BULANAN</h2>
          <h2 className="text-sm">PERIODE : {tahun}</h2>
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
        <div className="flex items-center mt-8 gap-8">
          <div className="px-4 py-2 bg-white shadow-sm border rounded">
            <h6 className="font-medium text-blue-700 text-sm">
              Total Pendapatan
            </h6>
            <p className="font-semibold text-xl tracking-widest">
              {formatMoney2(totalPendapatan)}
            </p>
          </div>
        </div>
    </div>
    </>
  )
});

export default TabelPendapatan
