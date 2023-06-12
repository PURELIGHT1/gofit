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
import ModalTambahEdit from '../ModalTambahEdit'
import useModalStore from '../../../../../utils/setup/useModalStore'
import ModalHapus from './ModalHapus'

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
    
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
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
                                                    // Add the sorting props to control sorting. For this example
                                                    // we can add them into the header props
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
                                            <td className="px-6 py-4 whitespace-nowrap uppercase">
                                                {day}
                                            </td>
                                            {sessions.map((session) => {
                                            const jadwals = data.filter((jadwal) => jadwal.hariJadwal === day && jadwal.sesiJadwal === session);
                                           
                                            if (jadwals.length === 0) {
                                                return <td key={session} className="text-center py-4">-</td>;
                                            } else {
                                                return (
                                                <td key={session}
                                                className="px-6 py-4 ">
                                                    {jadwals.map((jadwal) => (
                                                    <div
                                                        key={jadwal.id} className='box-border h-32 w-fit p-2 border-4 rounded-md bg-gray-400'>
                                                        <div>
                                                             <div className='flex items-center justify-center'>
                                                                <h6>{jadwal.kelas.nama}</h6>
                                                                
                                                            </div>
                                                            <div className='flex mt-2 items-center justify-center'>
                                                                <p>{jadwal.instruktur.inisial}</p>
                                                            </div>
                                                            <div className='flex flex-auto mt-2 items-center justify-center'>
                                                                <p></p>
                                                                <Button 
                                                                    icon="fa fa-pencil-square-o"
                                                                    className="mr-2"
                                                                    onClick={() =>
                                                                        openModal(
                                                                            <ModalTambahEdit
                                                                                id={jadwal.id}
                                                                                isEdit={true}
                                                                            />
                                                                        )
                                                                    }
                                                                    >Edit
                                                                </Button>
                                                                <Button
                                                                    icon="fa fa-trash-o"
                                                                    onClick={() =>
                                                                        openModal(
                                                                            <ModalHapus
                                                                                type="hapus"
                                                                                hari={jadwal.hariJadwal}
                                                                                kelas={jadwal.kelas.nama}
                                                                                ins={jadwal.instruktur.inisial}
                                                                                 id={jadwal.id}
                                                                            />
                                                                        )
                                                                    }
                                                                    >Hapus
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
