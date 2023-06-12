import React from 'react'
import useAxiosPrivate from './useAxiosPrivate'
import Swal from 'sweetalert2'

const ReportApi = () => {
    const apiPrivate = useAxiosPrivate();

    // ........................... Pendapatan ...............................
    const getPendapatan = async (tahun) => {
        let baseUrl = '/api/laporan/pendapatan/0';
        if (tahun) {
            baseUrl = `/api/laporan/pendapatan/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Pendapatan!", "error");
            return null;
        }
    }

    const getAktivasi = async (tahun) => {
        let baseUrl = '/api/laporan/aktivasi/0';
        if (tahun) {
            baseUrl = `/api/laporan/aktivasi/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Aktivasi!", "error");
            return null;
        }
    }

    const getDeposit = async (tahun) => {
        let baseUrl = '/api/laporan/deposit/0';
        if (tahun) {
            baseUrl = `/api/laporan/deposit/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Deposit!", "error");
            return null;
        }
    }


    const getPendapatanBulanan = async (tahun) => {
        let baseUrl = '/api/laporan/pendapatan/export/0';
        if (tahun) {
            baseUrl = `/api/laporan/pendapatan/export/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Deposit!", "error");
            return null;
        }
    }


    // ........................... Kelas ...............................
    const getKelas = async () => {
        try {
            const res = await apiPrivate.get('/api/kelas/all');
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 202) {
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Kelas!", "error");
            return null;
        }
    };

    const getKelasBulanan = async (bulan, tahun) => {
        let baseUrl = '/api/laporan/kelas/0/0';
        if (tahun) {
            baseUrl = `/api/laporan/kelas/0/${tahun}`;
        }

        if (bulan) {
            baseUrl = `/api/laporan/kelas/${bulan}/0`;
        }

        if(tahun && bulan){
            baseUrl = `/api/laporan/kelas/${bulan}/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Kelas!", "error");
            return null;
        }
    }

    const getRepotKelasBulanan = async (bulan, tahun) => {
        let baseUrl = '/api/export/kelas/0/0';
        if (tahun && !bulan) {
            baseUrl = `/api/export/kelas/0/${tahun}`;
        } else if (!tahun && bulan) {
            baseUrl = `/api/export/kelas/${bulan}/0`;
        } else if(tahun && bulan){
            baseUrl = `/api/export/kelas/${bulan}/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Kelas!", "error");
            return null;
        }
    }

    const getGymBulanan = async (bulan, tahun) => {
        let baseUrl = '/api/laporan/gym/0/0';
        if (tahun) {
            baseUrl = `/api/laporan/gym/0/${tahun}`;
        }

        if (bulan) {
            baseUrl = `/api/laporan/gym/${bulan}/0`;
        }

        if(tahun && bulan){
            baseUrl = `/api/laporan/gym/${bulan}/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Gym!", "error");
            return null;
        }
    }

    const getRepotGymBulanan = async (bulan, tahun) => {
        let baseUrl = '/api/export/gym/0/0';
        if (tahun && !bulan) {
            baseUrl = `/api/export/gym/0/${tahun}`;
        } else if (!tahun && bulan) {
            baseUrl = `/api/export/gym/${bulan}/0`;
        } else if(tahun && bulan){
            baseUrl = `/api/export/gym/${bulan}/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Gym!", "error");
            return null;
        }
    }

    const getKinerjaBulanan = async (bulan, tahun) => {
        let baseUrl = '/api/laporan/kinerja/0/0';
        if (tahun) {
            baseUrl = `/api/laporan/kinerja/0/${tahun}`;
        }

        if (bulan) {
            baseUrl = `/api/laporan/kinerja/${bulan}/0`;
        }

        if(tahun && bulan){
            baseUrl = `/api/laporan/kinerja/${bulan}/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Kinerja!", "error");
            return null;
        }
    }

    const getRepotKinerjaBulanan = async (bulan, tahun) => {
        let baseUrl = '/api/export/kinerja/0/0';
        if (tahun && !bulan) {
            baseUrl = `/api/export/kinerja/0/${tahun}`;
        } else if (!tahun && bulan) {
            baseUrl = `/api/export/kinerja/${bulan}/0`;
        } else if(tahun && bulan){
            baseUrl = `/api/export/kinerja/${bulan}/${tahun}`;
        }

        try {
            const res = await apiPrivate.get(baseUrl);
            if (res.data.status === 200 || res.data.status === 201 || res.data.status === 201) {
                console.log(res.data.data);
                return res.data.data;
            }
        } catch (error) {
            Swal.fire("Gagal!", "Gagal Mengambil Laporan Kinerja!", "error");
            return null;
        }
    }

    return {
        getPendapatan,
        getAktivasi,
        getDeposit,
        getPendapatanBulanan,

        getKelas,

        getKelasBulanan,
        getRepotKelasBulanan,

        getGymBulanan,
        getRepotGymBulanan,

        getKinerjaBulanan,
        getRepotKinerjaBulanan
    };
}

export default ReportApi
