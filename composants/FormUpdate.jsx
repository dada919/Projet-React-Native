import { StyleSheet, Text, View , Button , TextInput , FlatList } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaEtudiant } from "../joi/etudiant"
import db from "../config"
import {  getDoc, updateDoc , doc  } from "firebase/firestore"

const FormUpdate =  ({navigation , route }) => {
    const [id, setId]= useState("");
    const [nom, setNom]= useState("");
    const [age, setAge]= useState("0");
    const [email, setEmail]= useState("");
    const [erreurs, setErreurs]= useState([]);

    useEffect( function(){
        const id = route.params.id;
        setId(id);
        getDoc(doc(db , "etudiant", id)).then(function(snapShot){
            const {email , nom , age} = snapShot.data()
            setAge(age.toString());
            setEmail(email);
            setNom(nom); 
        })
    } , [])


    const handleSubmit = async () => {
       
        const etudiant = { nom , age , email }
        const { error } = schemaEtudiant.validate( etudiant , {abortEarly : false}); 
        // effectuer les 11 verifications 
        setErreurs([]);
        if(!error){ // si erreur est undefined 
            
            await updateDoc(doc(db, "etudiant" , id) , etudiant)
            // ici on va pouvoir effecter l'ajout
            navigation.push('accueil') ; // retour à la page d'accueil ! 
             
        }else {
            const tableauErreurs = error.details.map(function(item){ return item.message });
            setErreurs(tableauErreurs);
        }

    }
  return (
    <View>
      <Text>Modifier un profil etudiant</Text>
      <TextInput placeholder="nom" onChangeText={function(text){ setNom(text) ; setErreurs([]);}} value={nom} style={styles.input} />
      <TextInput placeholder="age" onChangeText={function(text){ setAge(text) ; setErreurs([]);}} value={age} style={styles.input} keyboardType="numeric"/>
      <TextInput placeholder="email" onChangeText={function(text){ setEmail(text) ; setErreurs([]);}} value={email} style={styles.input}/>
      <Button title="modifier" onPress={handleSubmit} color="orange" />
      <FlatList 
        data={erreurs}
        renderItem={function({item}){ return <Text>{item}</Text> }}
      />
      <View style={{ marginTop : 10 }}>
      <Button onPress={function(){
            navigation.goBack()
        }} title="retour à l'accueil" color="purple"/>
      </View>
    </View>
  )
}
export default FormUpdate

const styles = StyleSheet.create({
    input : {
        borderColor : "black" , padding : 10 , borderWidth : 2 , marginVertical : 10
    }
})