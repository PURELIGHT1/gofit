import React from 'react'
import useModalStore from '../utils/setup/useModalStore'
import { createPortal } from 'react-dom'

const ModalContainer = () => {
    const isModalOpen = useModalStore((state) => state.isModalOpen);
    const modalContent = useModalStore((state) => state.modalContent);

    const modalRoot = document.getElementById('portal-root');

    return createPortal(<>{isModalOpen && modalContent}</>, modalRoot);
};

export default ModalContainer;