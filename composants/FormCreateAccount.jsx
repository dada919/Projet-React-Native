import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { schemaEtudiant } from '../verif/connexion.js';
import db from '../config';
import { collection, addDoc } from 'firebase/firestore';


function FormCreateAccount({ navigation }) {
  const [nom, setNom] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [erreurs, setErreurs] = useState([]);


  const onSubmit = () => {
    
      const etudiant = {nom, age, email}
      const {error} = schemaEtudiant.validate (etudiant, {abortEarly : false});
      console.log(error);
      if(!error) {
        addDoc(collection(db, "etudiant"), etudiant).then(function(reponse){
            setNom("")
            setAge("")
            setEmail("")
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
        <Text style={styles.title2}>Nom:</Text>
        <TextInput
          style={styles.input}
          value={nom}
          onChangeText={(text) => setNom(text)}
          placeholder="Nom"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.title2}>Age:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={(text) => setAge(text)}
          placeholder="Age"
          autoCapitalize="none"
          autoCorrect={false}
        />
         <Text style={styles.title2}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          autoCapitalize="none"
          autoCorrect={false}
        />
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
    width: 350,
    height: 565,
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