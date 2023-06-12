import useAxiosPrivate from './useAxiosPrivate'
import {toast} from 'react-hot-toast'
import Swal from 'sweetalert2'
import useAuthStore from './setup/useAuthStore';

const useMasterApi = () => {
    const apiPrivate = useAxiosPrivate();
    const user = useAuthStore((state) => state.user);

    const getInstruktur = async () => {
        try {
            const res = await apiPrivate.get('/api/instrukturs');
            // if (res.data.status === 200 || res.data.status === 201) {
                
                return res.data.data;
            // }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Instruktur!", "error");
            return null;
        }
    };

    const deleteInstruktur = async (id) => {
        const params = new URLSearchParams({ id: id });
        try {
            const res = await apiPrivate.delete('/api/instrukturs/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menghapus Instruktur!", "error");
            return null;
        }
    };

     const aktifInstruktur = async (id) => {
        const params = new URLSearchParams({ id: id });
        try {
            const res = await apiPrivate.put('/api/instrukturs/aktif/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengaktifkan Instruktur!", "error");
            return null;
        }
    };
    
    const getInstrukturById = async ({ queryKey }) => {
        const id = queryKey[1];

        try {
            const res = await apiPrivate.get('/api/instrukturs/' +  id);

            // if (res.data.status === 200 || res.data.status === 201) {
                
                return res.data.data;
            // }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Instruktur!", "error");
            return null;
        }
    };

    const postInstruktur = async (data) => {
        const params = new URLSearchParams(data);
        console.log(JSON.stringify(data));
        try {
            const res = await apiPrivate.post('/api/instrukturs', JSON.stringify(data)
            );
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menambah Instruktur!", "error");
            return null;
        }
    };

    const putInstruktur = async (data) => {
        console.log(data);
        try {
            const res = await apiPrivate.put('/api/instrukturs/' +  data.id, JSON.stringify(data));
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengubah Instruktur!", "error");
            return null;
        }
    };

    //........................... member .......................
    const getMember = async () => {
        try {
            const res = await apiPrivate.get('/api/members');
            if (res.data.status === 200 || res.data.status === 201) {
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Member!", "error");
            return null;
        }
    };

    const deleteMember= async (id) => {
        const params = new URLSearchParams({ id: id });
        try {
            const res = await apiPrivate.delete('/api/members/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menghapus Member!", "error");
            return null;
        }
    };

    const aktifMember = async (id) => {
        const params = new URLSearchParams({ id: id });
        try {
            const res = await apiPrivate.put('/api/members/aktif/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Aktivasi Member!", "error");
            return null;
        }
    };

    const getMemberById = async ({ queryKey }) => {
        const id = queryKey[1];

        try {
            const res = await apiPrivate.get('/api/members/' +  id);

            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Member!", "error");
            return null;
        }
    };

    const postMember= async (data) => {
        console.log(user.id);
        try {
            const res = await apiPrivate.post('/api/members',
            {
                nama: data.nama,
                alamat: data.alamat,
                tglLahir: data.tglLahir,
                status: data.status,
                email:data.email,
                noHp: data.noHp,
                creator : user.pegawai.id,
            }
            );
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menambah Member!", "error");
            return null;
        }
    };

    const putMember= async (data) => {
        try {
            const res = await apiPrivate.put('/api/members/' +  data.id, 
            {
                nama: data.nama,
                alamat: data.alamat,
                tglLahir: data.tglLahir,
                email:data.email,
                noHp: data.noHp,
                modifier : user.pegawai.id,
            });
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengubah Member!", "error");
            return null;
        }
    };

     const resetPasswordMember= async (id) => {
        const params = new URLSearchParams({ id: id });
        try {
            const res = await apiPrivate.put('/api/members/resetPassword/' +  id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mereset Password Member!", "error");
            return null;
        }
    };

    //........................... Jadwal Umum .......................
    const getJadwalUmum = async () => {
        try {
            const res = await apiPrivate.get('/api/jadwal_umum');
            if (res.data.status === 200 || res.data.status === 201) {
                
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Jadwal Umum!", "error");
            return null;
        }
    };

    const postJadwalUmum = async (data) => {
        console.log(JSON.stringify(data));
        try {
            const res = await apiPrivate.post('/api/jadwal_umum', JSON.stringify(data));
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const putJadwalUmum = async (data) => {
        try {
            const res = await apiPrivate.put('/api/jadwal_umum/' +  data.id, JSON.stringify(data));
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    };

    const getJadwalUmumById = async ({ queryKey }) => {
        const id = queryKey[1];

        try {
            const res = await apiPrivate.get('/api/jadwal_umum/' +  id);

            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Jadwal Umum!", "error");
            return null;
        }
    };

    const deleteJadwalUmum = async (id) => {
        const params = new URLSearchParams({ id: id });
        try {
            const res = await apiPrivate.delete('/api/jadwal_umum/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menghapus Jadwal Umum!", "error");
            return null;
        }
    };
    

     //........................... Jadwal Harian .......................
      const getJadwalHarian = async () => {
        try {
            const res = await apiPrivate.get('/api/jadwal_harian/find_weak');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Jadwal Umum!", "error");
            return null;
        }
    };

    const postJadwalHarian = async () => {
        try {
            const res = await apiPrivate.post('/api/jadwal_harian/generate');
            // if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            // }
        } catch (error) {
            throw error;
        }
    };

    const putLiburJadwal = async (id) => {
        try {
            const res = await apiPrivate.put('/api/jadwal_harian/libur/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            throw error;
        }
    };
    

    //........................... Generate .......................
    const getBookingGym = async () => {
        try {
            const res = await apiPrivate.get('/api/booking_gym/today');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Booking Gym!", "error");
            return null;
        }
    };
    const getInstrukturAktif = async () => {
        try {
            const res = await apiPrivate.get('/api/instrukturs/aktif');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Instruktur!", "error");
            // toast.error(error.response.data.message);
            return null;
        }
    };

    const getKelasTersedia = async () => {
        try {
            const res = await apiPrivate.get('/api/kelas/aktif');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Kelas!", "error");
            // toast.error(error.response.data.message);
            return null;
        }
    };
    
    const getMemberAktif = async () => {
        try {
            const res = await apiPrivate.get('/api/members/aktif');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Member!", "error");
            // toast.error(error.response.data.message);
            return null;
        }
    };
    

    //........................... Transaksi Aktivasi .......................
    const getAktivasi = async () => {
        try {
            const res = await apiPrivate.get('/api/aktivasi_tahunan');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Transaksi Aktivasi!", "error");
            return null;
        }
    };
    
     const postAktivasi = async (data) => {
        console.log(data);
       try {
            const res = await apiPrivate.post('/api/aktivasi_tahunan', {
                pegawai: user.pegawai.id,
                member: data.member,
            });
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menambah Transaksi Aktivasi!", "error");
            return null;
            // throw error;
        }
    };
    
    const putAktivasi = async (id) => {
        try {
            const res = await apiPrivate.put('/api/aktivasi_tahunan/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengubah Transaksi Aktivasi!", "error");
            return null;
        }
    };


    //........................... Deposit Uang .......................
    const getDepositUang = async () => {
        try {
            const res = await apiPrivate.get('/api/deposit_uang');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Deposit Uang!", "error");
            return null;
        }
    };
    
    const postDepositUang = async (data) => {
        console.log(data);
       try {
            const res = await apiPrivate.post('/api/deposit_uang', {
                pegawai: user.pegawai.id,
                member: data.member,
                jlhDeposit: data.jlhDeposit,
            });
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menambah Deposit Uang!", "error");
            return null;
            // throw error;
        }
    };

    //........................... Deposit Uang .......................
    const getDepositKelas = async () => {
        try {
            const res = await apiPrivate.get('/api/deposit_kelas');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Deposit Kelas!", "error");
            return null;
        }
    };

    const postDepositKelas = async (data) => {
        console.log(data);
       try {
            const res = await apiPrivate.post('/api/deposit_kelas', {
                pegawai: user.pegawai.id,
                totalKelas: data.jumlah,
                member: data.member,
                kelas: data.kelas,
            });
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            } 
        } catch (error) {
            throw error;
        }
    };

    //........................... Ijin Instruktur .......................
    const getIjin = async () => {
        try {
            const res = await apiPrivate.get('/api/ijin_instruktur');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Ijin Instruktur!", "error");
            return null;
        }
    };

    const tolakIjinInstruktur = async (id) => {
        try {
            const res = await apiPrivate.put('/api/ijin_instruktur/tolak/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menolak Ijin Instruktur!", "error");
            return null;
        }
    };
    
    const konfirmasiIjinInstruktur = async (id) => {
        try {
            const res = await apiPrivate.put('/api/ijin_instruktur/' + id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Menolak Ijin Instruktur!", "error");
            return null;
        }
    };


    //........................... Presensi Gym .......................
    const useGetPresensiGym = async () => {
        try {
            const res = await apiPrivate.get('/api/presensi_gym');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Presensi Gym!", "error");
            return null;
        }
    };

    const usePostPresensi = async (data) => {
        try {
            const res = await apiPrivate.post('/api/presensi_gym', {
                booking: data.booking,
                pegawai: user.pegawai.id,
            });
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            } 
        } catch (error) {
            throw error;
        }
    };

    const usePutPresensi = async (id) => {
        try {
            const res = await apiPrivate.put('/api/presensi_gym/'+id);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data;
            } 
        } catch (error) {
            throw error;
        }
    };

    //........................... Presensi Gym .......................
    const useGetPresensiKelas = async () => {
        try {
            const res = await apiPrivate.get('/api/presensi_kelas');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Presensi Gym!", "error");
            return null;
        }
    };

    return {
        getInstruktur,
        deleteInstruktur,
        aktifInstruktur,
        getInstrukturById,
        postInstruktur,
        putInstruktur,

        getMember,
        deleteMember,
        aktifMember,
        getMemberById,
        postMember,
        putMember,
        resetPasswordMember,

        getJadwalUmum,
        postJadwalUmum,
        putJadwalUmum,
        getJadwalUmumById,
        deleteJadwalUmum,
        

        getJadwalHarian,
        postJadwalHarian,
        putLiburJadwal,

        getAktivasi,
        postAktivasi,
        putAktivasi,

        getDepositUang,
        postDepositUang,

        getDepositKelas,
        postDepositKelas,

        getIjin,
        tolakIjinInstruktur,
        konfirmasiIjinInstruktur,

        useGetPresensiGym,
        usePostPresensi,
        usePutPresensi,

        useGetPresensiKelas,

        getBookingGym,
        getInstrukturAktif,
        getKelasTersedia,
        getMemberAktif,
        
    };
};

export default useMasterApi;
