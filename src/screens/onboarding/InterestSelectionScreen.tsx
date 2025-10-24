import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../../../App';

type InterestSelectionRouteProp = RouteProp<RootStackParamList, 'InterestSelection'>;
type InterestSelectionNavigationProp = StackNavigationProp<RootStackParamList, 'InterestSelection'>;

const { width } = Dimensions.get('window');

const interests = [
  { id: 'wellness', name: 'Wellness', icon: '🧘' },
  { id: 'fitness', name: 'Fitness', icon: '💪' },
  { id: 'books', name: 'Books', icon: '📚' },
  { id: 'creativity', name: 'Creativity', icon: '🎨' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'music', name: 'Music', icon: '🎵' },
  { id: 'cooking', name: 'Cooking', icon: '👨‍🍳' },
  { id: 'travel', name: 'Travel', icon: '✈️' },
  { id: 'parenting', name: 'Parenting', icon: '👶' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'spirituality', name: 'Spirituality', icon: '🕯️' },
  { id: 'arts', name: 'Arts', icon: '🖼️' },
  { id: 'gaming', name: 'Gaming', icon: '🎮' },
  { id: 'nature', name: 'Nature', icon: '🌿' },
  { id: 'education', name: 'Education', icon: '📖' },
  { id: 'relationships', name: 'Relationships', icon: '💝' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'fashion', name: 'Fashion', icon: '👗' },
  { id: 'photography', name: 'Photography', icon: '📸' },
];

const InterestSelectionScreen: React.FC = () => {
  const navigation = useNavigation<InterestSelectionNavigationProp>();
  const route = useRoute<InterestSelectionRouteProp>();
  const { accountType } = route.params;
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleInterest = (interestId: string) => {
    setSelectedInterests(prev => {
      if (prev.includes(interestId)) {
        return prev.filter(id => id !== interestId);
      } else {
        return [...prev, interestId];
      }
    });
  };

  const handleContinue = async () => {
    if (selectedInterests.length < 3) {
      Alert.alert('Selection Required', 'Please select at least 3 interests to continue.');
      return;
    }

    setIsLoading(true);
    try {
      // Store selected interests
      await AsyncStorage.setItem('userInterests', JSON.stringify(selectedInterests));
      
      // Get the user's experience type with fallback
      let experienceType = await AsyncStorage.getItem('userExperience');
      
      // If no experience type is set, default to 'green' and store it
      if (!experienceType) {
        experienceType = 'green';
        await AsyncStorage.setItem('userExperience', experienceType);
        console.log('No experience type found, defaulting to green');
      }
      
      // Validate experience type
      if (experienceType !== 'green' && experienceType !== 'thread') {
        console.warn('Invalid experience type, defaulting to green');
        experienceType = 'green';
        await AsyncStorage.setItem('userExperience', experienceType);
      }
      
      // Store account type if not already set
      if (accountType) {
        await AsyncStorage.setItem('accountType', accountType);
      }
      
      // Mark onboarding as complete
      await AsyncStorage.setItem('onboardingComplete', 'true');
      
      console.log('Onboarding completed successfully:', {
        experienceType,
        accountType,
        interests: selectedInterests
      });
      
      // Navigate to main app
      navigation.navigate('Main', { 
        experienceType: experienceType as 'green' | 'thread', 
        accountType: accountType || 'individual' 
      });
    } catch (error) {
      console.error('Error completing onboarding:', error);
      Alert.alert(
        'Error',
        'Something went wrong while setting up your account. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>What interests you?</Text>
          <Text style={styles.subtitle}>
            Select at least 3 topics that you'd like to see content about
          </Text>
          <Text style={styles.counter}>
            Selected: {selectedInterests.length}/20
          </Text>
        </View>

        {/* Interests Grid */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.interestsContainer}>
            {interests.map((interest) => (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.interestCard,
                  selectedInterests.includes(interest.id) && styles.selectedInterest
                ]}
                onPress={() => toggleInterest(interest.id)}
                activeOpacity={0.8}
              >
                <Text style={styles.interestIcon}>{interest.icon}</Text>
                <Text style={[
                  styles.interestName,
                  selectedInterests.includes(interest.id) && styles.selectedInterestText
                ]}>
                  {interest.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              selectedInterests.length < 3 && styles.disabledButton
            ]}
            onPress={handleContinue}
            disabled={selectedInterests.length < 3 || isLoading}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.buttonText,
              selectedInterests.length < 3 && styles.disabledButtonText
            ]}>
              {isLoading ? 'Setting up...' : 'Continue'}
            </Text>
          </TouchableOpacity>
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
    marginBottom: 30,
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
    marginBottom: 16,
    fontFamily: 'Roboto-Regular',
  },
  counter: {
    fontSize: 14,
    color: '#2C3E50',
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  scrollView: {
    flex: 1,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  interestCard: {
    width: (width - 72) / 2,
    backgroundColor: '#2C2C2C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3A3A3A',
  },
  selectedInterest: {
    borderColor: '#2C3E50',
    backgroundColor: '#2A2A2A',
  },
  interestIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  interestName: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
  },
  selectedInterestText: {
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    width: width * 0.8,
    alignItems: 'center',
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
});

export default InterestSelectionScreen; 