import React, {useState} from 'react';
import axios from 'axios';
import { Text, View } from '../components/Themed';
import { FlatList, SafeAreaView, StyleSheet, TextInput, Button } from 'react-native';
import { SEARCH_URL } from '../constants/Urls';

export default function SearchScreen() {
  const [searchText, onChangeSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<Array<{ id: string, value: string, icon_url: string }>>([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const search=async ()=>{
    if(searchText!==""){
      const url = SEARCH_URL+searchText;
      setIsLoaded(false);

      await axios.get(url)
        .then(response => {
          setIsLoaded(true);
          setSearchResults(response.data.result);
          setTotal(response.data.total);
        })
        .catch((error) => {
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

    return <FlatList
            data={searchResults.slice(0,20)} // pick out only a few items, in future the results could be paginated
            renderItem={({item}) => <View style={styles.itemView}><Text style={styles.item}>{item.value}</Text></View>
            }
            keyExtractor={(item) => item.id}
          />
  }

  return (
    <SafeAreaView>
      <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSearchText}
        value={searchText}
        placeholder="Enter Search Text"
        testID="search-input"
      />
      <Button
        title="Search"
        onPress={() => search()}
      />
      </View>
      <View style={styles.searchResultContainer}>
      {mayBeRenderSearchResults()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: '32em',
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchResultContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  input:{
    height: 40,
    width: '70%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item:{
    padding: 10,
    fontSize: 18,
    justifyContent: 'space-evenly',
  },
  itemView:{
    borderBottomWidth: 0.3,
    borderBottomColor: '#D3D3D3',
  }
});
