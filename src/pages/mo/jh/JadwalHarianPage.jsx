import React, { useMemo } from 'react'
import ModalContainer from '../../../components/ModalContainer'
import TableJadwal from './actionsJadwalHarian/table/Tablejadwal'
import { useJadwal, useGenerateJadwal } from './hooks/queries'
import Spinner from '../../../components/Spinner'
import ConfirmationModalGenerate from './actionsJadwalHarian/ConfimationModalGenerate'
import useModalStore from '../../../utils/setup/useModalStore'

const JadwalHarianPage = () => {
  
  const Hari = new Date().getDay();
  const openModal = useModalStore((state) => state.openModal);
  const { data, isLoading } = useJadwal();
  console.log(data);
  const columns = useMemo(() => {
    return [
            {
                Header: 'Hari',
                accessor: 'hariJadwal',
            },
            {
                Header: 'Sesi 1(08.00)',
            },
             {
                Header: 'Sesi 2(09.30)',
            },
            {
                Header: 'Sesi 3(17.00)',
            },
            {
                Header: 'Sesi 4(18.30)',
            },
        ];
  }, []);

  if (data && isLoading) return <Spinner full />;
  return (
    <>
    <ModalContainer />
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-bold text-xl">Jadwal Harian</h1>
          <div className="space-x-4">
            {
              Hari === 0 ?
              // data != [] ?
              <button
               onClick={() =>
                    openModal(
                      <ConfirmationModalGenerate
                      generate={true}/>
                    )
                  }
                className="bg-blue-200 px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-700 rounded-full hover:shadow-lg"
              >
                Generate ?
              </button> : null
            }
            
          </div>
      </div>
    
      <TableJadwal
        data={data || []}
        columns={columns}/>
    </>
  )
}

export default JadwalHarianPage