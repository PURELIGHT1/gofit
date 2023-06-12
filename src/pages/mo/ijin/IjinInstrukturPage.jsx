import { useNavigate } from "react-router-dom";
import useModalStore from "../../../utils/setup/useModalStore";
import { useIjinInstruktur } from './hooks/queries'
import Table, { SelectColumnFilter } from "../../../components/table/Table";
import Spinner from "../../../components/Spinner";
import Button from "../../../components/Button2";
import ModalContainer from "../../../components/ModalContainer";
import { useMemo } from "react";
import { formatDate } from "../../../utils/Format";
import TableDropdown from './components/TableDropdown'

const IjinInstrukturPage = () => {
  const { data, isLoading } = useIjinInstruktur();
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
                Header: 'Instruktur',
                accessor: 'instruktur',
            },
            {
                Header: 'Tanggal Buat Ijin',
                accessor: 'tglpresensi',
                Cell: ({ row }) => {
                  const tgl = row.original.tglpresensi;
                  return (
                      <span>
                        {formatDate(tgl)}
                      </span>
                  )
                }
            },
            {
                Header: 'Pengajuan',
                accessor: 'tglJadwal',
                Cell: ({ row }) => {
                  const tgl = row.original.tglJadwal;
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
                        value: 'PE',
                        label: 'Waiting',
                    },
                    {
                        value: 'C',
                        label: 'Confirmed',
                    },
                    {
                        value: 'D',
                        label: 'Rejected',
                    },
                ],
                Cell: ({ value, row }) => {
                    const status = row.original.status;
                    return (
                        <span
                            className={`px-4 py-1 rounded-full text-sm font-medium text-white ${
                                value === 'C' && 'bg-green-500 text-white'
                            } ${value === 'D' && 'bg-red-500 text-white'}
                            ${value === 'PE' && 'bg-yellow-500 text-white'}`}
                        >
                          {
                           status === 'PE' ? 'Waiting' : status === 'C' ? 'Confirmed' :  status === 'D' ? 'Rejected' : null
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
                            nama={row.original.instruktur}
                        />
                    )
                },
            },
        ];
  }, []);

  
  if (data && isLoading) return <Spinner full />;
    
  return (
    <>
      <ModalContainer />
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xl">List Ijin Instruktur</h1>
            <div className="space-x-4">
              <Button
                className="bg-green-600"
                // onClick={() => handleExport(data)}
                > Export
              </Button>
            </div>
        </div>
      <Table
        data={data || []}
        columns={columns}/>
    </>
  )
}

export default IjinInstrukturPage
