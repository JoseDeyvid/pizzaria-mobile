import React from 'react'
import { ScrollView, TouchableOpacity, View, StyleSheet, Text, Dimensions, SafeAreaView } from 'react-native'
import { CategoryProps } from '../../contexts/CategoryContext'

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window')

type CustomModalProps = {
    handleCloseModal: () => void,
    options: Option[],
    setItemSelected: React.Dispatch<React.SetStateAction<Option | undefined>>
}

type Option = {
    id: number,
    name: string
}


const CustomModal = ({ handleCloseModal, options, setItemSelected }: CustomModalProps) => {
    

    const handleSelectedItem = (item: Option) => {
        setItemSelected(item);
        handleCloseModal();

    }

    const option = options.map((item) => (
        <TouchableOpacity style={styles.option} key={item.id} onPress={() => handleSelectedItem(item)}>
            <Text style={styles.item}>{item.name}</Text>
        </TouchableOpacity>
    ))

    return (
        <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
            <SafeAreaView style={styles.content}>
                <ScrollView>
                    {option}
                </ScrollView>
            </SafeAreaView>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
        width: WIDTH - 20,
        height: HEIGHT / 2,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: "#8a8a8a",
        borderRadius: 4,

    },
    option: {
        alignItems: "flex-start",
        borderTopWidth: 0.8,
        borderTopColor: "#8a8a8a"
    },
    item: {
        margin: 18,
        fontSize: 14,
        fontWeight: "bold",
        color: "#101026"
    }
})

export default CustomModal