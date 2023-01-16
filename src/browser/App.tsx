import { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Loading } from './components/shared/loading'
import { MainPage } from './pages/MainPage'

import 'rsuite/dist/rsuite.min.css'
import './styles.scss'

export const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
