import React, {useContext, useState, useEffect}  from 'react';
import axios from 'axios';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { RootTabScreenProps } from '../types';
import {CategoriesContext} from '../context/CategoriesContext';
import {CATEGORIES_URL} from '../constants/Urls';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [categories, setCategories] = useContext(CategoriesContext);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData= async () => {
      await axios.get(CATEGORIES_URL)
      .then(response => {
        setIsLoaded(true);
        setCategories(response.data);
      })
      .catch((error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    } 

    fetchData();
  }, [])

  const maybeRenderCategories= ()=>{
    if(error){
      return <Text>An Error Occured</Text>;
    }

    if(!isLoaded){
      return <Text>Loading</Text>;
    }

    if(categories.length===0){
      return <Text>Found 0 categories</Text>;
    }

    return <FlatList
            data={categories.slice(0, 20)} // pick out only a few items, in future the results could be paginated
            renderItem={({item}) => <View style={styles.itemView}><Text onPress={() =>{
              navigation.navigate('CategoryJoke',{ category: item});
            }} style={styles.item} testID={`test-${item}`} >{item}</Text></View>
            }
            keyExtractor={(item, index) => index.toString()}
          />
  }

  return (
    <View style={styles.container}>
      {maybeRenderCategories()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  itemView:{
    borderBottomWidth: 0.3,
    borderBottomColor: '#D3D3D3',
  }
});
