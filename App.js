import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import NavigationAccueil from './navigation/NavigationAcceuil';
import Profil from './composants/Profil';
import Icone from "react-native-vector-icons/Foundation"

const Tabs = createBottomTabNavigator();


export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Tabs.Navigator>
          <Tabs.Screen component={NavigationAccueil} name="home" options={{
            tabBarIcon : function(){
              return <Icone size={20} color={'black'} name="home"/>
            }
          }} />
          <Tabs.Screen component={Profil} name="profil" options={{
            tabBarIcon : function(){
              return <Icone size={20} color={'black'} name="torso"/>
            }
          }} />
        </Tabs.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});