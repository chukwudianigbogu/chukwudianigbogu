import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../../App';

type PreferenceSelectionNavigationProp = StackNavigationProp<RootStackParamList, 'PreferenceSelection'>;

const { width } = Dimensions.get('window');

const PreferenceSelectionScreen: React.FC = () => {
  const navigation = useNavigation<PreferenceSelectionNavigationProp>();
  const [selectedPreference, setSelectedPreference] = useState<'axe' | 'net' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedPreference) return;
    
    setIsLoading(true);
    try {
      // Map symbolic choice to experience type
      const experienceType = selectedPreference === 'axe' ? 'green' : 'thread';
      
      // Store the user's choice
      await AsyncStorage.setItem('userExperience', experienceType);
      await AsyncStorage.setItem('accountType', 'individual');
      
      // Navigate to interest selection
      navigation.navigate('InterestSelection', { accountType: 'individual' });
    } catch (error) {
      console.error('Error storing preference:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Path</Text>
          <Text style={styles.subtitle}>
            Which tool resonates with you more?
          </Text>
        </View>

        {/* Preference Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={[
              styles.optionCard,
              selectedPreference === 'axe' && styles.selectedCard
            ]}
            onPress={() => setSelectedPreference('axe')}
            activeOpacity={0.8}
          >
            <View style={styles.optionVisual}>
              <Text style={styles.toolIcon}>🪓</Text>
              <Text style={styles.toolName}>Axe</Text>
            </View>
            <Text style={styles.optionDescription}>
              A tool for building, creating, and shaping. 
              Represents precision, craft, and deliberate action.
            </Text>
            <View style={styles.associationList}>
              <Text style={styles.association}>• Craftsmanship</Text>
              <Text style={styles.association}>• Building & making</Text>
              <Text style={styles.association}>• Direct approach</Text>
              <Text style={styles.association}>• Skill development</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.optionCard,
              selectedPreference === 'net' && styles.selectedCard
            ]}
            onPress={() => setSelectedPreference('net')}
            activeOpacity={0.8}
          >
            <View style={styles.optionVisual}>
              <Text style={styles.toolIcon}>🕸️</Text>
              <Text style={styles.toolName}>Net</Text>
            </View>
            <Text style={styles.optionDescription}>
              A tool for gathering, connecting, and weaving. 
              Represents relationships, nurturing, and thoughtful collection.
            </Text>
            <View style={styles.associationList}>
              <Text style={styles.association}>• Connection</Text>
              <Text style={styles.association}>• Gathering & sharing</Text>
              <Text style={styles.association}>• Thoughtful approach</Text>
              <Text style={styles.association}>• Community building</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !selectedPreference && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={!selectedPreference || isLoading}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              !selectedPreference && styles.disabledButtonText
            ]}>
              {isLoading ? 'Processing...' : 'Continue'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            This choice shapes your entire experience and cannot be changed
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'Roboto-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 24,
  },
  optionCard: {
    backgroundColor: '#2C2C2C',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: '#3A3A3A',
  },
  selectedCard: {
    borderColor: '#2C3E50',
    backgroundColor: '#2A2A2A',
  },
  optionVisual: {
    alignItems: 'center',
    marginBottom: 16,
  },
  toolIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  toolName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
  },
  optionDescription: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 16,
    lineHeight: 20,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  associationList: {
    gap: 6,
    alignItems: 'center',
  },
  association: {
    fontSize: 13,
    color: '#E8E8E8',
    fontFamily: 'Roboto-Light',
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    width: width * 0.8,
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#555555',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  disabledButtonText: {
    color: '#AAAAAA',
  },
  disclaimer: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
    fontStyle: 'italic',
  },
});

export default PreferenceSelectionScreen; 