import { useRef } from 'react';
import CetakAktivasi from '../../../../components/cetak/CetakAktivasi';
import useModalStore from '../../../../utils/setup/useModalStore'
import { useKonfirmasiTAMember } from '../../transaksi/aktivasi/hooks/queries'
import { useResetPasswordMember } from '../hooks/queries'
import ReactToPrint from 'react-to-print'

const ConfirmationModalReset = ({ id, type, nama, idMember, aktivasi, masaAktif}) => {
    console.log(id);

    const { mutate: mutateReset, isLoading: loadingAktif } = useResetPasswordMember();
    const { mutate: mutateKonfirmasi, isLoading: loadingKonfirmasi } = useKonfirmasiTAMember();
    const closeModal = useModalStore((state) => state.closeModal);
    const ref = useRef(null);

    const onAktif = () => {
        mutateReset(id, {
            onSuccess: () => {
                closeModal();
            },
        });
    };

     const onKonfirmasi = () => {
        mutateKonfirmasi(id, {
            onSuccess: () => {
                closeModal();
            },
        });
    };
    return (
        <>
            {
                type === "detail" ? <CetakAktivasi  ref={ref}/> : 
                <CetakAktivasi idMember={idMember} namaMember={nama} aktivasi={aktivasi} masaAktif={masaAktif} ref={ref}/>
            }
            <div
                className="relative z-10"
                aria-labelledby="modal-title"
                role="dialog"
                aria-modal="true"
            >
                <div className="fixed inset-0 bg-gray-400 bg-opacity-10 transition-opacity"></div>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-sm transition-all sm:my-8 sm:w-full sm:max-w-lg">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <svg
                                            className="h-6 w-6 text-purple-600"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            aria-hidden="true"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3
                                            className="text-lg font-medium leading-6 text-gray-900"
                                            id="modal-title"
                                        >
                                            {type === 'reset'
                                                    ? 'Reset Password Member'
                                                    : 
                                            type === 'konfirmasi'
                                                    ? 'Konfirmasi Transaksi Aktivasi Member'
                                                    : 
                                            type === 'cetakAktivasi'
                                                    ? 'Cetak Struk Transaksi Aktivasi Member'
                                                    :'-'}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-base text-gray-600">
                                                Yakin ingin{' '}
                                                {type === 'reset'
                                                    ? 'mereset password'
                                                    : 
                                                type === 'konfirmasi'
                                                        ? 'mengonfirmasi transaksi aktivasi'
                                                    : 
                                                type === 'cetakAktivasi'
                                                        ? 'mencetak transaki aktivasi'
                                                    :'-'}
                                                {' '}
                                                member <strong>{nama}</strong>?
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                {
                                    type === 'reset' ?
                                     <button
                                        onClick={onAktif}
                                        disabled={loadingAktif}
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Reset
                                    </button> :  
                                    type === 'konfirmasi' ?
                                     <button
                                        onClick={onKonfirmasi}
                                        disabled={loadingKonfirmasi}
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Konfirmasi
                                    </button> : 
                                    type === 'cetakAktivasi'?
                                    <ReactToPrint
                                        trigger={() => {
                                            return (
                                            <button
                                                type="button"
                                                className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <i class="fa fa-print mr-2" aria-hidden="true"></i>
                                                Print
                                            </button>
                                            );
                                        }}
                                        content={() => ref.current}
                                    /> : null

                                }
                               
                                <button
                                    disabled={loadingAktif || loadingKonfirmasi}
                                    onClick={closeModal}
                                    type="button"
                                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmationModalReset;
