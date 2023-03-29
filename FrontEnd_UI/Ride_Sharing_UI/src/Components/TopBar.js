import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TopBar = () => {
    return (
        <View style={styles.containerStyle}>
            <Text style={styles.textStyle}>Ride Sharing APP</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    containerStyle:{
        padding:'1%',
        backgroundColor:"#454545",
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5
    },
    textStyle:{
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        alignSelf:'center',
        fontStyle:'italic'
    }
})

export default TopBar