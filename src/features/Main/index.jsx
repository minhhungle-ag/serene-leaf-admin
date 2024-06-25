import { LinearProgress } from '@mui/material'
import { MainLayout } from 'components/Layouts/MainLayout'
import Donations from 'features/Donations/Pages/Donations'
import News from 'features/News/Pages/News'
import { NotFound } from 'features/NotFound/NotFound'
import { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

export default function Main() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="news" />} />
          <Route path="news" element={<News />} />
          <Route path="donations" element={<Donations />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </MainLayout>
    </Suspense>
  )
}
