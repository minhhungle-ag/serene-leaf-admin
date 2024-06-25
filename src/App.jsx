import { Navigate, Route, Routes } from 'react-router-dom'
import Main from 'features/Main'
import Auth from 'features/Auth/Auth'
import { NotFound } from 'features/NotFound/NotFound'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="dashboard" />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="dashboard/*" element={<Main />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
