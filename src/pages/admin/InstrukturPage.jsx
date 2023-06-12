import React, { useMemo } from 'react'
import Table, { SelectColumnFilter } from '../../components/table/Table'
import Spinner from '../../components/Spinner'
import { useInstrukturs } from './hooks/queries'
import { useNavigate } from 'react-router-dom'
import useModalStore from '../../utils/setup/useModalStore'
import ModalContainer from '../../components/ModalContainer'
import Button from '../../components/Button2'
import useAuthStore from '../../utils/setup/useAuthStore'
import TableDropdown from './components/TableDropdown'
import { formatDate } from '../../utils/Format'

const InstrukturPage = () => {
  const { data, isLoading } = useInstrukturs();
  // const { handleExport } = useExportPelanggan();
  const navigate = useNavigate();
  const openModal = useModalStore((state) => state.openModal);

  const columns = useMemo(() => {
        return [
            {
                Header: 'No',
                accessor: 'no',
            },
            {
                Header: 'Nama',
                accessor: 'nama',
            },
            {
                Header: 'Alamat',
                accessor: 'alamat',
            },
            {
                Header: 'Tanggal Lahir',
                accessor: 'tglLahir',
                Cell: ({ row }) => {
                  const tgl = row.original.tglLahir;
                  return (
                      <span>
                        {formatDate(tgl)}
                      </span>
                  )
                }
            },
            {
                Header: 'No HP',
                accessor: 'noHp',
            },
            {
                Header: 'Status',
                accessor: 'status',
                Filter: SelectColumnFilter,
                filter: 'includes',
                filterOpt: [
                    {
                        value: 'A',
                        label: 'Aktif',
                    },
                    {
                        value: 'I',
                        label: 'Tidak Aktif',
                    },
                ],
                Cell: ({ value, row }) => {
                    const status = row.original.status;
                    return (
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                                value === 'A' && 'bg-green-500 text-white'
                            } ${value === 'I' && 'bg-red-500 text-white'}`}
                        >
                          {
                            status === 'A' ? 'Aktif' :  status === 'I' ? 'Tidak Aktif':null
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
                            nama={row.original.nama}
                        />
                    )
                },
            },
        ];
  }, []);

  
  if (isLoading) return <Spinner full />;
    
  return (
    <>
      {/* <ModalContainer /> */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xl">List Instruktur</h1>
            <div className="space-x-4">
              <Button
                className="bg-green-600"
                // onClick={() => handleExport(data)}
                > Export Instruktur
              </Button>
              <Button 
              onClick={() => navigate('add')}
            >
                Tambah
              </Button>
            </div>
        </div>
      <Table
        data={data || []}
        // data={data}
        columns={columns}/>
    </>
  )
}

export default InstrukturPage
