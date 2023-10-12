import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useEffect } from 'react';
import { schemaConnexion } from '../verif/connexion';
import db from "../config"
import { updateDoc, doc , getDocs, collection } from "firebase/firestore"
import { useAuth } from '../context/authContext';
import { useUpdate } from '../context/updateContext';
function FormPassword({ navigation }) {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [erreurs, setErreurs] = useState([]);
  const [gestionnaire, setGestionnaire] = useState("");
  const { isLoggedIn } = useAuth();
  const { accountEmail } = useAuth();
  const {setUpdateAccount} = useUpdate();

  useEffect(() => {
    const fetchGestionnaires = async () => {
      const gestionnairesCollection = collection(db, "gestionnaire");
      const snapShot = await getDocs(gestionnairesCollection);
      const data = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGestionnaire(data);
    };
    fetchGestionnaires();
  }, []);

  const onSubmit = async () => {
    const connexion = { email: email, password };
    const { error } = schemaConnexion.validate(connexion, { abortEarly: false });
  
    if (error) {
      const tableauErreurs = error.details.map(function (item) {
        return item.message;
      });
      setErreurs(tableauErreurs);
      return;
    }
  
    const gestionnaireTrouve = gestionnaire.find((gest) => gest.email === email);
  
    if (!gestionnaireTrouve) {
      alert("Le compte n'existe pas");
      return;
    }
  
    const gestionnaireId = gestionnaireTrouve.id;
  
    try {
      const gestionnaireDoc = doc(db, 'gestionnaire', gestionnaireId);
      await updateDoc(gestionnaireDoc, { password: password });
      setUpdateAccount(true);
      alert('Mot de passe modifié avec succès');
    } catch (error) {
      alert('Une erreur est survenue lors de la mise à jour du mot de passe.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Mot de passe oublié</Text>
        <Text style={styles.title2}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setemail(text)}
          placeholder={isLoggedIn === true ? accountEmail : "Email"}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.title2}>Nouveau mot de passe:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Mot de passe"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.button}></View>
        <Button title='Modifier le mot de passe' onPress={onSubmit} />
      </View>
      <View style={styles.button}></View>
        {erreurs.length > 0 && (
          <View>
            {erreurs.map((erreur, index) => (
              <Text key={index} style={styles.errorText}>
                {erreur}
              </Text>
            ))}
          </View>
        )}
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

  errorText: {
    color: "red",
  },
});

export default FormPassword;
