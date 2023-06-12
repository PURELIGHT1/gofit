import React, { useMemo } from 'react'
import useModalStore from '../../../../utils/setup/useModalStore'
import { formatDate, formatMoney2 } from '../../../../utils/Format'
import Spinner from '../../../../components/Spinner'
import ModalContainer from '../../../../components/ModalContainer'
import Button from '../../../../components/Button2'
import { useDepositUang } from './hooks/queries'
import Table, { SelectColumnFilter } from '../../../../components/table/Table'
import ModalTambah from '../aktivasi/actions/ModalTambah'

const DepositUangPage = () => {
  const { data, isLoading } = useDepositUang();
  const openModal = useModalStore((state) => state.openModal);

  const columns = useMemo(() => {
        return [
            {
                Header: 'No',
                accessor: 'no',
            },
            {
                Header: 'Member',
                accessor: 'member',
            },
            {
                Header: 'Jumlah Deposit',
                accessor: 'jlhDeposit',
                Cell: ({ row }) => {
                  const uang = row.original.jlhDeposit;
                  return (
                      <span>
                        {formatMoney2(uang)}
                      </span>
                  )
                }
            },
            {
                Header: 'Tanggal Deposit',
                accessor: 'tglDeposit',
                Cell: ({ row }) => {
                  const tgl = row.original.tglDeposit;
                  return (
                      <span>
                        {formatDate(tgl)}
                      </span>
                  )
                }
            },
            {
                Header: 'Promo',
                accessor: 'promo',
                Cell: ({ row }) => {
                  const promos = row.original.promo;
                  return (
                     <span
                            className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                                promos === 'Reguler' && 'bg-blue-500 text-white'
                            } ${promos === 'Paket' && 'bg-yellow-500 text-white'}`}
                        >
                        {promos}
                    </span>
                  )
                }
            },
            {
                Header: 'Status',
                accessor: 'status',
                Filter: SelectColumnFilter,
                filter: 'includes',
                filterOpt: [
                    {
                        value: 'W',
                        label: 'Waiting',
                    },
                    {
                        value: 'P',
                        label: 'Paid Off',
                    },
                ],
                Cell: ({ value, row }) => {
                    const status = row.original.status;
                    return (
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                                value === 'P' && 'bg-green-500 text-white'
                            } ${value === 'W' && 'bg-red-500 text-white'} ${value === '-' && 'bg-red-500 text-white'}`}
                        >
                          {
                            status === 'W' ? 'Menunggu Pembayaran' :  status === 'P' ? 'Terbayar': '-'
                          }
                        </span>
                    );
                },
            },
            // {
            //     Header: 'Aksi',
            //     accessor: 'aksi',
            //     Cell: (props) => {
            //         const { row } = props;
            //         return (
            //             <TableDropdown
            //                 id={row.original.id}
            //                 status={row.original.status}
            //                 nama={row.original.member}
            //             />
            //         )
            //     },
            // },
        ];
  }, []);

  
  if (isLoading) return <Spinner full />;
    
  return (
    <>
      <ModalContainer />
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xl">List Deposit Uang</h1>
            <div className="space-x-4">
              <Button
                className="bg-green-600"
                // onClick={() => handleExport(data)}
                > Export Deposit
              </Button>
                <Button 
                  onClick={() =>
                    openModal(
                      <ModalTambah
                      type={false}/>
                    )
                  }
                >Tambah
              </Button >
            </div>
        </div>
      <Table
        data={data || []}
        // data={data}
        columns={columns}/>
    </>
  )
}

export default DepositUangPage
