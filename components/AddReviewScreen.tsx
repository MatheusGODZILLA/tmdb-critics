import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
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

  const handleSubmit = () => {
    const ratingNumber = parseFloat(reviewRating);
    if (!reviewTitle || !reviewDescription || isNaN(ratingNumber) || ratingNumber < 0 || ratingNumber > 10) {
      Alert.alert('Erro', 'Preencha todos os campos corretamente. A nota deve estar entre 0 e 10.');
      return;
    }

    onSubmit({
      title: reviewTitle,
      description: reviewDescription,
      rating: ratingNumber,
    });

    Alert.alert('Sucesso', 'Resenha adicionada com sucesso!');
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.movieTitle}>{movie.title}</Text>

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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  movieTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007BFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#6C757D',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AddReviewScreen;