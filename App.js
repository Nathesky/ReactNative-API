import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, ScrollView } from 'react-native';

const request = async (callback) => {
  try {
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=100');
    const parsed = await response.json();
    callback(parsed);
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
};

export default function App() {
  const [registro, setRegistro] = useState([]);

  useEffect(() => {
    request(setRegistro);
  }, []);

  return (

    <ScrollView styles={styles.body}>

    <View style={styles.header}>
    <StatusBar style="auto" backgroundColor='#A0FFE8' />
    <Text style={styles.tit}>API Imagens</Text>
    </View>

    <FlatList
        data={registro}
        numColumns={1}
        renderItem={({ item }) => (
          <View style={styles.cd}>
            <Text style={styles.subtitle}>Autor: {item.author}</Text>
            <Text style={styles.idTxt}>ID: {item.id}</Text>
            <View style={styles.card}>
            <Image style={styles.img} source={{ uri: item.download_url }} />
          </View>
          </View>

        )}
      /> 
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header:{
    marginTop: 40,
    height: 70,
    width: '95%',
    margin: 10,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FF3DB5',
    borderRadius: 20,
  },
  cd:{
    justifyContent: 'center',
    alignItems: 'center',
  },
  card:{
    margin: 75,
    width: 250,
    height: 250,
    transform: [{ rotate: '45deg' }],
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A0FFE8',
    borderRadius: 15,
  },
  img: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 15,
    transform: [{ rotate: '-45deg' }],
  },
  tit:{
    fontSize: 20,
    letterSpacing: 4,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#f5f5f5'
  },
  subtitle:{
    fontSize: 16,
    letterSpacing: 2,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#FF3DB5'
  },
  idTxt:{
    fontSize: 16,
    color: '#3d3d3d',
  }
  }
);