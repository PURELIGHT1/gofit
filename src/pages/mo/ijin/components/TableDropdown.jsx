import React from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { FiCheck } from 'react-icons/fi'
import ModalContainer from '../../../../components/ModalContainer'
import { useNavigate } from 'react-router-dom'
import useModalStore from '../../../../utils/setup/useModalStore'
import useOnClickOutside from '../../../../common/useOnClickOutside'
import ConfimationActionModal from './ConfimationActionModal'


const TableDropdown = ({ id, status, nama }) => {
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
                    {status === 'PE' && (
                        <div className="table-dropdown-menu">
                            <div
                                className="flex items-center gap-2"
                                onClick={() =>
                                    openModal(
                                        <ConfimationActionModal
                                            type="tolak"
                                            nama={nama}
                                            id={id}
                                        />
                                    )
                                }
                            >
                                <AiOutlineCloseCircle size={24} color="red" />
                                <span className="text-red-600">Tolak</span>
                            </div>
                        </div>
                    )}
                    {status === 'PE' && (
                        <div className="table-dropdown-menu">
                            <div
                                className="flex items-center gap-2"
                                onClick={() =>
                                    openModal(
                                        <ConfimationActionModal
                                            type="konfrimasi"
                                            nama={nama}
                                            id={id}
                                        />
                                    )
                                }
                            >
                                 <FiCheck size={24} color="orange" />
                                <span className="text-red-600">Konfirmasi</span>
                            </div>
                        </div>
                    )}
                    {/* {status === 'A' && (
                        <div
                            className="table-dropdown-menu"
                            onClick={() => navigate(`edit/${id}`)}
                        >
                            <FiEdit3 size={24} color="orange" />
                            <span className="text-orange-500">Ubah</span>
                        </div>
                    )}

                    {status === 'I' && (
                        <div className="table-dropdown-menu">
                             <div
                                className="flex items-center gap-2"
                                onClick={() =>
                                    openModal(
                                        <ConfirmationModalHapus
                                            type="aktif"
                                            nama={nama}
                                            id={id}
                                        />
                                    )
                                }
                            >
                                <FiCheck size={24} color="purple" />
                                <span className="text-purple-800">Mengaktifkan</span>
                            </div>
                        </div>
                    )} */}
                </div>
            </div>
        </>
    );
};

export default TableDropdown;
