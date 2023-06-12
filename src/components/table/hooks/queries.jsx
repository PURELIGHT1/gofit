import { useQuery } from "@tanstack/react-query"
import ReportApi from "../../../utils/ReportApi"

const queryKeys = {
    kelas: ['kelas'],
    aktivasi: ['aktivasi'],
    deposit: ['deposit'],
    pendapatan: ['pendapatan'],
    pendapatanPerBulan: ['pendapatanPerBulan'],

    kelasPerBulan: ['kelasPerBulan'],
    exportKelasPerBulan: ['exportKelasPerBulan'],

    gymPerBulan: ['gymPerBulan'],
    exportGymPerBulan: ['exportGymPerBulan'],

    kinerjaPerBulan: ['kinerjaPerBulan'],
    exportKinerjaPerBulan: ['exportKinerjaPerBulan'],

    pendapatanBulanan: (tahun) => [...queryKeys.pendapatanPerBulan, tahun],
    pendapatanPerTahun: (tahun) => [...queryKeys.pendapatan, tahun],
    aktivasiPerTahun: (tahun) => [...queryKeys.aktivasi, tahun],
    depositPerTahun: (tahun) => [...queryKeys.deposit, tahun],

    repotKelasBulanan: (bulan, tahun) => [...queryKeys.kelasPerBulan, bulan, tahun],
    exportKelasBulanan: (bulan, tahun) => [...queryKeys.exportKelasPerBulan, bulan, tahun],

    repotGymBulanan: (bulan, tahun) => [...queryKeys.gymPerBulan, bulan, tahun],
    exportGymBulanan: (bulan, tahun) => [...queryKeys.exportGymPerBulan, bulan, tahun],

    repotKinerjaBulanan: (bulan, tahun) => [...queryKeys.kinerjaPerBulan, bulan, tahun],
    exportKinerjaBulanan: (bulan, tahun) => [...queryKeys.exportKinerjaPerBulan, bulan, tahun],
};


export const usePendapatanPerTahun = (tahun) => {
    const { getPendapatan} = ReportApi();
    return useQuery(queryKeys.pendapatanPerTahun(tahun), () => getPendapatan(tahun), {enabled: !!tahun,});
};

export const useAktivasiPerTahun = (tahun) => {
    const { getAktivasi} = ReportApi();
    return useQuery(queryKeys.aktivasiPerTahun(tahun), () => getAktivasi(tahun), {enabled: !!tahun,});
};

export const useDepositPerTahun = (tahun) => {
    const { getDeposit} = ReportApi();
    return useQuery(queryKeys.depositPerTahun(tahun), () => getDeposit(tahun), {enabled: !!tahun,});
};

export const usePendapatanBulanan = (tahun) => {
    const { getPendapatanBulanan} = ReportApi();
    return useQuery(queryKeys.pendapatanBulanan(tahun), () => getPendapatanBulanan(tahun), {enabled: !!tahun,});
};

export const useKelas = () => {
    return useQuery(queryKeys.kelas, ReportApi().getKelas);
};

export const useKelasPerBulanDalamSatuTahun = (bulan, tahun) => {
    const { getKelasBulanan} = ReportApi();
    return useQuery(queryKeys.repotKelasBulanan(bulan, tahun), () => getKelasBulanan(bulan, tahun), {enabledBulan: !!bulan, enabledTahun: !!tahun});
};

export const useExportKelas = (bulan, tahun) => {
    const { getRepotKelasBulanan} = ReportApi();
    return useQuery(queryKeys.exportKelasBulanan(bulan, tahun), () => getRepotKelasBulanan(bulan, tahun), {enabledBulan: !!bulan, enabledTahun: !!tahun});
};

export const useGymPerBulanDalamSatuTahun = (bulan, tahun) => {
    const { getGymBulanan} = ReportApi();
    return useQuery(queryKeys.repotGymBulanan(bulan, tahun), () => getGymBulanan(bulan, tahun), {enabledBulan: !!bulan, enabledTahun: !!tahun});
};

export const useExportGym = (bulan, tahun) => {
    const { getRepotGymBulanan} = ReportApi();
    return useQuery(queryKeys.exportGymBulanan(bulan, tahun), () => getRepotGymBulanan(bulan, tahun), {enabledBulan: !!bulan, enabledTahun: !!tahun});
};

export const useKinerjaInstrukturPerBulanSatuTahun = (bulan, tahun) => {
    const { getKinerjaBulanan} = ReportApi();
    return useQuery(queryKeys.repotKinerjaBulanan(bulan, tahun), () => getKinerjaBulanan(bulan, tahun), {enabledBulan: !!bulan, enabledTahun: !!tahun});
};

export const useExportKinerjaInstrukturPerBulanSatuTahun = (bulan, tahun) => {
    const { getRepotKinerjaBulanan} = ReportApi();
    return useQuery(queryKeys.exportKinerjaBulanan(bulan, tahun), () => getRepotKinerjaBulanan(bulan, tahun), {enabledBulan: !!bulan, enabledTahun: !!tahun});
};

