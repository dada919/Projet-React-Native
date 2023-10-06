import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

function Produit({route}) {
  const { produit } = route.params;

  return (
        <>
          <View style={styles.catContainer}>
            <Image source={{ uri: produit.image }} style={styles.image}/>
            <View style={styles.descriptionContainer}>
              <View style={styles.titreProduit}>
                <Text style={styles.titre}>{produit.nom}</Text>
              </View>
              <Text style={styles.descriptionProduit}>{produit.description}</Text>
              <Text style={styles.descriptionProduit}>Date de paruption: {produit.dt_creation}</Text>
            </View>
          </View>
        </>
  );
}

const styles = StyleSheet.create({
  titreProduit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
  },
  titre: {
    flex: 1,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: "center",
  },
  descriptionContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
  descriptionProduit: {
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default Produit;
