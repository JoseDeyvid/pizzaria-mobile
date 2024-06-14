import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/AuthContext';
import { OrderProvider } from './src/contexts/OrderContext';
import { CategoryProvider } from './src/contexts/CategoryContext';
import { ProductProvider } from './src/contexts/ProductContext';
import "react-native-reanimated"

export default function App() {
  return (

    <NavigationContainer>
      <AuthProvider>
        <OrderProvider>
          <CategoryProvider>
            <ProductProvider>
              <StatusBar backgroundColor={"#1d1d2e"} barStyle={"light-content"} translucent={false} />
              <Routes />
            </ProductProvider>
          </CategoryProvider>
        </OrderProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
