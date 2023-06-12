import useOnClickOutside from '../../../common/useOnClickOutside'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEllipsisV } from 'react-icons/fa'
import { 
    FiCheck, 
    FiEdit3 
} from 'react-icons/fi'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import ModalContainer from '../../../components/ModalContainer'
import useModalStore from '../../../utils/setup/useModalStore'
import ConfirmationModal from './ConfirmationModal'
import ConfirmationModalHapus from './ConfirmationModalHapus'

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
                    {/* <div
                        className="table-dropdown-menu"
                        // onClick={() => navigate(`detail/${id}`)}
                    >
                        <TbListDetails size={24} />
                        <span>Detail</span>
                    </div> */}
                    {status === 'A' && (
                        <div className="table-dropdown-menu">
                            <div
                                className="flex items-center gap-2"
                                onClick={() =>
                                    openModal(
                                        <ConfirmationModal
                                            type="hapus"
                                            nama={nama}
                                            id={id}
                                        />
                                    )
                                }
                            >
                                <AiOutlineCloseCircle size={24} color="red" />
                                <span className="text-red-600">Hapus</span>
                            </div>
                        </div>
                    )}
                    {status === 'A' && (
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
                    )}
                </div>
            </div>
        </>
    );
};

export default TableDropdown;
