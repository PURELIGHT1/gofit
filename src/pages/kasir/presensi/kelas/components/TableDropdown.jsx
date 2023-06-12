import useOnClickOutside from '../../../../../common/useOnClickOutside'
import React from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import ModalContainer from '../../../../../components/ModalContainer'
import useModalStore from '../../../../../utils/setup/useModalStore'

const TableDropdown = ({ id, status, nama }) => {
    const openModal = useModalStore((state) => state.openModal);
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
                    {status === 'E' && (
                        <div className="table-dropdown-menu">
                            <div
                                className="flex items-center gap-2"
                                // onClick={() =>
                                //     openModal(
                                //         <ConfirmationModalAction
                                //             type="konfirmasi"
                                //             nama={nama}
                                //             id={id}
                                //         />
                                //     )
                                // }
                            >
                                {/* <AiOutlineCloseCircle size={24} color="red" /> */}
                                <FiCheck size={24} color="red" />
                                <span className="text-red-600">Cetak Struk</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TableDropdown;
