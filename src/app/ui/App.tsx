import { useAppDispatch } from 'common/hooks'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CircularProgress, Container } from '@mui/material'
import { ErrorSnackbar } from 'common/components'
import { authThunks } from 'features/auth/model/authSlice'
import { selectIsInitialized } from 'app/model/appSlice'
import { Header } from 'app/ui/Header/Header'
import { Routing } from 'app/ui/Routing/Routing'

function App() {
  const isInitialized = useSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <ErrorSnackbar />
        <Header />
        <Container fixed>
          <Routing />
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
