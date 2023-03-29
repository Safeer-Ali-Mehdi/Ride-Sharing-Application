import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'

const DriverUI = () => {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [charges, setCharges] = useState('');
  const [requests, setRequests] = useState([]);
  let requestId='';
  let origin = '';
  let destination = '';
  let rideFee = '';

  useEffect(() => {
    try {
      const res = fetch("http://localhost:9001/driver/checkRequest", {
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

  const addRideRoute = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:9001/driver/addRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          start, end, charges
        })
      }).then((res) => {
        console.log(res);

        if (res.status === 422) {
          window.alert("Plesae fill the field properly");
        }
        else if (res.status === 201) {
          window.alert("Ride Route added Successfully");
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  const acceptRequest = async () => {
    try {
      const res = await fetch("http://localhost:9001/passenger/recieveRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          requestId, origin, destination, rideFee
        })
      }).then((res) => {
        console.log(res);


        if (res.status === 201) {
          window.alert("You Successfully accept the ride request");
        }
        else if (res.status === 422) {
          window.alert("You already accept the request");
        }
      })
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.fieldStyling}>
        <Text style={styles.headingStyling}>Add Ride Route</Text>
      </View>

      <View style={styles.subContainer}>

        <View style={styles.fieldStyling}>
          <TextInput
            placeholder="Enter Start Location"
            value={start}

            onChangeText={text => setStart(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldStyling}>
          <TextInput
            placeholder="Enter Destination"
            value={end}

            onChangeText={text => setEnd(text)}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldStyling}>
          <TextInput
            placeholder="Enter Ride Charges"
            value={charges}
            keyboardType='numeric'
            onChangeText={amount => setCharges(amount)}
            style={styles.input}
          />
        </View>

        <View style={styles.fieldStyling}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={addRideRoute}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Add</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fieldStyling}>
          <Text style={styles.headingStyling}>Ride Requests</Text>
        </View>


        <FlatList
          data={requests}
          scrollEnabled={true}
          vertical
          renderItem={({ item }) => {

            return (
              <View style={styles.searchResult}>
                <Text style={styles.textStyle}>Id : {item._id}</Text>
                <Text style={styles.textStyle}>Start : {item.origin}</Text>
                <Text style={styles.textStyle}>End : {item.destination}</Text>
                <Text style={styles.textStyle}>Charges : {item.rideFee}</Text>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    requestId = item._id
                    origin = item.origin;
                    destination = item.destination;
                    rideFee = item.rideFee;
                    acceptRequest();
                  }}>
                  <Text style={[{ color: 'white' }, styles.textStyle]}>Accept</Text>
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
  container: {
    margin: '5%',
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: '100%',
    marginTop: '10%',
  },
  fieldStyling: {
    flexDirection: 'row',
    marginTop: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  headingStyling: {
    fontSize: 35,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    flex: 2,
    position: 'relative',
  },
  textStyle: {
    fontSize: 13,
    marginEnd: '2%',
  },
  submitButton: {
    width: '40%',
    height: '40%',
    marginBottom: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    marginTop: '5%',
    backgroundColor: "#454545",
  },
  searchResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    padding: 20,
    alignItems: 'center'

  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  buttonStyle: {
    backgroundColor: '#454545',
    padding: 10,
    borderRadius: 20
  }
})

export default DriverUI

