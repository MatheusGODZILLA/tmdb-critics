import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    Text, // Importando o componente Text padrão
} from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import MovieDetailsModal from '@/components/MovieDetailsModal';

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
                Authorization: `Bearer ${token}`,
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
            headerBackgroundColor={{ dark: '#A1CEDC', light: '#A1CEDC' }} // Cor padrão para o cabeçalho
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar filme por nome..."
                    value={search}
                    onChangeText={setSearch}
                    onSubmitEditing={() => fetchMovies(search)}
                />
                <TouchableOpacity
                    onPress={() => fetchMovies(search)}
                    style={styles.searchButton}
                >
                    <Text style={styles.searchText}>Buscar</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.moviesContainer}>
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <TouchableOpacity
                            key={movie.id}
                            onPress={() => openMovieDetails(movie)}
                            style={styles.movieItem}
                        >
                            <Text style={styles.movieTitle}>{movie.title}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.noMoviesText}>Nenhum filme encontrado</Text>
                )}
            </ScrollView>

            <MovieDetailsModal
                movie={selectedMovie}
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginRight: 8,
    },
    searchButton: {
        backgroundColor: '#007BFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    searchText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    moviesContainer: {
        margin: 16,
    },
    movieItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    movieTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    noMoviesText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: '#666',
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});