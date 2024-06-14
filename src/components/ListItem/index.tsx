import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { Feather } from '@expo/vector-icons'

type ListItemProps = {
    data: {
        id: number,
        qtd: string,
        product: {
            id: number,
            name: string
        },
    },
    handleDeleteItem: (item_id: number) => Promise<void>
}

const ListItem = ({ data, handleDeleteItem }: ListItemProps) => {

    return (
        <View style={styles.container}>
                <Text style={styles.item}>{data.qtd} - {data.product.name}</Text>
                <TouchableOpacity onPress={() => handleDeleteItem(data.id)}>
                    <Feather name="trash-2" size={28} color="#FF3F4b" />
                </TouchableOpacity>
        </View>
    )
}

export default ListItem

const styles = StyleSheet.create({
    container: {
        borderWidth: 0.3,
        borderColor: "#8a8a8a",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: "4%",
        backgroundColor: "#101026",
        padding: "2%",
        marginBottom: "3%"
    },
    item: {
        color: "#fff"
    },
})