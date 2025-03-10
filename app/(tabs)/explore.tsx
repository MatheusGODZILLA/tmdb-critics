import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Platform, View, ScrollView, Text } from 'react-native';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
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

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={<IconSymbol size={310} color="#808080" name="chevron.left.forwardslash.chevron.right" style={styles.headerImage} />}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore</ThemedText>
      </ThemedView>
      <ThemedText>Confira as críticas de filmes mais recentes.</ThemedText>
      <ScrollView>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Text style={styles.reviewTitle}>{review.original_title}</Text>
              <Text style={styles.reviewRating}>Nota: {review.vote_average}</Text>
              <Text style={styles.reviewDescription}>{review.description}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noReviewsText}>Nenhuma crítica encontrada.</Text>
        )}
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  reviewCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#007BFF',
  },
  reviewDescription: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  noReviewsText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});