import React, { useContext, useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { AuthContext } from '../../contexts/AuthContext'
import { StyleSheet } from 'react-native'
import { OrderContext } from '../../contexts/OrderContext'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'


const Dashboard = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();
  const [table, setTable] = useState<string>("");
  const { openOrder, order } = useContext(OrderContext);
  // const {signOut} = useContext(AuthContext);

  const handleOrder = async () => {
    if (await openOrder({ table })) {
      navigation.navigate("Order", { table: table });
      setTable("");
    }
  }

  useEffect(() => {
    // signOut()
  }, [])

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Novo pedido</Text>
        <TextInput style={styles.input} placeholder='Número da mesa' placeholderTextColor={"#F0F0F0"} keyboardType='numeric' value={table} onChangeText={setTable} />
        <TouchableOpacity style={styles.button} onPress={handleOrder} disabled={!!!table}>
          <Text style={styles.textButton}>Abrir mesa</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,

  },
  input: {
    height: 50,
    backgroundColor: "#101026",
    width: "80%",
    paddingStart: 15,
    borderRadius: 4,
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center"


  },
  button: {
    backgroundColor: "#3fffa3",
    width: "80%",
    height: 40,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",

  },
  textButton: {
    fontSize: 16,
    fontWeight: "bold"
  },
})

export default Dashboard