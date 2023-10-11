import { Text, View, Button, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, FlatList } from "react-native"
import React, { useEffect, useState } from 'react';
import db from "../config"
import { deleteDoc , doc , getDocs, collection } from "firebase/firestore"
import { useUpdate } from '../context/updateContext';

function Accueil({ navigation }) {
  const [produits, setProduits] = useState([]);
  const { updateList, setUpdateList } = useUpdate();

  useEffect(function () {
    getDocs(collection(db, 'oeuvre'))
      .then(function (snapShot) {
        const data = [];
        snapShot.docs.map(function (doc) {
          data.push({ ...doc.data(), id: doc.id });
        });
        setProduits(data);
        setUpdateList(false);
      });
  }, [updateList]);

  return (
    <>
      <View style={styles.Menu}>
        <TouchableOpacity onPress={() => navigation.navigate('connexion')} style={styles.Button}>
          <Text style={styles.ButtonText}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('dashboard')} style={styles.Button}>
          <Text style={styles.ButtonText}>Dashboard</Text>
        </TouchableOpacity>
      </View>
      <FlatList 
        data={produits}
        renderItem={function({item}){
        return <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate('single', { produit: item  })}>
          <Image
            style={styles.cardImage}
            source={{ uri: item.image }}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <View style={styles.produitInfo}>
          <Text style={styles.produitTitre}>{item.nom}</Text>
        </View>
      </View>
      }}
      />
    </>
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
    marginTop: 16,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 400,
  },
  produitInfo: {
    padding: 10,
    backgroundColor: 'white',
  },
  produitTitre: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:"center",
  },
  Menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  Button: {
    backgroundColor: '#3f7ecc',
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    width: '50%',
  },
  ButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Accueil;