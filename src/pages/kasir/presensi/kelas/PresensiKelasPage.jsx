import React, { useMemo } from 'react'
import ModalContainer from '../../../../components/ModalContainer'
import Button from '../../../../components/Button2'
import Table, { SelectColumnFilter } from '../../../../components/table/Table'
import { useNavigate } from 'react-router-dom'
import { usePresensiKelas } from './hooks/queries'
import Spinner from '../../../../components/Spinner'
import useModalStore from '../../../../utils/setup/useModalStore'
import TableDropdown from './components/TableDropdown'

const PresensiKelasPage = () => {
  const { data, isLoading } = usePresensiKelas();
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
                Header: 'Kelas',
                accessor: 'kelas',
            },
            {
                Header: 'Instruktur',
                accessor: 'instruktur',
            },
             {
                Header: 'Tanggal presensi',
                accessor: 'tgl',
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
        <h1 className="font-bold text-xl">List Presensi Kelas</h1>
        <div className="space-x-4">
          </div>
        </div>
      <Table
        data={data || []}
        columns={columns}/>
    </>
  )
}

export default PresensiKelasPage
