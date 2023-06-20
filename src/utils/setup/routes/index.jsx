import { ROUTES } from '../../helper/routes'
import { 
    DashboardLayout, 
    NotFoundPage, 
    InstrukturPage, 
    TambahEditInstruktur, 
    MemberPage, 
    TambahEditMember, 
    JadwalUmumPage, 
    JadwalHarianPage,
    TransaksiAktivasiPage,
    DepositUangPage,
    DepositKelasPage,
    IjinInstrukturPage,
    LaporanPendapatanPage,
    LaporanKelasPage,
    LaporanGymPage,
    LaporanKinerjaInstrukturPage,
    PresensiGymPage,
    PresensiKelasPage
} from '../../../pages'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { lazy, useEffect } from 'react'
import PrivateRoutes from './PrivateRoutes'
import useAuthStore from '../useAuthStore'

const Dashboard = lazy(() => import('../../../pages/global/Dashboard'))
const Login = lazy(() => import('../../../pages/Login'))

const RouteManager = () => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        if (pathname === '/') {
            if(!user){
                navigate(ROUTES.LOGIN);
            } else {
                if(user.role === "ADMIN") {navigate(ROUTES.INSTRUKTUR)}
                else if(user.role === "KASIR") {navigate(ROUTES.MEMBER)}
                else if(user.role === "MO") {navigate(ROUTES.JU)}
                else navigate(ROUTES.LOGIN);
            }
        }
    }, [pathname, navigate]);

    return (
        <>
            <Routes>
                <>
                {/* Menu All ROLE */}
                    <Route
                        element={
                            <PrivateRoutes
                                allowedRoles={[
                                    'ADMIN',
                                    'KASIR',
                                    'MO',
                                ]}
                            />
                        }
                    >
                        <Route path="/" element={<DashboardLayout />}>
                            {/*Dashboard import*/}
                            <Route
                                path={ROUTES.DASHBOARD}
                                element={<Dashboard />}
                            />
                        </Route>
                    </Route>
                </>

                <>
                {/* DILUAR ROLE */}
                    <Route path={ROUTES.LOGIN} element={<Login />} />
                    <Route path="*" element={<NotFoundPage />} />
                </>

                <>
                {/* Menu Admin */}
                    <Route
                        element={
                            <PrivateRoutes
                                allowedRoles={['ADMIN']}
                            />
                        }
                    >
                        <Route path="/" element={<DashboardLayout />}>

                            {/*Route Instruktur*/}
                            <Route path={ROUTES.INSTRUKTUR} >
                                <Route index element={<InstrukturPage />} />
                                 <Route
                                    path="add"
                                    element={<TambahEditInstruktur />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<TambahEditInstruktur isEdit />}
                                />
                            </Route>
                        </Route>
                    </Route>
                </>

                <>
                {/* Menu KASIR */}
                    <Route
                        element={
                            <PrivateRoutes
                                allowedRoles={['KASIR']}
                            />
                        }
                    >
                        <Route path="/" element={<DashboardLayout />}>

                            {/*Route Member*/}
                            <Route path={ROUTES.MEMBER} >
                                <Route index element={<MemberPage />} />
                                 <Route
                                    path="add"
                                    element={<TambahEditMember />}
                                />
                                <Route
                                    path="edit/:id"
                                    element={<TambahEditMember isEdit />}
                                />
                            </Route>

                             {/*Route Transaksi Aktivasi*/}
                            <Route path={ROUTES.AKTIVASI} >
                                <Route index element={<TransaksiAktivasiPage />} />
                            </Route>

                             {/*Route Deposit Uang*/}
                            <Route path={ROUTES.DU} >
                                <Route index element={<DepositUangPage />} />
                            </Route>

                            {/*Route Deposit Kelas*/}
                            <Route path={ROUTES.DK} >
                                <Route index element={<DepositKelasPage />} />
                            </Route>

                            <Route path={ROUTES.PRESENSI_GYM} >
                                <Route index element={<PresensiGymPage />} />
                            </Route>

                             <Route path={ROUTES.PRESENSI_KELAS} >
                                <Route index element={<PresensiKelasPage />} />
                            </Route>
                        </Route>
                    </Route>
                </>

                <>
                {/* Menu MO */}
                    <Route
                        element={
                            <PrivateRoutes
                                allowedRoles={['MO']}
                            />
                        }
                    >
                        <Route path="/" element={<DashboardLayout />}>

                            {/*Route Instruktur*/}

                            {/* Jadwal Umum */}
                            <Route path={ROUTES.JU} >
                                <Route index element={<JadwalUmumPage />} />
                            </Route>

                            {/* Jadwal Harian */}
                            <Route path={ROUTES.JH} >
                                <Route index element={<JadwalHarianPage />} />
                            </Route>

                            {/* Izin Instruktur */}
                            <Route path={ROUTES.IJIN} >
                                <Route index element={<IjinInstrukturPage />} />
                            </Route>

                            {/* Pendapatan */}
                            <Route path={ROUTES.PENDAPATAN} >
                                <Route index element={<LaporanPendapatanPage />} />
                            </Route>

                            {/* Kelas */}
                            <Route path={ROUTES.KELAS} >
                                <Route index element={<LaporanKelasPage />} />
                            </Route>

                            {/* Gym */}
                            <Route path={ROUTES.GYM} >
                                <Route index element={<LaporanGymPage/>} />
                            </Route>

                            {/* Kinerja */}
                            <Route path={ROUTES.KINERJA} >
                                <Route index element={<LaporanKinerjaInstrukturPage />} />
                            </Route>
                        </Route>

                    </Route>
                </>
            </Routes>
        </>
    );
};

export default RouteManager;
