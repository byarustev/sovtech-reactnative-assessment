import React, {useContext, useState, useEffect}  from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {CategoriesContext} from '../context/CategoriesContext';
import {CATEGORIES_URL} from '../constants/Urls';

export default function HomeScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [categories, setCategories] = useContext(CategoriesContext);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch(CATEGORIES_URL)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setCategories(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
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
            data={categories}
            renderItem={({item}) => <Text onPress={() =>{
              navigation.navigate('CategoryJoke',{ category: item});
            }} style={styles.item}>{item}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
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
});
