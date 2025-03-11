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
import AddReviewScreen from './AddReviewScreen';

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
    <Modal visible={visible} animationType="slide" onRequestClose={onClose} transparent={true}>
      {reviewVisible ? (
        <AddReviewScreen
          movie={movie}
          onClose={() => setReviewVisible(false)}
          onSubmit={(review) => {
            console.log('Resenha salva:', review);
          }}
        />
      ) : (
        <View style={styles.modalOverlay}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <View style={styles.container}>
              <Text style={styles.title}>{movie.title}</Text>

              <View style={styles.posterContainer}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                  }}
                  style={styles.moviePoster}
                />
              </View>

              <Text style={styles.description}>
                {movie.overview || 'Sem descrição disponível.'}
              </Text>

              <Text style={styles.rating}>Nota: {movie.vote_average ?? 'N/A'}</Text>

              <TouchableOpacity
                onPress={() => setReviewVisible(true)}
                style={styles.reviewButton}
              >
                <Text style={styles.buttonText}>Adicionar Resenha</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </Modal>
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
    backgroundColor: '#333', // Cor de fundo do modal
    borderRadius: 15,
    elevation: 10,
    width: '90%',
    maxWidth: 600,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff', // Cor do título
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  posterContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },
  moviePoster: {
    width: 250,
    height: 375,
    borderRadius: 12,
  },
  description: {
    textAlign: 'center',
    fontSize: 16,
    marginVertical: 20,
    color: '#ccc', // Cor da descrição
    lineHeight: 24,
  },
  rating: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 25,
    color: '#fff', // Cor da nota
    backgroundColor: '#444', // Cor de fundo da nota
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  reviewButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 30,
    width: '85%',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  closeButton: {
    backgroundColor: '#6C757D',
    padding: 16,
    borderRadius: 30,
    width: '85%',
    alignItems: 'center',
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

export default MovieDetailsModal;