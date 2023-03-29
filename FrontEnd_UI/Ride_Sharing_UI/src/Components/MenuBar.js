import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import Feather from '@expo/vector-icons/Ionicons';

const MenuBar = () => {
  const navigation = useNavigation();
    return (
     
     <View style={styles.menubarStyle}>

     <TouchableOpacity
     onPress={()=>{
       navigation.navigate("Home");
     }}>
     <Feather name='home' style={styles.iconStyle}/>
     </TouchableOpacity>
  
     <TouchableOpacity
     onPress={()=>{
      
     }}>
     <Feather name='star' style={styles.iconStyle}/>
     </TouchableOpacity>

     <TouchableOpacity
     onPress={()=>{
      
     }}>
     <Feather name='search' style={styles.iconStyle}/>
     </TouchableOpacity>

     <TouchableOpacity
     onPress={()=>{

     }}>
     <Feather name='person' style={styles.iconStyle}/>
     </TouchableOpacity>

    
     </View>
     
    )
}

const styles = StyleSheet.create({
    
      menubarStyle:{
        flexDirection:"row",
        backgroundColor:'#454545',
        justifyContent:'space-around',
        borderTopLeftRadius:5,
        borderTopRightRadius:5
    },
    iconStyle:{
        fontSize: 45,
        color: 'white',
        padding:'2%'
        
      },
})

export default MenuBar


