import { LinearProgress } from '@mui/material'
import { MainLayout } from 'components/Layouts/MainLayout'
import News from 'features/News/Pages/News'
import { NotFound } from 'features/NotFound/NotFound'
import Products from 'features/Products/Pages/Products'
import { Suspense } from 'react'
import { Navigate, Outlet, Route, Routes } from 'react-router-dom'

export default function Main() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <MainLayout>
        <Routes>
          <Route index element={<Navigate to="news" />} />
          <Route path="news" element={<News />} />
          <Route path="products" element={<Products />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Outlet />
      </MainLayout>
    </Suspense>
  )
}
