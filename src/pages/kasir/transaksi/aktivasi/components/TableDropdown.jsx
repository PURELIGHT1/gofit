import useOnClickOutside from '../../../../../common/useOnClickOutside'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEllipsisV } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ModalContainer from '../../../../../components/ModalContainer'
import useModalStore from '../../../../../utils/setup/useModalStore'
import ConfirmationModalReset from '../../../member/components/ConfirmationModalReset'

const TableDropdown = ({ id, status, nama, idMember, aktivasi, masaAktif }) => {
    // console.log(nama);
    // console.log(idMember);
    // console.log(aktivasi);
    // console.log(masaAktif);
    const openModal = useModalStore((state) => state.openModal);
    const navigate = useNavigate();
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.useRef(null);
    useOnClickOutside(btnDropdownRef, () => setDropdownPopoverShow(false));

    const openDropdownPopover = () => {
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    return (
        <>
            <ModalContainer />
            <div className="max-w-[52px]">
                <button
                    className="text-gray-500 py-1 px-3"
                    onClick={(e) => {
                        e.preventDefault();
                        dropdownPopoverShow
                            ? closeDropdownPopover()
                            : openDropdownPopover();
                    }}
                >
                    <FaEllipsisV />
                </button>
                <div
                    ref={btnDropdownRef}
                    className={
                        (dropdownPopoverShow ? 'block ' : 'hidden ') +
                        `bg-white text-base absolute list-none text-left rounded shadow-lg min-w-[160px] max-w-[240px] z-50 right-16`
                    }
                >
                    {status === 'W' && (
                        <div className="table-dropdown-menu">
                            <div
                                className="flex items-center gap-2"
                                onClick={() =>
                                    openModal(
                                        <ConfirmationModalReset
                                            type="konfirmasi"
                                            nama={nama}
                                            id={id}
                                        />
                                    )
                                }
                            >
                                {/* <AiOutlineCloseCircle size={24} color="red" /> */}
                                <FiCheck size={24} color="orange" />
                                <span className="text-red-600">Konfirmasi</span>
                            </div>
                        </div>
                    )}
                     {status === 'P' && (
                        <div className="table-dropdown-menu">
                            <div
                                className="flex items-center gap-2"
                                onClick={() =>
                                    openModal(
                                        <ConfirmationModalReset
                                            type="cetakAktivasi"
                                            nama={nama}
                                            id={id}
                                            idMember={idMember}
                                            aktivasi={aktivasi}
                                            masaAktif={masaAktif}
                                        />
                                    )
                                }
                            >
                                {/* <AiOutlineCloseCircle size={24} color="red" /> */}
                                <FiCheck size={24} color="orange" />
                                <span className="text-red-600">Cetak Struck</span>
                            </div>
                        </div>
                    )}
                    
                </div>
            </div>
        </>
    );
};

export default TableDropdown;
