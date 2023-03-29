import React, {useState} from 'react'
import { StyleSheet, Text, View, StatusBar, TouchableOpacity,ScrollView } from 'react-native'

import TopBar from '../Components/TopBar'
import MenuBar from '../Components/MenuBar'
import PassengerUI from '../Components/PassengerUI'
import DriverUI from '../Components/DriverUI'

const Home = () => {
  const [passengerselector, setPassengerSelector] = useState(true);
  const [driverSelector, setDriverSelector] = useState(false);
    return (
        <View style={styles.containerStyle}>
       
        <StatusBar 
        barStyle = 'light-content' 
        hidden = {false}
        backgroundColor = "#454545"
        translucent = {false}
        />
      
        <TopBar style={styles.topbarStyle}/>
        
        <ScrollView style={styles.contentStyle}>
          <View style={styles.menuStyle}>
           <TouchableOpacity
           style={styles.buttonStyle}
           onPress={()=>{
            setPassengerSelector(true);
            setDriverSelector(false);
           }}>
             <Text style={[{ backgroundColor: passengerselector  ? "#454545" : "white" },
             { color: passengerselector  ? "white" : "#454545" },styles.menuTextStyle]}>
              Passenger Microservice
              </Text>  
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>{
                setPassengerSelector(false);
                setDriverSelector(true);
             }}>
             <Text style={[{ backgroundColor: driverSelector ? "#454545" : "white" },
             { color: driverSelector  ? "white" : "#454545" },styles.menuTextStyle]}>
              Driver Microservice
              </Text>  
            </TouchableOpacity>
            </View>

            {passengerselector && <PassengerUI/>}
            {driverSelector && <DriverUI/>}

         
        </ScrollView>

        <MenuBar style={styles.setMenuBar}/>

        
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
  containerStyle:{
    flex:5
    },
   topbarStyle:{
    flex:1
   },
   contentStyle:{
    flex:3,
    backgroundColor:'white',
    },
   setMenuBar:{
    flex:1
    },
    menuStyle:{
      padding:15,
      flexDirection:'row',
      justifyContent:'space-around',
      borderBottomWidth:5,
      borderBottomEndRadius:25,
      borderBottomStartRadius:25,
      borderColor:'#454545'
    },
    menuTextStyle:{
      fontSize:15,
      fontWeight:'bold',
      borderRadius:20,
      padding:10
    },

})
