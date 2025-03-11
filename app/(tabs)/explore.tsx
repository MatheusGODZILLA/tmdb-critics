import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  interface Review {
    id: number;
    original_title: string;
    vote_average: number;
    description: string;
  }

  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3333/reviews');
      if (!response.ok) {
        throw new Error('Erro ao buscar críticas');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleSaveReview = async () => {
    if (!selectedReview) return;
    try {
      const response = await fetch(`http://localhost:3333/reviews/${selectedReview.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedReview),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar a crítica');
      }
      Alert.alert('Sucesso', 'Crítica atualizada com sucesso!');
      fetchReviews();
      setSelectedReview(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a crítica.');
    }
  };

  const handleDeleteReview = async () => {
    if (!selectedReview) return;
    try {
      const response = await fetch(`http://localhost:3333/reviews/${selectedReview.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar a crítica');
      }
      Alert.alert('Sucesso', 'Crítica deletada com sucesso!');
      fetchReviews();
      setSelectedReview(null);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar a crítica.');
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F8F9FA', dark: '#1E1E1E' }}
      headerImage={<IconSymbol size={310} color="#6C757D" name="film" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Críticas Recentes</ThemedText>
      </ThemedView>
      <ScrollView style={styles.reviewList}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <TouchableOpacity key={review.id} style={styles.reviewCard} onPress={() => setSelectedReview(review)}>
              <Text style={styles.reviewTitle}>{review.original_title}</Text>
              <Text style={styles.reviewRating}>⭐ {review.vote_average.toFixed(1)}</Text>
              <Text style={styles.reviewDescription}>{review.description}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noReviewsText}>Nenhuma crítica encontrada.</Text>
        )}
      </ScrollView>
      {selectedReview && (
        <Modal visible animationType="fade" transparent onRequestClose={() => setSelectedReview(null)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <TouchableOpacity style={styles.closeIcon} onPress={() => setSelectedReview(null)}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Editar Resenha</Text>
              <TextInput
                style={styles.input}
                value={selectedReview.original_title}
                onChangeText={(text) => setSelectedReview({ ...selectedReview, original_title: text })}
                placeholder="Título do Filme"
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                value={selectedReview.description}
                onChangeText={(text) => setSelectedReview({ ...selectedReview, description: text })}
                placeholder="Descrição"
                multiline
              />
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={String(selectedReview.vote_average)}
                onChangeText={(text) => setSelectedReview({ ...selectedReview, vote_average: parseFloat(text) })}
                placeholder="Nota (0-10)"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSaveReview} style={styles.saveButton}>
                  <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteReview} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Deletar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#6C757D',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  reviewList: {
    paddingHorizontal: 16,
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#CED4DA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343A40',
    marginBottom: 5,
  },
  reviewRating: {
    fontSize: 16,
    color: '#FFD700',
    marginBottom: 5,
  },
  reviewDescription: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 10,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    backgroundColor: '#28A745',
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: 'red',
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  noReviewsText: {
    color: '#6C757D',
    textAlign: 'center',
    marginVertical: 20,
  },
});