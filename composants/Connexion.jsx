import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { useEffect } from 'react';
import { schemaConnexion } from '../verif/connexion';
import db from "../config"
import { deleteDoc , doc , getDocs, collection } from "firebase/firestore"
import { useAuth } from '../context/authContext';

function Connexion({ navigation }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [erreurs, setErreurs] = useState([]);
  const [gestionnaire, setGestionnaire] = useState("");
  const [loading, setLoading] = useState(true);
  const { setIsLoggedIn, setAccountEmail, setAccountRole, setAccountId } = useAuth();

  useEffect(() => {
    const fetchGestionnaires = async () => {
      const gestionnairesCollection = collection(db, "gestionnaire");
      const snapShot = await getDocs(gestionnairesCollection);
      const data = snapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setGestionnaire(data);
      setLoading(false);
    };

    fetchGestionnaires();
  }, []);

  const onSubmit = () => {
    if (loading) {
      return;
    }

    const connexion = { email: login, password };
    const { error } = schemaConnexion.validate(connexion, { abortEarly: false });

    if (error) {
      const tableauErreurs = error.details.map(function (item) {
        return item.message;
      });
      setErreurs(tableauErreurs);
      return;
    }

    const isLoginValid = gestionnaire.some((gest) => gest.email === login);

    if (!isLoginValid) {
      alert("Email invalide");
      return;
    }

    const user = gestionnaire.find((gest) => gest.email === login && gest.password === password);

    if (user) {
      setIsLoggedIn(true);
      setAccountEmail(login);
      setAccountRole(user.role);
      setAccountId(user.id);
      console.log(user.id);
      navigation.navigate('dashboard')
    } else {
      alert("Mot de passe incorrect");
      setIsLoggedIn(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.title2}>Login:</Text>
        <TextInput
          style={styles.input}
          value={login}
          onChangeText={(text) => setLogin(text)}
          placeholder="Login"
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
        <View style={styles.button}></View>
        <Button title='Login' onPress={onSubmit} />
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
    height: 382,
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

export default Connexion;
