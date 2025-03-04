import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchMovies = async (query: string) => {
    const baseUrl = 'https://api.themoviedb.org/3/search/movie';
    const url = `${baseUrl}?query=${encodeURIComponent(query)}&language=pt-BR&page=1&region=pt`;

    const token = process.env.TMDB_API_KEY;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token?.toString()}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const json = await response.json();
      setMovies(json.results || []);
    } catch (err) {
      console.error(err);
    }
  };

  const openMovieDetails = (movie: any) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar filme por nome..."
          value={search}
          onChangeText={setSearch}
          onSubmitEditing={() => fetchMovies(search)}
        />
        <TouchableOpacity
          onPress={() => fetchMovies(search)}
          style={styles.searchButton}>
          <ThemedText>Buscar</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedView style={styles.moviesContainer}>
        {movies.length > 0 ? (
          movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              onPress={() => openMovieDetails(movie)}
              style={styles.movieItem}>
              <ThemedText>{movie.title}</ThemedText>
            </TouchableOpacity>
          ))
        ) : (
          <ThemedText>Nenhum filme encontrado</ThemedText>
        )}
      </ThemedView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <ScrollView contentContainerStyle={styles.modalContent}>
          {selectedMovie && (
            <>
              <ThemedText type="title">{selectedMovie.title}</ThemedText>
              <ThemedText>{selectedMovie.overview}</ThemedText>
            </>
          )}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}>
            <ThemedText>Fechar</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
  },
  searchButton: {
    marginLeft: 8,
    backgroundColor: '#A1CEDC',
    padding: 8,
    borderRadius: 4,
  },
  moviesContainer: {
    margin: 16,
  },
  movieItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  modalContent: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'center',
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#A1CEDC',
    padding: 8,
    borderRadius: 4,
    alignSelf: 'center',
  },
});
