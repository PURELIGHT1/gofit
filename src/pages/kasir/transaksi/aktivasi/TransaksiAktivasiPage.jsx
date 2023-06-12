import React, { useMemo } from 'react'
import Table, { SelectColumnFilter } from '../../../../components/table/Table'
import Spinner from '../../../../components/Spinner'
import { useAktivasi } from './hooks/queries'
import ModalTambah from './actions/ModalTambah'
import { useNavigate } from 'react-router-dom'
import useModalStore from '../../../../utils/setup/useModalStore'
import ModalContainer from '../../../../components/ModalContainer'
import Button from '../../../../components/Button2'
import { formatDate } from '../../../../utils/Format'
import TableDropdown from './components/TableDropdown'

const TransaksiAktivasiPage = () => {
  const { data, isLoading } = useAktivasi();
  console.log(data);
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
                Header: 'Tanggal Aktivasi',
                accessor: 'tglAktivasi',
                Cell: ({ row }) => {
                  const tgl = row.original.tglAktiviasi;
                  return (
                      <span>
                        {formatDate(tgl)}
                      </span>
                  )
                }
            },
            {
                Header: 'Tanggal Berlaku',
                accessor: 'tglBerlaku',
                Cell: ({ row }) => {
                  const tgl = row.original.tglBerlaku;
                  return (
                      <span>
                        {formatDate(tgl)}
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
            {
                Header: 'Aksi',
                accessor: 'aksi',
                Cell: (props) => {
                    const { row } = props;
                    return (
                        <TableDropdown
                            id={row.original.id}
                            status={row.original.status}
                            nama={row.original.member}
                            idMember={row.original.idMember}
                            aktivasi={row.original.jlhBayar}
                            masaAktif={row.original.tglBerlaku}
                        />
                    )
                },
            },
        ];
  }, []);

  
  if (isLoading) return <Spinner full />;
    
  return (
    <>
      <ModalContainer />
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xl">List Transaksi Aktivasi</h1>
            <div className="space-x-4">
              <Button
                className="bg-green-600"
                // onClick={() => handleExport(data)}
                > Export Aktivasi
              </Button>
                <Button 
                  onClick={() =>
                    openModal(
                      <ModalTambah
                        type={true}
                      />
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

export default TransaksiAktivasiPage
