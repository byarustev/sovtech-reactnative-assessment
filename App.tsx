import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { CategoriesProvider } from './context/CategoriesContext';
import { CategoryJokeProvider } from './context/CategoryJokeContext';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <CategoriesProvider>
          <CategoryJokeProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </CategoryJokeProvider>
        </CategoriesProvider>
      </SafeAreaProvider>
    );
  }
}
