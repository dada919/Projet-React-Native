import { StyleSheet, Text, View , Button , TextInput } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaProduit } from "../verif/produit"
import db from "../config"
import { getDoc, updateDoc , doc } from "firebase/firestore"
import { useUpdate } from '../context/updateContext';

const FormUpdateProduit =  ({navigation , route }) => {
    const [id, setId]= useState("");
    const [nom, setNom]= useState("");
    const [description, setDescription]= useState("");
    const [image, setImage]= useState("");
    const [auteur, setAuteur]= useState("");
    const [erreurs, setErreurs]= useState([]);
    const { setUpdateList } = useUpdate();

    const currentDateISO = new Date().toISOString();
    const dt_creation = currentDateISO.split('T')[0];

    
    const UpdateListDashboardHandler = route.params.UpdateListDashboardHandler;

    useEffect(() => {
        const id = route.params.id;
        setId(id);
        getDoc(doc(db, "oeuvre", id)).then(function (snapShot) {
            const { nom, description, image, auteur } = snapShot.data();
            setNom(nom);
            setDescription(description);
            setImage(image);
            setAuteur(auteur);
        });
    }, [route.params.id]);

    const handleSubmit = async () => {
        const produit = { nom, description, image, auteur, dt_creation };
        const { error } = schemaProduit.validate(produit, { abortEarly: false });
        setErreurs([]);
        if (!error) {
            await updateDoc(doc(db, "oeuvre", id), produit);
            UpdateListDashboardHandler();
            setUpdateList(true);
            alert("Modification ajoutée dans la base de données");
        } else {
            const tableauErreurs = error.details.map(function (item) { return item.message });
            setErreurs(tableauErreurs);
        }
    };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Modifier un produit</Text>
        <Text style={styles.title2}>Nom:</Text>
        <TextInput style={styles.input} placeholder={nom} onChangeText={function(text){ setNom(text) ; setErreurs([]);}} value={nom} />
        <Text style={styles.title2}>Desciption:</Text>
        <TextInput style={styles.input} placeholder={description} onChangeText={function(text){ setDescription(text) ; setErreurs([]);}} value={description}/>
        <Text style={styles.title2}>Lien de l'image:</Text>
        <TextInput style={styles.input} placeholder={image} onChangeText={function(text){ setImage(text) ; setErreurs([]);}} value={image}/>
        <View style={styles.button}></View>
        <Button title="modifier" onPress={handleSubmit} color="orange" />
        <View style={{ marginTop : 10 }}>
          <Button onPress={function(){
                navigation.goBack()
            }} title="retour" color="purple"/>
        </View>
      </View>
      <View style={styles.button}></View>
      {erreurs.length > 0 && (
          <View>
            {erreurs.map((erreur, index) => (
              <Text key={index} style={{ color: "red" }}>
                {erreur}
              </Text>
            ))}
          </View>
        )}
    </View>
  )
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
    fontSize: 35,
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

export default FormUpdateProduit