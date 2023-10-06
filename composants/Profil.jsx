import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profil = () => {
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
                <Text style={styles.h2}>David Borg</Text>
                <Text style={styles.h3}>Title: Flying wings</Text>
                </View>
            </View>
            <View style={styles.zoneGaucheBottom}>
                <View style={styles.zoneGaucheSocial}>
                <Text style={styles.number}>2222</Text>
                <Text style={styles.text}>Lorem.</Text>
                </View>
                <View style={styles.zoneGaucheSocial}>
                <Text style={styles.number}>2222</Text>
                <Text style={styles.text}>Lorem.</Text>
                </View>
                <View style={styles.zoneGaucheSocial}>
                <Text style={styles.number}>2222</Text>
                <Text style={styles.text}>Lorem.</Text>
                </View>
            </View>
            </View>
            <View style={styles.zoneDroite}>
                <Text style={styles.h1}>...</Text>
                <View style={styles.zoneDroiteMiddle}>
                    <Text style={styles.number}>1</Text>
                    <Text style={styles.text}>Ranking</Text>
                </View>
            </View>
        </View>
        </View>
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
    height: 150,
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
});

export default Profil;
