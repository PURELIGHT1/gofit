import {
    useFilters,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from 'react-table'
import {
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/react/solid'
import { Button, PageButton } from '../../../../../components/table/Button'
import ReactSelect from 'react-select'
import { useMemo } from 'react'
import { formatDate3 } from '../../../../../utils/Format'
import useModalStore from '../../../../../utils/setup/useModalStore'
import ConfirmationModalGenerate from '../ConfimationModalGenerate'

export function SelectColumnFilter({ column }) {
    // Calculate the options for filtering
    // using the preFilteredRows
    const { filterOpt, filterValue, setFilter, preFilteredRows, id, render } =
        column;

    const options = useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach((row) => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    const opt =
        filterOpt ||
        options.map((option, i) => ({
            value: option,
            label: option,
        }));

    // Render a multi-select box
    return (
        <label className="grid grid-cols-12 gap-x-2 items-center mt-4">
            <span className="text-gray-700 text-sm col-span-4">
                {render('Header')}:
            </span>
            <ReactSelect
                className="min-w-[180px] w-full max-w-[320px] col-span-8 rounded-md text-sm border-gray-600 shadow focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                name={id}
                id={id}
                onChange={(e) => {
                    setFilter(e.value || undefined);
                }}
                placeholder="All"
                defaultValue={{
                    value: filterValue ? filterValue : '',
                    label: filterValue ? filterValue : 'All',
                }}
                options={[{ value: '', label: 'All' }, ...opt]}
            />
        </label>
    );
}

function TableJadwal({
    columns,
    data,
    initialState,
    TableHooks = false,
    noSearch = false,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data,
            initialState: initialState,
        },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        TableHooks
    );

    const {globalFilter} = state;
    const senin = new Date();
    const selasa = new Date();
    const rabu = new Date();
    const kamis = new Date();
    const jumat = new Date();
    const sabtu = new Date();
    const minggu = new Date();
    const cek = new Date().getDay();
    if(cek == 1){
      senin.setDate(senin.getDate() + 0);
      selasa.setDate(selasa.getDate() + 1);
      rabu.setDate(rabu.getDate() + 2);
      kamis.setDate(kamis.getDate() + 3);
      jumat.setDate(jumat.getDate() + 4);
      sabtu.setDate(sabtu.getDate() + 5);
      minggu.setDate(minggu.getDate() + 6);
    } else if(cek == 2){
      senin.setDate(senin.getDate() + -1);
      selasa.setDate(selasa.getDate() + 0);
      rabu.setDate(rabu.getDate() + 1);
      kamis.setDate(kamis.getDate() + 2);
      jumat.setDate(jumat.getDate() + 3);
      sabtu.setDate(sabtu.getDate() + 4);
      minggu.setDate(minggu.getDate() + 5);
    } else if(cek == 3){
      senin.setDate(senin.getDate() + -2);
      selasa.setDate(selasa.getDate() + -1);
      rabu.setDate(rabu.getDate() + 0);
      kamis.setDate(kamis.getDate() + 1);
      jumat.setDate(jumat.getDate() + 2);
      sabtu.setDate(sabtu.getDate() + 3);
      minggu.setDate(minggu.getDate() + 4);
    } else if(cek == 4){
      senin.setDate(senin.getDate() + -3);
      selasa.setDate(selasa.getDate() + -2);
      rabu.setDate(rabu.getDate() + -1);
      kamis.setDate(kamis.getDate() + 0);
      jumat.setDate(jumat.getDate() + 1);
      sabtu.setDate(sabtu.getDate() + 2);
      minggu.setDate(minggu.getDate() + 3);
    } else if(cek == 5){
      senin.setDate(senin.getDate() + -4);
      selasa.setDate(selasa.getDate() + -3);
      rabu.setDate(rabu.getDate() + -2);
      kamis.setDate(kamis.getDate() + -1);
      jumat.setDate(jumat.getDate() + 0);
      sabtu.setDate(sabtu.getDate() + 1);
      minggu.setDate(minggu.getDate() + 2);
    } else if(cek == 6){
      senin.setDate(senin.getDate() + -5);
      selasa.setDate(selasa.getDate() + -4);
      rabu.setDate(rabu.getDate() + -3);
      kamis.setDate(kamis.getDate() + -2);
      jumat.setDate(jumat.getDate() + -1);
      sabtu.setDate(sabtu.getDate() + 0);
      minggu.setDate(minggu.getDate() + 1);
    } else if(cek == 7){
      senin.setDate(senin.getDate() + -6);
      selasa.setDate(selasa.getDate() + -5);
      rabu.setDate(rabu.getDate() + -4);
      kamis.setDate(kamis.getDate() + -3);
      jumat.setDate(jumat.getDate() + -2);
      sabtu.setDate(sabtu.getDate() + -1);
      minggu.setDate(minggu.getDate() + 0);
    } 
    
    console.log(jumat);
    const days = [
    // console.log(days);
      //  [hari: "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"]
      {
        hari: "Senin",
        tgl: senin,
      },
       {
        hari: "Selasa",
        tgl: selasa,
      },
       {
        hari: "Rabu",
        tgl: rabu
      },
       {
        hari: "Kamis",
        tgl: kamis
      },
       {
        hari: "Jumat",
        tgl: jumat
      },
       {
        hari: "Sabtu",
        tgl: sabtu
      },
       {
        hari: "Minggu",
        tgl: minggu
      },
    ];
    const sessions = [1, 2, 3, 4];
    const openModal = useModalStore((state) => state.openModal);

    return (
        <>
        {/* <ModalContainer /> */}
            <div className="sm:flex flex-col sm:gap-x-2">
                {!noSearch && (
                    <div className="flex items-center justify-between">
                        {/* <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        /> */}
                        {/* {ExportButton} */}
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-between">
                    {headerGroups.map((headerGroup) =>
                        headerGroup.headers.map((column) => {
                            return column.Filter ? (
                                <div className="mt-2 sm:mt-0" key={column.id}>
                                    {column.render('Filter')}
                                </div>
                            ) : null;
                        })
                    )}
                </div>
            </div>
            {/* table */}
            <div className="mt-4 flex flex-col">
                <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table
                                {...getTableProps()}
                                className="min-w-full divide-y divide-gray-200"
                            >
                                <thead className="bg-gray-50">
                                    {headerGroups.map((headerGroup) => (
                                        <tr
                                            {...headerGroup.getHeaderGroupProps()}
                                        >
                                            {headerGroup.headers
                                                .filter(
                                                    (col) => col.show !== false
                                                )
                                                .map((column) => (
                                                    <th
                                                        scope="col"
                                                        className="group px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                        {...column.getHeaderProps()}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            {column.render(
                                                                'Header'
                                                            )}
                                                        </div>    
                                                    </th>
                                                ))}
                                        </tr>
                                    ))}
                                </thead>

                                <tbody
                                {...getTableBodyProps()}
                                className="bg-white divide-y divide-gray-200">
                                    {days.map((day) => (
                                        <tr key={day} >
                                            <td className="px-6 py-4 uppercase">
                                                <td>{day.hari}<div>{formatDate3(day.tgl)}</div></td>
                                            </td>
                                            {sessions.map((session) => {
                                            const jadwals = data.filter((jadwal) => jadwal.hariJadwal === day.hari && jadwal.sesiJadwal === session);
                                           
                                            if (jadwals.length === 0) {
                                                return <td key={session} className="text-center py-4">-</td>;
                                            } else {
                                                return (
                                                <td key={session}
                                                className="px-6 py-4">
                                                    {jadwals.map((jadwal) => (
                                                    <div
                                                        key={jadwal.id} className='box-border h-32 w-fit p-2 border-4 rounded-md bg-gray-400'>
                                                        <div>
                                                            <div className='flex items-center justify-center'>
                                                                <h6>{jadwal.kelas.nama}</h6>
                                                                
                                                            </div>
                                                            <div className='flex mt-2 items-center justify-center'>
                                                                {
                                                                    jadwal.instruktur == null ? 
                                                                    <p className=' text-white
                                                                    '>(libur)</p>
                                                                    : 
                                                                    <p>{jadwal.instruktur.inisial}</p>
                                                                }
                                                            </div>
                                                            <div className='flex flex-auto mt-2 items-center justify-center'>
                                                                <p></p>
                                                                <Button
                                                                    onClick={() =>
                                                                        openModal(
                                                                            <ConfirmationModalGenerate
                                                                                generate={false}
                                                                                id={jadwal.id}
                                                                                kelas={jadwal.kelas.nama}/>
                                                                        )
                                                                    }
                                                                    icon="fa fa-sign-in space-x-2"
                                                                    className="mr-2"
                                                                    > Libur
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    ))}
                                                    
                                                </td>
                                                );
                                            }
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TableJadwal;
