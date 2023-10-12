import { StyleSheet, Text, View , Button , TextInput } from 'react-native'
import React , {useState , useEffect} from 'react'
import { schemaAccount, schemaProduit } from "../verif/account"
import db from "../config"
import { getDoc, updateDoc , doc } from "firebase/firestore"
import { useUpdate } from '../context/updateContext';
import { Picker } from '@react-native-picker/picker';

const FormUpdateProduit =  ({navigation , route }) => {
    const [id, setId]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [role, setRole]= useState("");
    const [erreurs, setErreurs]= useState([]);
    const { setUpdateAccount } = useUpdate();
    
    const UpdateAccountDashboardHandler = route.params.UpdateAccountDashboardHandler;

    useEffect(() => {
        const id = route.params.id;
        setId(id);
        getDoc(doc(db, "gestionnaire", id)).then(function (snapShot) {
            const { email, password, role } = snapShot.data();
            setEmail(email);
            setPassword(password);
            setRole(role);
        });
    }, [route.params.id]);

    const handleSubmit = async () => {
        const produit = { email, password, role };
        const { error } = schemaAccount.validate(produit, { abortEarly: false });
        setErreurs([]);
        if (!error) {
            await updateDoc(doc(db, "gestionnaire", id), produit);
            UpdateAccountDashboardHandler();
            setUpdateAccount(true);
            alert("Modification ajoutée dans la base de données");
        } else {
            const tableauErreurs = error.details.map(function (item) { return item.message });
            setErreurs(tableauErreurs);
        }
    };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Modifier un compte</Text>
        <Text style={styles.title2}>Email:</Text>
        <TextInput style={styles.input} placeholder={email} onChangeText={function(text){ setEmail(text) ; setErreurs([]);}} value={email} />
        <Text style={styles.title2}>Mot de passe:</Text>
        <TextInput style={styles.input} placeholder={password} onChangeText={function(text){ setPassword(text) ; setErreurs([]);}} value={password}/>
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