import { MdOutlineSpaceDashboard } from 'react-icons/md'
import { ROUTES } from '../../utils/helper/routes'
import { 
    BsPersonLinesFill, 
    BsClipboardCheck, 
    BsCreditCard2Back, 
    BsEnvelopePaper,
    BsCashCoin,
} from 'react-icons/bs'
import { 
    AiOutlineSchedule,
    AiOutlineFileSearch, 
} from "react-icons/ai"

import { TbCash, TbReport, TbReceipt2 } from 'react-icons/tb'
import { IoReceiptOutline } from 'react-icons/io5'
import { ImUserTie } from 'react-icons/im'
import { VscClippy } from "react-icons/vsc"

export const sidebarlink = [
    //menu admin
    {
        title: 'Main Menu',
        links: [
            {
                title: 'Dashboad',
                path: ROUTES.DASHBOARD,
                icon: MdOutlineSpaceDashboard,
                roles: ['ADMIN', 'MO', 'KASIR'],
            },
        ],
    },

    //menu kasir
    {
        title: 'DATA MASTER',
        links: [
            {
                title: 'Instruktur',
                path: ROUTES.INSTRUKTUR,
                icon: ImUserTie,
                roles: ['ADMIN'],
            },
            {
                title: 'Member',
                path: ROUTES.MEMBER,
                icon: BsPersonLinesFill,
                roles: ['KASIR'],
            },
             {
                title: 'Jadwal Umum',
                path: ROUTES.JU,
                icon: VscClippy,
                roles: ['MO'],
            },
            {
                title: 'Jadwal Harian',
                path: ROUTES.JH,
                icon: BsClipboardCheck,
                roles: ['MO'],
            },
        ],
    },
    {
        title: 'TRANSAKSI',
        links: [
            {
                title: 'Aktivasi',
                path: ROUTES.AKTIVASI,
                icon: BsCreditCard2Back,
                roles: ['KASIR'],
            },
            {
                title: 'Deposit Uang',
                path: ROUTES.DU,
                icon: TbReceipt2,
                roles: ['KASIR'],
            },
            {
                title: 'Deposit Kelas',
                path: ROUTES.DK,
                icon: IoReceiptOutline,
                roles: ['KASIR'],
            },
            {
                title: 'Ijin Instruktur',
                path: ROUTES.IJIN,
                icon: BsEnvelopePaper,
                roles: ['MO'],
            },
        ],
    },
    {
        title: 'Laporan',
        links: [
            {
                title: 'Pendapatan',
                path: ROUTES.PENDAPATAN,
                icon: BsCashCoin,
                roles: ['MO'],
            },
            {
                title: 'Aktivitas Kelas',
                path: ROUTES.KELAS,
                icon: IoReceiptOutline,
                roles: ['MO'],
            },
            {
                title: 'Aktivitas Gym',
                path: ROUTES.GYM,
                icon: TbCash,
                roles: ['MO'],
            },
            {
                title: 'Kinerja Instruktur',
                path: ROUTES.KINERJA,
                icon: TbReport,
                roles: ['MO'],
            },
        ],
    },
    {
        title: 'Presensi',
        links: [
            {
                title: 'Gym',
                path: ROUTES.PRESENSI_GYM,
                icon: AiOutlineFileSearch,
                roles: ['KASIR'],
            },
            {
                title: 'Kelas',
                path: ROUTES.PRESENSI_KELAS,
                icon: AiOutlineSchedule,
                roles: ['KASIR'],
            },
        ],
    },
];
