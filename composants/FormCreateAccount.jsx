import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { schemaAccount } from '../verif/account.js';
import db from '../config';
import { collection, addDoc } from 'firebase/firestore';
import { useUpdate } from '../context/updateContext';
import { Picker } from '@react-native-picker/picker';



function FormCreateAccount({ navigation, route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [erreurs, setErreurs] = useState([]);
  const { setUpdateAccount } = useUpdate();

  const UpdateAccountDashboardHandler = route.params.UpdateAccountDashboardHandler;

  const onSubmit = () => {
    
      const produit = {email, password, role}
      const {error} = schemaAccount.validate (produit, {abortEarly : false});
      console.log(error);
      if(!error) {
        addDoc(collection(db, "gestionnaire"), produit).then(function(reponse){
            setEmail("")
            setPassword("")
            setRole("")
            UpdateAccountDashboardHandler();
            setUpdateAccount(true);
            alert("le profil à bien été crée dans la base de données")
        })
      }
      else {
        const tableauErreurs = error.details.map(function(item){return item.message});
        setErreurs(tableauErreurs);
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Création d'un compte</Text>
        <Text style={styles.title2}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.title2}>Mot de passe:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Mot de passe"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.title2}>Role:</Text>
        <Picker
          selectedValue={role}
          onValueChange={(itemValue, itemIndex) => setRole(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Redacteur" value="redacteur" />
          <Picker.Item label="Admin" value="admin" />
        </Picker>

        <View style={styles.button}></View>
        <Button title='Créer' onPress={onSubmit} />
      </View>
      <FlatList 
        data={erreurs}
        renderItem={function({item}){return <Text>{item}</Text>}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: "95%",
    backgroundColor: '#3f7ecc',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
  },
  title2: {
    marginBottom: 10,
    marginTop: 30,
    color: "white",
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    padding: 10,
  },
});

export default FormCreateAccount;