import React, { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
    Text,
} from 'react-native';
import MovieDetailsModal from '@/components/MovieDetailsModal';

export default function HomeScreen() {
    const [search, setSearch] = useState('');
    const [movies, setMovies] = useState<any[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchMovies = async (query: string) => {
        const baseUrl = 'https://filmes-api-1.onrender.com/rdbms';

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ original_title: query }),
        };

        try {
            const response = await fetch(baseUrl, options);
            if (!response.ok) {
                console.error('Erro ao buscar filmes:', response.status);
                setMovies([]);
                return;
            }
            const json = await response.json();
            setMovies(json || []);
        } catch (err) {
            console.error('Erro de rede:', err);
            setMovies([]);
        }
    };

    const openMovieDetails = (movie: any) => {
        setSelectedMovie(movie);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 48, marginBottom: 16, textAlign: 'center' }}>
                TMDB-CRITICS
            </Text>
            <Text style={{ fontSize: 16, marginBottom: 16, textAlign: 'center' }}>
                Dê sua opinião sobre seus filmes favoritos
            </Text>
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
                            key={movie.original_title}
                            onPress={() => openMovieDetails(movie)}
                            style={styles.movieItem}
                        >
                            <Text style={styles.movieTitle}>{movie.original_title}</Text>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        padding: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 25,
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
        elevation: 3,
    },
    searchText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    moviesContainer: {
        flexGrow: 1,
    },
    movieItem: {
        backgroundColor: '#fff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 10,
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
});
