import React, {useContext, useState, useEffect}  from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { CategoryJokeScreenProps } from '../types';
import {CategoryJokeContext} from '../context/CategoryJokeContext';
import {CATEGORY_DETAILS_JOKE_URL} from '../constants/Urls';

export default function CategoryJokeScreen({ route  }: CategoryJokeScreenProps) {
  const [joke, setJoke] = useContext(CategoryJokeContext);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const {category} = route.params;
  const url = CATEGORY_DETAILS_JOKE_URL + category;
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setJoke(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const maybeRenderCategoryJoke= ()=>{
    if(error){
      return <Text>An Error Occured</Text>;
    }

    if(!isLoaded){
      return <Text>Loading</Text>;
    }

    return <Text> {joke.value}</Text>
  }

  return (
    <View style={styles.container}>
      {maybeRenderCategoryJoke()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
