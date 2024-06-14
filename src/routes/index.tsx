import React, { useContext } from 'react'
import AuthRoutes from './auth.routes'
import AppRoutes from './app.routes'
import { AuthContext } from '../contexts/AuthContext'
import { SafeAreaView, ActivityIndicator } from 'react-native'

const Routes = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#1D1D2E',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <ActivityIndicator size={60} color="#FFF" />
      </SafeAreaView>
    )
  }
  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  )
}

export default Routes