import { StyleSheet, Text, View,StatusBar, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

import TopBar from '../Components/TopBar'
import MenuBar from '../Components/MenuBar'

const BillingScreen = () => {
    const [handleDecorator, setHandleDecorator] = useState(true);
    const [handleSeller, setHandleSeller] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('JazzCash');
    const [PIN, setPIN] = useState('');

    const confirmBilling = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:9001/billing/addBill", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Accept': 'application/json'
              },
              body: JSON.stringify({
                paymentMethod, PIN
              })
            }).then((res) => {
              console.log(res);
      
              if (res.status === 422) {
                window.alert("Plesae fill the field properly");
              }
              else if (res.status === 201) {
                window.alert("Your bill is Successfully submitted");
              }
            })
          } catch (err) {
            console.log(err);
          }
    }
    return (
        <View style={styles.containerStyle}>

            <StatusBar
                barStyle='light-content'
                hidden={false}
                backgroundColor="#454545"
                translucent={false}
            />

            <TopBar style={styles.topbarStyle} />

            <View style={styles.contentStyle}>

            <View style={[{marginVertical:20},styles.fieldStyling]}>
              <Text style={styles.headingStyling}>Billing Microservice</Text>
            </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40, width: '100%' }}>
                    <Text style={styles.textStyle}>Payment Method</Text>

                    <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 30, justifyContent: 'space-evenly', width: '100%' }}>

                        <TouchableOpacity
                            onPress={() => {
                                setHandleDecorator(true);
                                setHandleSeller(false);
                                setPaymentMethod('JazzCash');
                            }}
                            style={[{ backgroundColor: handleDecorator ? "#454545" : "white" }, styles.radioButtonStyle]}
                        >
                        </TouchableOpacity>
                        <Text style={[styles.radioButtonTextStyle]}>JazzCash</Text>


                        <TouchableOpacity
                            onPress={() => {
                                setHandleDecorator(false);
                                setHandleSeller(true);
                                setPaymentMethod('EasyPaisa');
                            }}
                            style={[{ backgroundColor: handleSeller ? "#454545" : "white" }, styles.radioButtonStyle]}
                        >
                        </TouchableOpacity>
                        <Text style={styles.radioButtonTextStyle}>EasyPaisa</Text>

                    </View>
                </View>

                <View style={styles.fieldStyling}>
                    <TextInput
                        placeholder="Enter PIN"
                        value={PIN}
                        onChangeText={text => setPIN(text)}
                        style={styles.input}
                    />
                </View>

                <View style={styles.fieldStyling}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={confirmBilling}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <MenuBar style={styles.setMenuBar} />


        </View>

    )
}

const styles = StyleSheet.create({
    containerStyle: {
        flex: 5,
        backgroundColor: 'white',
    },
    topbarStyle: {
        flex: 1
    },
    contentStyle: {
        flex: 3,
        marginHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    setMenuBar: {
        flex: 1
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
        textDecorationLine: 'underline',
        alignSelf: 'center'
      },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        flexDirection: 'row',
        // borderBottomWidth:1,
        borderWidth: 1,
        flex: 2,
        position: 'relative',
      },
      textStyle: {
        fontSize: 20,
        marginEnd: '2%',
        color: '#454545',
        textDecorationLine: 'underline',
        fontWeight: 'bold'
      },
      radioButtonStyle: {
        width: 20,
        height: 20,
        borderRadius: 50,
        borderWidth: 1,
        alignSelf:'center'
      },
      radioButtonTextStyle: {
        fontSize:18,
      },
    submitButton: {
        width: 100,
        height: 50,
        marginBottom: '15%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth: 2,
        // marginTop: '3%',
        backgroundColor: "#454545",
    },
})

export default BillingScreen

