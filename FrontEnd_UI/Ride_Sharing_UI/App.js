import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './src/Screens/Home';
import BillingScreen from './src/Screens/BillingScreen';


const Stack = createNativeStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
    <Stack.Navigator 
    initialRouteName='Home'
    screenOptions={{ headerShown: false }}
    >
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='BillingScreen' component={BillingScreen}/>

    </Stack.Navigator>
    </NavigationContainer>
  )
}



export default App

