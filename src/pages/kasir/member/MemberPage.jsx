import React, { useMemo } from 'react'
import Table, { SelectColumnFilter } from '../../../components/table/Table'
import Spinner from '../../../components/Spinner'
import { useMember } from './hooks/queries'
import { useNavigate } from 'react-router-dom'
import useModalStore from '../../../utils/setup/useModalStore'
import ModalContainer from '../../../components/ModalContainer'
import Button from '../../../components/Button2'
import useAuthStore from '../../../utils/setup/useAuthStore'
import TableDropdown from './components/TableDropdown'
import { formatDate, formatMoney2 } from '../../../utils/Format'

const MemberPage = () => {
  const { data, isLoading } = useMember();
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
                Header: 'Sisa Deposit',
                accessor: 'sisaDeposit',
                 Cell: ({ row }) => {
                  const uang = row.original.sisaDeposit;
                  return (
                      <span>
                        {formatMoney2(uang)}
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
                            } ${value === 'I' && 'bg-red-500 text-white'} ${value === 'BLOCK' && 'bg-red-500 text-white'}`}
                        >
                          {
                            status === 'A' ? 'Aktif' :  status === 'I' ? 'Tidak Aktif': 'Terhapus'
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
      <ModalContainer />
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xl">List Member</h1>
            <div className="space-x-4">
              <Button
                className="bg-green-600"
                // onClick={() => handleExport(data)}
                > Export Member
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

export default MemberPage
