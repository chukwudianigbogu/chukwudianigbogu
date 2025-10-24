import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../App';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const { width, height } = Dimensions.get('window');

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('AccountType');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Area */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>ROVE</Text>
          <Text style={styles.tagline}>Where you grow into yourself</Text>
        </View>

        {/* Main Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.welcomeText}>
            A place to show up quietly,{'\n'}
            speak honestly, and{'\n'}
            grow into yourself.
          </Text>
          
          <Text style={styles.subtext}>
            Choose your path. Then build your own rhythm.
          </Text>
        </View>

        {/* Get Started Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={handleGetStarted}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            Crafted for presence, not performance
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
    paddingHorizontal: 32,
    justifyContent: 'space-between',
    paddingTop: height * 0.1,
    paddingBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontFamily: 'Roboto-Bold',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: '#B0B0B0',
    marginTop: 8,
    fontFamily: 'Roboto-Light',
  },
  messageContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    fontFamily: 'Roboto-Regular',
    marginBottom: 24,
  },
  subtext: {
    fontSize: 16,
    color: '#B0B0B0',
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  getStartedButton: {
    backgroundColor: '#2C3E50',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 8,
    width: width * 0.8,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
  },
  disclaimer: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
    fontFamily: 'Roboto-Light',
  },
});

export default WelcomeScreen; 