// import { Route, Routes } from 'react-router-dom'
// import { LoginPage, InstrukturPage, MemberPage, JadwalUmumPage } from './pages'
import { Suspense } from 'react'
import Spinner from './components/Spinner'
import RouteManager from './utils/setup/routes'

function App() {

  return (
    <>
      <Suspense fallback={<Spinner full />}>
        <RouteManager />
      </Suspense>
    </>
    // <Routes>
    //   <Route exact path='/' element={<LoginPage/>}/>
    //   <Route path='/login' element={<LoginPage/>}/>

    //   <Route path='/instruktur' element={<InstrukturPage/>}/>

    //   <Route path='/member' element={<MemberPage/>}/>

    //   <Route path='/jadwal-umum' element={<JadwalUmumPage/>}/>
    // </Routes>
  )
}

export default App
