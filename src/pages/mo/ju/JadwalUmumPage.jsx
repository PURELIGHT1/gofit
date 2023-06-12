import React, { useMemo } from 'react'
import ModalContainer from '../../../components/ModalContainer'
import TableJadwal from './actionsJadwalUmum/table/TableJadwal'
import { useJadwal } from './hooks/queries'
import Spinner from '../../../components/Spinner'
import ModalTambahEdit from './actionsJadwalUmum/ModalTambahEdit'
import Button from '../../../components/Button2'
import useModalStore from '../../../utils/setup/useModalStore'

const JadwalUmumPage = () => {
  const openModal = useModalStore((state) => state.openModal);
  const { data, isLoading } = useJadwal();
  
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

  // const dataIns = mutateData.filter((opt) => {
  //       return {
  //           label: opt.inisial,
  //           value: opt.id,
  //       };
  //   }
  // );

  if (data && isLoading) return <Spinner full />;
  return (
    <>
        {/* {
          ins == null
        } */}
        <ModalContainer />
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-bold text-xl">Jadwal Umum</h1>
            <div className="space-x-4">
               <Button 
                  onClick={() =>
                    openModal(
                      <ModalTambahEdit
                      isEdit={false}
                      id={null}/>
                    )
                  }
                >Tambah
              </Button>
            </div>
        </div>
        <TableJadwal
          data={data || []}
          columns={columns}/>
    </>
  )
}

export default JadwalUmumPage