import { forwardRef } from "react";
import { formatDate2, formatMoney2 } from "../../utils/Format";

const CetakAktivasi = forwardRef(({ idMember, namaMember,aktivasi, masaAktif }, ref) => {

  return (
    
    <>  
    <div className="mx-8 my-8" ref={ref}>
        <div className="content-between">
          <h2 className="text-lg font-semibold">Gofit</h2>
          <h2 className="text-lg font-semibold">No Struk</h2>
        </div>
        <div>
          <h2 className="text-sm">Jl. Centralpark No. 10 Yogyakarta</h2>
        </div>
        <div className="mt-4">
          <h2 className="text-lg"> <strong>Member</strong> :{idMember} / {namaMember}</h2>
          <h2 className="text-sm">Aktivasi Tahunan : {formatMoney2(aktivasi)}</h2>
        </div>
        <div className="mt-4">
          <h2 className="text-sm">Masa Aktif Member : {formatDate2(masaAktif)}</h2>
        </div>
    </div>
    </>
  )
});

export default CetakAktivasi;