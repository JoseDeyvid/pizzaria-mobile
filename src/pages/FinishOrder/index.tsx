import React, { useContext } from 'react'
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { OrderContext } from '../../contexts/OrderContext'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'
import { useNavigation } from '@react-navigation/native'

const FinishOrder = () => {
  const { order, finishOrder } = useContext(OrderContext);
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const handleFinishOrder = async() => {
    await finishOrder(Number(order?.id))
    navigation.popToTop();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.questionText}>Você deseja finalizar o pedido?</Text>
      <Text style={styles.orderText}>Mesa: {order?.table}</Text>
      <TouchableOpacity style={styles.finishButton} onPress={handleFinishOrder}>
        <Text style={styles.buttonText}>Finalizar pedido</Text>
        <Feather name="shopping-cart" size={20} color="#1d1d2e" />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default FinishOrder

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  questionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 22
  },
  orderText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 26,
    marginVertical: 15
  },
  finishButton: {
    backgroundColor: "#3fffa3",
    width: "70%",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 40
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 10
  }
})