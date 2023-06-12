import React, { useMemo } from 'react'
import ModalContainer from '../../../../components/ModalContainer'
import Button from '../../../../components/Button2'
import Table, { SelectColumnFilter } from '../../../../components/table/Table'
import { useNavigate } from 'react-router-dom'
import { usePresensiGym } from './hooks/queries'
import Spinner from '../../../../components/Spinner'
import ModalTambahPresensi from './components/ModalTambahPresensi'
import useModalStore from '../../../../utils/setup/useModalStore'
import TableDropdown from './components/TableDropdown'

const PresensiGymPage = () => {
  const { data, isLoading } = usePresensiGym();
  const navigate = useNavigate();
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
                Header: 'Tanggal Presensi',
                accessor: 'tglpresensi',
            },
            {
                Header: 'Waktu Mulai',
                accessor: 'mulaiGym',
                Cell: ({ value, row }) => {
                    const waktu = row.original.mulaiGym;
                    return (
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                                value <= 4 && 'bg-blue-500 text-white'
                            } ${value >= 5 && 'bg-green-500 text-white'}`}
                        >
                          {
                            waktu == 1 ? '07.00' : waktu == 2 ? '09.00' : waktu == 3 ? '11.00' : waktu == 4 ? '13.00' : 
                            waktu == 5 ? '15.00' : waktu == 6 ? '17.00' : waktu == 7 ? '19.00' : waktu == 8 ? '21.00' : null
                          }
                        </span>
                    );
                },
            },
            {
                Header: 'Waktu Selesai',
                accessor: 'akhirGym',
                Cell: ({ value, row }) => {
                    const waktu = row.original.akhirGym;
                    return (
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                                value <= 4 && 'bg-blue-500 text-white'
                            } ${value >= 5 && 'bg-green-500 text-white'}`}
                        >
                          {
                            waktu == 1 ? '07.00' : waktu == 2 ? '09.00' : waktu == 3 ? '11.00' : waktu == 4 ? '13.00' : 
                            waktu == 5 ? '15.00' : waktu == 6 ? '17.00' : waktu == 7 ? '19.00' : waktu == 8 ? '21.00' : null
                          }
                        </span>
                    );
                },
            },
            {
                Header: 'Status',
                accessor: 'status',
                Filter: SelectColumnFilter,
                filter: 'includes',
                filterOpt: [
                    {
                        value: 'G',
                        label: 'Ongoing',
                    },
                    {
                        value: 'E',
                        label: 'Done',
                    },
                ],
                Cell: ({ value, row }) => {
                    const status = row.original.status;
                    return (
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                                value === 'G' && 'bg-yellow-500 text-white'
                            } ${value === 'E' && 'bg-green-500 text-white'}`}
                        >
                          {
                            status === 'G' ? 'Ongoing' :  status === 'E' ? 'Done': null
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
        <h1 className="font-bold text-xl">List Presensi Gym</h1>
        <div className="space-x-4">
            <Button
              onClick={() =>
                openModal(
                  <ModalTambahPresensi/>
                )
              }
            >
              Tambah
              </Button>
          </div>
        </div>
      <Table
        data={data || []}
        columns={columns}/>
    </>
  )
}

export default PresensiGymPage
