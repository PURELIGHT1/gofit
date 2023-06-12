import create from 'zustand'

const useModalStore = create((set) => ({
    isModalOpen: false,
    openModal: (content) => set({ isModalOpen: true, modalContent: content }),
    closeModal: () => set({ isModalOpen: false, modalContent: null }),
    modalContent: null,
    setModalContent: (content) => set({ modalContent: content }),
}));

export default useModalStore;
