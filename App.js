import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import Acceuil from './composants/Accueil';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormCreate from './composants/FormCreate';
import FormUpdate from './composants/FormUpdate';
import Single from './composants/Single';
import Connexion from './composants/Connexion';
import Dashboard from './composants/Dashboard';
import { AuthProvider } from './context/authContext';
import Compte from './composants/Compte';

const Stack = createNativeStackNavigator()


export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen component={Acceuil} name="accueil"/>
            <Stack.Screen component={Connexion} name="connexion"/>
            <Stack.Screen component={Dashboard} name="dashboard"/>
            <Stack.Screen component={Single} name="single"/>
            <Stack.Screen component={FormCreate} name="formcreate"/>
            <Stack.Screen component={FormUpdate} name="formupdate"/>
            <Stack.Screen component={Compte} name="compte"/>
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="auto" />
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});