import React from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/authContext';
import { useState, useEffect } from 'react';
import { deleteDoc , doc , getDocs, collection } from "firebase/firestore"
import db from "../config"
import { useUpdate } from '../context/updateContext';

const Dashboard = ({navigation}) => {
  const { accountEmail } = useAuth();
  const { accountRole } = useAuth();
  const { isLoggedIn } = useAuth();
  const { accountId } = useAuth();
  const [UpdateListDashboard , setUpdateListDashboard] = useState(false);
  const { setUpdateList } = useUpdate();

  const [produits, setProduits] = useState([]);

  const UpdateListDashboardHandler = () => {
    setUpdateListDashboard(!UpdateListDashboard);
  };

  useEffect( function(){ 

    getDocs(collection(db, "oeuvre"))
    .then(function(snapShot){
      const data = [];
      snapShot.docs.map(function(doc){
        data.push({...doc.data() , id : doc.id})
      })
      setProduits(data);
    })

} , [UpdateListDashboard])

const supprimer = (id) => {
  deleteDoc(doc(db , "oeuvre" , id)).then(function(){
      setUpdateListDashboard(!UpdateListDashboard);
      setUpdateList(true);
  });
}

if (!isLoggedIn) {
  return (
    <View style={styles.container}>
      <Text style={styles.notLoggedInText}>Vous devez vous connecter</Text>
      <Button title='Se connecter' onPress={() => navigation.navigate('connexion')}/>
    </View>
  );
}

  return (
    <View>
        <View style={styles.container}>
        <View style={styles.card}>
            <View style={styles.zoneGauche}>
            <View style={styles.zoneGaucheTop}>
            <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                style={styles.profileImage}
                />
                <View style={styles.zoneGaucheNom}>
                <Text style={styles.h2}>{accountEmail}</Text>
                <Text style={styles.h3}>Role: {accountRole}</Text>
                </View>
            </View>
            </View>
            <View style={styles.zoneDroite}>
            <TouchableOpacity onPress={() => navigation.navigate('formpassword')}>
            <Text style={styles.h1}>...</Text>
            </TouchableOpacity>
            </View>
        </View>
      </View>

      {accountRole === 'admin' && (
      <View>
        <View style={styles.ButtonCompte}>
          <TouchableOpacity onPress={() => navigation.navigate('compte')} style={styles.Button}>
            <Text style={styles.ButtonText}>Gérer les comptes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ButtonCompte}>
          <TouchableOpacity onPress={() => navigation.navigate('formcreateproduit', { UpdateListDashboardHandler })} style={styles.Button}>
            <Text style={styles.ButtonText}>Ajouter un Produit</Text>
          </TouchableOpacity>
        </View>

          <FlatList 
            data={produits}
            style={{ maxHeight: '70%' }}
            renderItem={function({item}){
            return <View style={{ flexDirection: "row", borderWidth: 1 , borderBlockColor: "black", padding: 5, alignItems:"center", padding: 10}}>
            <View>
              <Button onPress={function(){
                navigation.navigate("formupdateproduit" , {id : item.id, UpdateListDashboardHandler })
              }} color="orange" title="modif"/>
              <Button onPress={function(){  
                supprimer(item.id)
              }} color="red" title="supr"/>
            </View>
            <Text style={{ padding: 10, width: 150}}>Nom: {item.nom}</Text>
            <Image
              style={styles.cardImage}
              source={{ uri: item.image }}
              resizeMode="cover"
            />
          </View>
          }}
          />
      </View>
      )}

      {accountRole === 'redacteur' && (
        <View>
          <View style={styles.ButtonCompte}>
            <TouchableOpacity onPress={() => navigation.navigate('formcreateproduit', { UpdateListDashboardHandler })} style={styles.Button}>
              <Text style={styles.ButtonText}>Ajouter un Produit</Text>
            </TouchableOpacity>
          </View>

            <FlatList 
            data={produits.filter(item => item.auteur === accountId)}
            style={{ maxHeight: '70%' }}
            renderItem={function({item}){
            return <View style={{ flex: 1, flexDirection: "row", borderWidth: 1 , borderBlockColor: "black", padding: 5, alignItems:"center"}}>
              <View>
                <Button onPress={function(){
                  navigation.navigate("formupdateproduit" , {id : item.id, UpdateListDashboardHandler })
                }} color="orange" title="modif"/>
                <Button onPress={function(){  
                  supprimer(item.id)
                }} color="red" title="supr"/>
              </View>
              <Text style={{ padding: 10, width: 150}}>{item.nom}</Text>
              <Image
                style={styles.cardImage}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
            </View>
            }}
            />
        </View>
      )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: "98%",
    backgroundColor: '#3f7ecc',
    padding: 16,
    borderRadius: 15,
    flexDirection: 'row',
    color: 'white',
    fontFamily: 'sans-serif',
  },
  zoneGauche: {
    flex: 3,
  },
  zoneGaucheTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 35,
  },
  zoneGaucheNom: {},
  h2: {
    fontSize: 18,
    color: "white",
  },
  h3: {
    fontSize: 14,
    marginBottom: 24,
    color: "white",
  },
  zoneGaucheBottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  zoneGaucheSocial: {
    flexDirection: 'column',
    marginLeft: 10,
    textAlign: 'center',
  },
  zoneDroite: {
    flex: 1,
    alignItems: 'center',
  },
  zoneDroiteTop: {
    fontSize: 40,
    marginTop: 50,
  },
  h1: {
    fontSize: 35,
    color: "white",
    lineHeight: 25,
    marginTop: 20,
  },
  notLoggedInText: {
    marginBottom: 30,
    fontSize: 20,
    color: "red",
  },
  ButtonCompte: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  Button: {
    backgroundColor: '#3f7ecc',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    width: '50%',
    borderRadius: 20,
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cardImage: {
    width: '40%',
    height: 100,
    borderRadius: 20,
  },
});

export default Dashboard;
