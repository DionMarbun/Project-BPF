import { Suspense, useState } from 'react'
import "./assets/tailwind.css";
import { Route, Routes } from 'react-router-dom';
import React from "react";
import Loading from "./components/Loading";

// import Sidebar from "./components/Sidebar";
// import Header from "./components/Header";

// import Dashboard from "./pages/Dashboard";
// import RoomsList from "./pages/RoomsList";
// import Reservasi from "./pages/Reservasi";
// import Error400 from './pages/Error400';
// import Error401 from './pages/Error401';
// import Error403 from './pages/Error403';
// import TeamManagement from './pages/TeamManagement';
// import ManajemenProduk from './pages/ManajemenProduk';

// import MainLayout from './layouts/MainLayout';
// import AuthLayout from './layouts/AuthLayout';

// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import Forgot from './pages/auth/Forgot';
// import './App.css'

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const RoomsList = React.lazy(() => import("./pages/RoomsList"));
const Reservasi = React.lazy(() => import("./pages/Reservasi"));

const TeamManagement = React.lazy(() => import("./pages/TeamManagement"));
const ManajemenProduk = React.lazy(() => import("./pages/ManajemenProduk"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
const Register = React.lazy(() => import("./pages/auth/Register"));

const ErrorComponents = React.lazy(() => import("./components/ErrorComponents"));

const Error400 = React.lazy(() => import("./pages/Error400"));
const Error401 = React.lazy(() => import("./pages/Error401"));
const Error403 = React.lazy(() => import("./pages/Error403"));

const ReviewPelanggan = React.lazy(() => import("./pages/ReviewPelanggan"));
const LowonganList = React.lazy(() => import("./pages/LowonganList"));
const FAQList = React.lazy(() => import("./pages/FAQList"));
const ArtikelCrud  = React.lazy(() => import("./pages/ArtikelCrud"));

const ReservasiDetail = React.lazy(() => import("./pages/ReservasiDetail"));
const TeamManagementDetail = React.lazy(() => import("./pages/TeamManagementDetail"));
const RoomListDetail = React.lazy(() => import("./pages/RoomListDetail"));
const ReviewPelangganDetail = React.lazy(() => import("./pages/ReviewPelangganDetail"));

const KontakMasuk = React.lazy(() => import("./pages/KontakMasuk"));
const Role = React.lazy(() => import("./pages/Role"));
const CompanyProfile = React.lazy(() => import("./pages/CompanyProfile"));
const MediaGallery = React.lazy(() => import("./pages/MediaGallery"));

function App() {
  const [count, setCount] = useState(0)

  return (
        <Suspense fallback={<Loading/>}>
            <Routes>
              <Route element={<MainLayout/>}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/Reservasi" element={<Reservasi/>} />
                  <Route path="/RoomsList" element={<RoomsList/>} />
                  <Route path="/Error400" element={<Error400/>}/>
                  <Route path="/Error401" element={<Error401/>} />
                  <Route path="/Error403" element={<Error403/>}/>
                  <Route path="/TeamManagement" element={<TeamManagement/>}/>
                  <Route path="/ManajemenProduk" element={<ManajemenProduk/>}/>

                  <Route path="/Review" element={<ReviewPelanggan />} />
                  <Route path="/LowonganList" element={<LowonganList />} />
                  <Route path="/FAQList" element={<FAQList />} />
                  <Route path="/ArtikelCrud" element={<ArtikelCrud />} />

                  <Route path="/Reservasi/:id" element={<ReservasiDetail />} />
                  <Route path="/TeamManagement/:id" element={<TeamManagementDetail />} />
                  <Route path="/RoomsList/:id" element={<RoomListDetail />} />
                  <Route path="/ReviewPelanggan/:id" element={<ReviewPelangganDetail />} />

                  <Route path="/KontakMasuk" element={<KontakMasuk />} />
                  <Route path="/Role" element={<Role />} />
                  <Route path="/CompanyProfile" element={<CompanyProfile />} />
                  <Route path="/MediaGallery" element={<MediaGallery />} />
              </Route>

              <Route element={<AuthLayout/>}>
                  <Route path="/login" element={<Login/>} />
                  <Route path="/register" element={<Register/>} />
                  <Route path="/forgot" element={<Forgot/>} />
              </Route>
          </Routes>
        </Suspense>
  )
}

export default App
