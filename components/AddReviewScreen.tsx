import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

interface AddReviewScreenProps {
  movie: any;
  onClose: () => void;
  onSubmit: (review: { title: string; description: string; rating: number }) => void;
}

const AddReviewScreen: React.FC<AddReviewScreenProps> = ({
  movie,
  onClose,
  onSubmit,
}) => {
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewDescription, setReviewDescription] = useState('');
  const [reviewRating, setReviewRating] = useState('');

  const handleSubmit = async () => {
    const ratingNumber = parseFloat(reviewRating);
    if (!reviewTitle || !reviewDescription || isNaN(ratingNumber) || ratingNumber < 0 || ratingNumber > 10) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente. A nota deve estar entre 0 e 10.');
      return;
    }

    const reviewMovie = {
      movie_title: movie.title,
      poster_path: movie.poster_path,
      original_title: reviewTitle,
      vote_average: ratingNumber,
      description: reviewDescription,
    };

    try {
      const response = await fetch('http://localhost:3333/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewMovie),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error adding review:', errorData);
        Alert.alert('Erro', 'Falha ao adicionar resenha. Tente novamente.');
        return;
      }

      Alert.alert('Sucesso', 'Resenha adicionada com sucesso!');
      onClose();
    } catch (error) {
      console.error('Network error:', error);
      Alert.alert('Erro', 'Erro de rede. Verifique sua conexão.');
    }

    onSubmit({
      title: reviewTitle,
      description: reviewDescription,
      rating: ratingNumber,
    });
  };

  return (
    <View style={styles.modalOverlay}>
      <ScrollView contentContainerStyle={styles.modalContent}>
        <View style={styles.container}>
          <Text style={styles.movieTitle}>Adicionar Resenha</Text>

          <View style={styles.movieInfo}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
              style={styles.moviePoster}
            />
            <View style={styles.movieDetails}>
              <Text style={styles.movieOriginalTitle}>{movie.original_title}</Text>
              <Text style={styles.movieReleaseDate}>{movie.release_date}</Text>
            </View>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Título da Resenha"
            value={reviewTitle}
            onChangeText={setReviewTitle}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição"
            value={reviewDescription}
            onChangeText={setReviewDescription}
            multiline
          />

          <TextInput
            style={styles.input}
            placeholder="Nota (0-10)"
            keyboardType="numeric"
            value={reviewRating}
            onChangeText={setReviewRating}
          />

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.buttonText}>Salvar Resenha</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 15,
    elevation: 10,
    width: '90%',
    maxWidth: 400,
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  movieInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  moviePoster: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  movieDetails: {
    flex: 1,
  },
  movieOriginalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  movieReleaseDate: {
    fontSize: 14,
    color: '#ccc',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 15,
    backgroundColor: '#444',
    color: '#fff',
    width: '100%', // Adicionado para definir a largura dos inputs como 100%
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 30,
    width: '85%',
    alignItems: 'center',
    marginTop: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cancelButton: {
    backgroundColor: '#6C757D',
    padding: 16,
    borderRadius: 30,
    width: '85%',
    alignItems: 'center',
    marginTop: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default AddReviewScreen;