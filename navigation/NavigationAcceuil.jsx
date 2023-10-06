import Acceuil from '../composants/Accueil';
import Profil from '../composants/Profil';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FormCreate from '../composants/FormCreate';
import FormUpdate from '../composants/FormUpdate';

const Stack = createNativeStackNavigator()

function NavigationAcceuil() {
    return ( 
        <Stack.Navigator>
          <Stack.Screen component={Acceuil} name="accueil"/>
          <Stack.Screen component={Profil} name="profil"/>
          <Stack.Screen component={FormCreate} name="formcreate"/>
          <Stack.Screen component={FormUpdate} name="formupdate"/>
        </Stack.Navigator>
     );
}

export default NavigationAcceuil;