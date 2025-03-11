import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface Review {
  id: number;
  original_title: string;
  vote_average: number;
  description: string;
}

interface ReviewModalProps {
  visible: boolean;
  review: Review | null;
  onClose: () => void;
  onSave: () => void;
  onDelete: () => void;
  onChangeReview: (field: keyof Review, value: string | number) => void;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ visible, review, onClose, onSave, onDelete, onChangeReview }) => {
  if (!review) return null;

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Editar Resenha</Text>
          <TextInput
            style={styles.input}
            value={review.original_title}
            onChangeText={(text) => onChangeReview('original_title', text)}
            placeholder="Título do Filme"
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            value={review.description}
            onChangeText={(text) => onChangeReview('description', text)}
            placeholder="Descrição"
            multiline
          />
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(review.vote_average)}
            onChangeText={(text) => onChangeReview('vote_average', parseFloat(text))}
            placeholder="Nota (0-10)"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onSave} style={styles.saveButton}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: '#333', // Cor de fundo do modal
    width: '85%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  closeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Cor do texto do botão de fechar
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#fff', // Cor do título do modal
  },
  input: {
    borderColor: '#555', // Cor da borda do input
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    backgroundColor: '#444', // Cor de fundo do input
    color: '#fff', // Cor do texto do input
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
});

export default ReviewModal;