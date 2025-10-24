import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EntityVerificationScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Entity Verification</Text>
        <Text style={styles.subtitle}>Verify your organization or business</Text>
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Entity accounts require verification to ensure authenticity.
            This process includes identity verification and business documentation.
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Back to Account Type</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1A1A1A' },
  content: { flex: 1, padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#FFFFFF', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#B0B0B0', textAlign: 'center', marginBottom: 40 },
  infoContainer: { backgroundColor: '#2C2C2C', padding: 20, borderRadius: 12, marginBottom: 40 },
  infoText: { fontSize: 14, color: '#E8E8E8', lineHeight: 20, textAlign: 'center' },
  continueButton: { backgroundColor: '#2C3E50', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});

export default EntityVerificationScreen; 