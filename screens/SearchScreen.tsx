import React, {useState} from 'react';
import { Text, View } from '../components/Themed';
import { FlatList, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import { SEARCH_URL } from '../constants/Urls';

export default function SearchScreen() {
  const [searchText, onChangeSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string, value: string, icon_url: string }>>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const search=()=>{
    if(searchText!==""){
      const url = SEARCH_URL+searchText;
      console.log(url, 'url')
      setIsLoaded(false);
      fetch(url)
      .then(res => res.json())
      .then(
        (obj) => {
          setIsLoaded(true);
          setSearchResults(obj.result);
          setTotal(obj.total);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }
    
  }

  const mayBeRenderSearchResults=()=>{
    if(error){
      return <Text>An Error Occured</Text>;
    }

    if(!isLoaded){
      return <Text>Loading</Text>;
    }

    if(searchResults.length===0){
      return <Text>Found 0 results</Text>;
    }

    console.log(searchResults, 'here')

    // icon_url, id, value
    return <FlatList
            data={searchResults}
            renderItem={({item}) => <Text style={styles.item}>{item.value}</Text>
            }
            keyExtractor={(item) => item.id}
          />
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSearchText}
        value={searchText}
        placeholder="Enter Search Text"
      />
      <Button
        title="Search"
        onPress={() => search()}
      />
      {mayBeRenderSearchResults()}
    </SafeAreaView>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input:{
    height: 40,
    width: '80%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item:{
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});
