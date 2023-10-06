import { Text, View, Button, StyleSheet, TextInput, FlatList } from "react-native"
import React, { useEffect, useState } from 'react';
import db from "../config"
import { deleteDoc , doc , getDocs, collection } from "firebase/firestore"
import DateTimePicker from '@react-native-community/datetimepicker';

function Acceuil({navigation}) {
  const [etudiants, setEtudiants] = useState([]);
  const [updateList , setUpdateList] = useState(false);

  useEffect( function(){ 

    getDocs(collection(db, "etudiant"))
    .then(function(snapShot){
      const data = [];
      snapShot.docs.map(function(doc){
        data.push({...doc.data() , id : doc.id})
      })
      setEtudiants(data);
    })

} , [updateList])

  const supprimer = (id) => {
    deleteDoc(doc(db , "etudiant" , id)).then(function(){
      setUpdateList(!updateList);
    })
}

  const handleClickProfil = function(){
    navigation.navigate("profil")
  }

  const handleClickConnexion = function(){
    navigation.navigate("formcreate")
  }

  return ( 
    <View style={{flex: 1, justifyContent:"center", alignItems:"center"}}>
      <Text>Accueil</Text>
      <View style={styles.button}></View>
      <Button title="Voir Profil" onPress={handleClickProfil}/>
      <View style={styles.button}></View>
      <Button title="Création d'un compte" onPress={handleClickConnexion}/>

      <FlatList 
        data={etudiants}
        renderItem={function({item}){
        return <View style={{ flexDirection: "row", borderWidth: 1 , borderBlockColor: "black", padding: 5, alignItems:"center"}}>
        <Button onPress={function(){
          navigation.navigate("formupdate" , {id : item.id })
        }} color="orange" title="modif"/>
        <Button onPress={function(){  
          supprimer(item.id)
        }} color="red" title="supr"/>
        <Text>nom: {item.nom} - âge: {item.age} - email: {item.email}</Text>
      </View>
      }}
      />
      <DateTimePicker value={new Date()} />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 350,
    height: 200,
    backgroundColor: '#3f7ecc',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    backgroundColor: "white",
    marginBottom: 20,
  },
});

export default Acceuil;