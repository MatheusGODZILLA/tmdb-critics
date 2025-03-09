import React, { useState } from 'react';
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import AddReviewScreen from './AddReviewScreen'; // Importando a tela de resenha

interface MovieDetailsModalProps {
  movie: any;
  visible: boolean;
  onClose: () => void;
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  visible,
  onClose,
}) => {
  const [reviewVisible, setReviewVisible] = useState(false);

  if (!movie) return null;

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      {reviewVisible ? (
        <AddReviewScreen
          movie={movie}
          onClose={() => setReviewVisible(false)}
          onSubmit={(review) => {
            console.log('Resenha salva:', review);
          }}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.modalContent}>
          <View style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>

            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
              style={styles.moviePoster}
            />

            <Text style={styles.description}>
              {movie.overview || 'Sem descrição disponível.'}
            </Text>

            <Text style={styles.rating}>Nota: {movie.vote_average ?? 'N/A'}</Text>

            <TouchableOpacity
              onPress={() => setReviewVisible(true)}
              style={styles.reviewButton}>
              <Text style={styles.buttonText}>Adicionar Resenha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 10,
    width: '90%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  moviePoster: {
    width: 250,
    height: 375,
    borderRadius: 12,
    marginBottom: 15,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 15,
    color: '#555',
    lineHeight: 22,
  },
  rating: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
    color: '#444',
  },
  reviewButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
  },
  closeButton: {
    backgroundColor: '#6C757D',
    padding: 14,
    borderRadius: 25,
    width: '80%',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default MovieDetailsModal;
