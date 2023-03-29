import { StyleSheet, Text, View, TouchableOpacity, TextInput,FlatList } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation } from '@react-navigation/native';

const PassengerUI = () => {
  const navigation = useNavigation();
    const [end, setEnd] = useState('');
    const [routes, setRoutes] = useState([]);
    const [requests, setRequests] = useState([]);
    let requestId='';
    let origin='';
    let destination='';
    let rideFee='';

    useEffect(() => {
      try {
        const res = fetch("http://localhost:9001/passenger/confirmRequests", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Accept': 'application/json'
          },
        }).then(response => response.json())
          .then(data => {
            const dataArray = Array.isArray(data) ? data : [data]; // Convert to array if not already an array
            setRequests(dataArray);
          })
      } catch (err) {
        console.log(err);
      }
    },[]);

    
    const findRideRoute = async (e) =>{
      e.preventDefault();

      try{
      const res = await fetch("http://localhost:9001/driver/findRide",{
            method: "POST",
            headers :{
              "Content-Type" : "application/json",
              'Accept': 'application/json'
            },
            body: JSON.stringify({
               end
            })
          }).then(response => response.json())
          .then(data => {
            const dataArray = Array.isArray(data) ? data : [data]; // Convert to array if not already an array
           if(dataArray.length == 0){
            window.alert("Sorry! Ride is not available.");
          }
          if(data.status === 422){
            window.alert("Plesae fill the field properly");
          }
          else{
            setRoutes(dataArray);
          }
          
          
  
        })
        }catch(err){
          console.log(err);
        }
    }

    console.log(requestId);

    const sendRideRequest=async ()=>{
      try{
      const res = await fetch("http://localhost:9001/driver/rideRequest",{
            method: "POST",
            headers :{
              "Content-Type" : "application/json",
              'Accept': 'application/json'
            },
            body: JSON.stringify({
               requestId,origin, destination, rideFee
            })
          }).then((res) => {
          console.log(res);
    
          if(res.status === 422){
            window.alert("Request already send on this Ride.");
          }
          else  if(res.status === 201){
            window.alert("Ride Request is sent Successfully");
          }
         })
        }catch(err){
          console.log(err);
        }
    }
    
  return (
    <View style={styles.container}>

<View style={styles.fieldStyling}>
    <Text style={styles.headingStyling}>Search Ride</Text>
    </View>

    <View style={styles.subContainer}>

      <View style={styles.fieldStyling}>
      <TextInput
          placeholder="Where you want to go!"
          value={end}
          
          onChangeText={text => setEnd(text)}
          style={styles.input}
        />
      </View>

      <View style={styles.fieldStyling}>
      <TouchableOpacity
      style={styles.submitButton}
      onPress={findRideRoute}>
      <Text style={{fontSize:20, fontWeight:'bold', color:'white'}}>Search</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={routes}
        scrollEnabled={true}
        vertical
        renderItem={({item}) => {
            
          return(
      <View style={styles.searchResult}>
        <Text style={styles.textStyle}>ID : {item._id}</Text>
        <Text style={styles.textStyle}>Start : {item.start}</Text>
        <Text style={styles.textStyle}>End : {item.end}</Text>
        <Text style={styles.textStyle}>Charges : {item.charges}</Text>
        <TouchableOpacity 
        style={styles.buttonStyle}
        onPress={()=>{
          requestId = item._id;
          origin = item.start;
          destination = item.end;
          rideFee = item.charges;
          sendRideRequest();
        }}>
         <Text style={[{color:'white'},styles.textStyle]}>Ride Request</Text>
          </TouchableOpacity>
      </View>
          );
      
        }}
        />

<FlatList
        data={requests}
        scrollEnabled={true}
        vertical
        renderItem={({item}) => {
            
          return(
      <View style={styles.searchResult}>
        <Text style={styles.textStyle}>Your request from {item.origin} to {item.destination} for {item.rideFee} has been accepted.</Text>
        <TouchableOpacity 
        style={styles.buttonStyle}
        onPress={()=>{
          navigation.navigate('BillingScreen');
        }}>
         <Text style={[{color:'white'},styles.textStyle]}>Billing</Text>
          </TouchableOpacity>
      </View>
          );
      
        }}
        />

    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    margin:'5%',
    marginTop:'10%',
    alignItems:'center',
    justifyContent:'center',
  },
  subContainer:{
    width:'100%',
    marginTop:'5%',
  },
  fieldStyling:{
    flexDirection:'row',
    marginTop:'5%',
    alignItems:'center',
    justifyContent:'center',
    width:'100%'
  },
  headingStyling:{
    fontSize:35,
    fontWeight:'bold',
    textDecorationLine: 'underline'
  },
  input: {
  backgroundColor: 'white',
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
  flexDirection:'row',
  borderWidth:1,
  flex:2,
  position:'relative',
  },
  submitButton:{
    width:'40%',
    height:'40%',
    marginBottom:'15%',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,
    borderWidth:2,
    marginTop:'5%',
    backgroundColor: "#454545",
   },
  searchResult:{
    flexDirection:'row', 
    justifyContent:'space-between',
    marginTop:20,
    borderTopWidth:2,
    borderBottomWidth:2,
    padding:20,
    alignItems:'center'

  },
  textStyle:{
    fontSize:15,
    fontWeight:'bold'
  },
  buttonStyle:{
    backgroundColor:'#454545',
    padding:10,
    borderRadius:20
  }
})

export default PassengerUI

