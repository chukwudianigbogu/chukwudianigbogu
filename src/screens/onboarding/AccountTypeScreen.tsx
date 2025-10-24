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

type AccountTypeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountType'>;

const { width } = Dimensions.get('window');

const AccountTypeScreen: React.FC = () => {
  const navigation = useNavigation<AccountTypeScreenNavigationProp>();

  const handleIndividualAccount = () => {
    navigation.navigate('PreferenceSelection');
  };

  const handleEntityAccount = () => {
    navigation.navigate('EntityVerification');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Account Type</Text>
          <Text style={styles.subtitle}>
            Select the option that best describes you
          </Text>
        </View>

        {/* Account Type Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity 
            style={styles.optionCard}
            onPress={handleIndividualAccount}
            activeOpacity={0.8}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Individual Account</Text>
              <Text style={styles.optionIcon}>👤</Text>
            </View>
            <Text style={styles.optionDescription}>
              Personal account for individual users seeking authentic connection and growth
            </Text>
            <View style={styles.featureList}>
              <Text style={styles.feature}>• Personalized experience</Text>
              <Text style={styles.feature}>• Interest-based content</Text>
              <Text style={styles.feature}>• Community participation</Text>
              <Text style={styles.feature}>• Voice & discussion rooms</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.optionCard}
            onPress={handleEntityAccount}
            activeOpacity={0.8}
          >
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Entity Account</Text>
              <Text style={styles.optionIcon}>🏢</Text>
            </View>
            <Text style={styles.optionDescription}>
              For organizations, brands, creators, or public figures
            </Text>
            <View style={styles.featureList}>
              <Text style={styles.feature}>• Cross-experience visibility</Text>
              <Text style={styles.feature}>• Content audience tagging</Text>
              <Text style={styles.feature}>• Verification required</Text>
              <Text style={styles.feature}>• Brand-safe advertising</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Fine Print */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimer}>
            The choices you make here will define your experience in the app. 
            Please select your preferences carefully, as this will guide the content 
            and interactions you'll see. Once made, your experience will be final.
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
    borderWidth: 1,
    borderColor: '#3A3A3A',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
  },
  optionIcon: {
    fontSize: 24,
  },
  optionDescription: {
    fontSize: 14,
    color: '#B0B0B0',
    marginBottom: 16,
    lineHeight: 20,
    fontFamily: 'Roboto-Regular',
  },
  featureList: {
    gap: 8,
  },
  feature: {
    fontSize: 13,
    color: '#E8E8E8',
    fontFamily: 'Roboto-Light',
  },
  disclaimerContainer: {
    marginTop: 40,
    paddingHorizontal: 16,
  },
  disclaimer: {
    fontSize: 11,
    color: '#888888',
    textAlign: 'center',
    lineHeight: 16,
    fontFamily: 'Roboto-Light',
    fontStyle: 'italic',
  },
});

export default AccountTypeScreen; 