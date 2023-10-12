import React from 'react';
import { View, Text, Image, StyleSheet, Button, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/authContext';
import { useState, useEffect } from 'react';
import { deleteDoc , doc , getDocs, collection } from "firebase/firestore"
import db from "../config"
import { useUpdate } from '../context/updateContext';

const Compte = ({navigation}) => {
  const { accountEmail } = useAuth();
  const { accountRole } = useAuth();
  const { isLoggedIn } = useAuth();
  const [UpdateAccountDashboard , setUpdateAccountDashboard] = useState(false);
  const { setUpdateAccount } = useUpdate();

  const [produits, setProduits] = useState([]);

  const UpdateAccountDashboardHandler = () => {
    setUpdateAccountDashboard(!UpdateAccountDashboard);
  };

  useEffect( function(){ 

    getDocs(collection(db, "gestionnaire"))
    .then(function(snapShot){
      const data = [];
      snapShot.docs.map(function(doc){
        data.push({...doc.data() , id : doc.id})
      })
      setProduits(data);
    })

} , [UpdateAccountDashboard])

const supprimer = (id) => {
  deleteDoc(doc(db , "gestionnaire" , id)).then(function(){
      setUpdateAccountDashboard(!UpdateAccountDashboard);
      setUpdateAccount(true);
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
          <TouchableOpacity onPress={() => navigation.navigate('dashboard')} style={styles.Button}>
            <Text style={styles.ButtonText}>Gérer les Produit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.ButtonCompte}>
          <TouchableOpacity onPress={() => navigation.navigate('formcreateaccount', { UpdateAccountDashboardHandler })} style={styles.Button}>
            <Text style={styles.ButtonText}>Ajouter un Compte</Text>
          </TouchableOpacity>
        </View>

          <FlatList 
            data={produits}
            renderItem={function({item}){
            return <View style={{ flexDirection: "row", borderWidth: 1 , borderBlockColor: "black", padding: 5, alignItems:"center", padding: 10}}>
            <View>
              <Button onPress={function(){
                navigation.navigate("formupdateaccount" , {id : item.id, UpdateAccountDashboardHandler })
              }} color="orange" title="modif"/>
              <Button onPress={function(){  
                supprimer(item.id)
              }} color="red" title="supr"/>
            </View>
            <View style={styles.container}>
            <View style={styles.cardFlatlist}>
                <View style={styles.zoneGauche}>
                <View style={styles.zoneGaucheTop}>
                    <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
                    style={styles.profileImage}
                    />
                    <View style={styles.zoneGaucheNom}>
                    <Text style={styles.h2}>{item.email}</Text>
                    <Text style={styles.h3}>Role: {item.role}</Text>
                    </View>
                </View>
            </View>
        </View>
      </View>

          </View>
          }}
          />
      </View>
      )}

      {accountRole === 'redacteur' && (
        <View>
          <View style={styles.ButtonCompte}>
            <TouchableOpacity onPress={() => navigation.navigate('dashboard')} style={styles.Button}>
              <Text style={styles.ButtonText}>Retourner au dashboard</Text>
            </TouchableOpacity>
            <Text style={styles.ButtonText}>Vous n'êtes pas autorisé à accéder à cette page</Text>
          </View>
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
    width: 350,
    height: 110,
    backgroundColor: '#3f7ecc',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    color: 'white',
    fontFamily: 'sans-serif',
  },
  cardFlatlist: {
    width: 260,
    height: 110,
    backgroundColor: '#3f7ecc',
    padding: 20,
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
  number: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  text: {
    fontSize: 10,
    color: "white",
  },
  zoneDroite: {
    flex: 1,
    alignItems: 'center',
  },
  zoneDroiteTop: {
    fontSize: 40,
    lineHeight: 10,
    marginBottom: 50,
  },
  zoneDroiteMiddle: {
    flexDirection: 'column',
  },
  h1: {
    fontSize: 35,
    color: "white",
    lineHeight: 25,
    marginBottom: 15,
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

export default Compte;
