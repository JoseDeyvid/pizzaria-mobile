import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet, TextInput, Modal, FlatList, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Feather } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from "../../contexts/OrderContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import CustomModal from "../../components/CustomModal";
import { CategoryContext } from "../../contexts/CategoryContext";
import { ProductContext } from "../../contexts/ProductContext";
import ListItem from "../../components/ListItem";

type ModalProps = {
  id: number,
  name: string
}

type ProductListProps = {
  id: number,
  product: ModalProps,
  qtd: string,
}

const Order = () => {
  const { order, deleteOrder, addItem, deleteItem } = useContext(OrderContext);
  const { getCategories } = useContext(CategoryContext);
  const { getProductsByCategoryId } = useContext(ProductContext);

  const [productQtd, setProductQtd] = useState<string>("1");
  const [modalCategoryVisible, setModalCategoryVisible] = useState<boolean>(false);
  const [categories, setCategories] = useState<ModalProps[]>([]);
  const [categorySelected, setCategorySelected] = useState<ModalProps | undefined>()
  const [modalProductVisible, setModalProductVisible] = useState<boolean>(false);
  const [products, setProducts] = useState<ModalProps[]>([]);
  const [productSelected, setProductSelected] = useState<ModalProps | undefined>()
  const [items, setItems] = useState<ProductListProps[]>([])

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  const handleDeleteOrder = async () => {

    if (await deleteOrder()) {
      navigation.goBack();
    };

  }

  const handleAddItem = async () => {

    if (productSelected) {
      const res = await addItem(Number(order?.id), productSelected.id, Number(productQtd))
      if (res) {
        const data = { id: res?.id, product: productSelected, qtd: productQtd }
        setItems(oldArray => [...oldArray, data])
      }

    }
  }

  const handleDeleteItem = async (item_id: number) => {
    await deleteItem(item_id);
    const removeItem = items.filter(item => item.id !== item_id)
    setItems(removeItem);
  }

  const handleNextButton = () => {
    navigation.navigate("FinishOrder", {})
  }

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesRes = await getCategories();
        setCategories(categoriesRes)
        setCategorySelected(categoriesRes[0])
      } catch (error) {
        console.log(error);
      }

    }
    loadCategories();
  }, [])

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (categorySelected?.id) {
          const productsRes = await getProductsByCategoryId(categorySelected.id);
          setProducts(productsRes)
          setProductSelected(productsRes[0])
        }

      } catch (error) {
        console.log(error);
      }

    }
    loadProducts();
  }, [categorySelected])

  return (
    <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>

      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mesa {order?.table}</Text>
          <TouchableOpacity onPress={handleDeleteOrder} style={{ opacity: items.length === 0 ? 1 : 0.3 }} disabled={items.length !== 0}>
            <Feather name="trash-2" size={28} color="#FF3F4b" />
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <TouchableOpacity style={styles.picker} onPress={() => setModalCategoryVisible(true)}>
            <Text style={styles.pickerText}>{categorySelected?.name}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.picker} onPress={() => setModalProductVisible(true)}>
            <Text style={styles.pickerText}>{productSelected?.name}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.qtdContainer}>
          <Text style={styles.qtdText}>Quantidade</Text>
          <TextInput style={styles.qtdInput} keyboardType="numeric" value={productQtd} onChangeText={setProductQtd} />
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.nextButton, { opacity: items.length == 0 ? 0.3 : 1 }]} onPress={handleNextButton} disabled={items.length == 0}>
            <Text style={styles.nextButtonText}>Avançar</Text>
          </TouchableOpacity>

        </View>

        <FlatList style={styles.list} data={items} renderItem={({ item }) => <ListItem data={item} handleDeleteItem={handleDeleteItem} />} keyExtractor={(item) => String(item.id)} />

        <Modal visible={modalCategoryVisible} transparent={true} animationType="fade">
          <CustomModal handleCloseModal={() => setModalCategoryVisible(false)} options={categories} setItemSelected={setCategorySelected} />
        </Modal>
        <Modal visible={modalProductVisible} transparent={true} animationType="fade">
          <CustomModal handleCloseModal={() => setModalProductVisible(false)} options={products} setItemSelected={setProductSelected} />
        </Modal>

      </SafeAreaView>
    </TouchableWithoutFeedback>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    alignItems: "center",
  },
  header: {
    marginTop: 60,
    flexDirection: "row",
    width: "80%"

  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 28,
    marginRight: 10
  },
  pickerContainer: {
    width: "80%"
  },
  picker: {
    marginTop: 10,
    backgroundColor: "#101026",
    padding: 10,
    height: 60,
    justifyContent: "center"
  },
  pickerText: {
    color: "#fff",
    fontSize: 15
  },
  qtdContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 10,
    height: 40,
    alignItems: "center",

  },
  qtdText: {
    width: "40%",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold"


  },
  qtdInput: {
    backgroundColor: "#101026",
    width: "60%",
    height: "100%",
    textAlign: "center",
    color: "#fff"
  },
  actionsContainer: {
    flexDirection: "row",
    width: "80%",
    marginTop: 10,
    justifyContent: "space-between"
  },
  addButton: {
    backgroundColor: "#3fd1ff",
    padding: 8,
    borderRadius: 4,
    width: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#3fffa3",
    width: "70%",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  list: {
    flex: 1,
    marginTop: 24,
    width: "100%",
  }
})

export default Order