import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getTheme } from '../../theme';

interface ChallengesScreenProps {
  experienceType: 'green' | 'thread';
  accountType: string;
}

interface Challenge {
  id: number;
  title: string;
  description: string;
  progress: number;
  total: number;
  timeLeft: string;
  reward: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  participants: number;
}

const ChallengesScreen: React.FC<ChallengesScreenProps> = ({ experienceType, accountType }) => {
  const theme = getTheme(experienceType);
  const [activeTab, setActiveTab] = useState('active');

  const tabs = [
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
    { id: 'discover', label: 'Discover' },
  ];

  const challenges: Challenge[] = [
    {
      id: 1,
      title: 'Networking Champion',
      description: 'Connect with 10 new people this week',
      progress: 7,
      total: 10,
      timeLeft: '3 days left',
      reward: '500 points',
      difficulty: 'Medium',
      participants: 234
    },
    {
      id: 2,
      title: 'Event Explorer',
      description: 'Attend 3 different events this month',
      progress: 1,
      total: 3,
      timeLeft: '2 weeks left',
      reward: '750 points',
      difficulty: 'Easy',
      participants: 156
    },
    {
      id: 3,
      title: 'Circle Builder',
      description: 'Create and grow a circle to 25 members',
      progress: 18,
      total: 25,
      timeLeft: '1 week left',
      reward: '1000 points',
      difficulty: 'Hard',
      participants: 89
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#10B981';
      case 'Medium': return '#F59E0B';
      case 'Hard': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const renderFilterTabs = () => (
    <View style={styles.tabContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabContent}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setActiveTab(tab.id)}
            style={[
              styles.tab,
              activeTab === tab.id ? [styles.activeTab, { backgroundColor: theme.colors.primary }] : styles.inactiveTab
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id ? styles.activeTabText : [styles.inactiveTabText, { color: theme.colors.onSurface }]
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProgressBar = (progress: number, total: number) => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { 
              width: `${(progress / total) * 100}%`,
              backgroundColor: theme.colors.primary
            }
          ]} 
        />
      </View>
      <Text style={styles.progressText}>{progress}/{total}</Text>
    </View>
  );

  const renderChallenge = (challenge: Challenge) => (
    <View key={challenge.id} style={styles.challengeContainer}>
      <View style={styles.challengeHeader}>
        <View style={styles.challengeIconContainer}>
          <Ionicons name="trophy" size={24} color="#FBBF24" />
        </View>
        <View style={styles.challengeInfo}>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <Text style={styles.challengeDescription}>{challenge.description}</Text>
        </View>
        <View style={[
          styles.difficultyBadge, 
          { backgroundColor: getDifficultyColor(challenge.difficulty) }
        ]}>
          <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
        </View>
      </View>

      {renderProgressBar(challenge.progress, challenge.total)}

      <View style={styles.challengeFooter}>
        <View style={styles.challengeStats}>
          <View style={styles.statItem}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={styles.statText}>{challenge.timeLeft}</Text>
          </View>
          <View style={styles.statItem}>
            <Ionicons name="people" size={16} color="#6B7280" />
            <Text style={styles.statText}>{challenge.participants}</Text>
          </View>
        </View>
        <View style={[styles.rewardContainer, { backgroundColor: `${theme.colors.primary}10` }]}>
          <Text style={[styles.rewardText, { color: theme.colors.primary }]}>{challenge.reward}</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.challengeButton, { borderColor: theme.colors.primary }]}>
        <Text style={[styles.challengeButtonText, { color: theme.colors.primary }]}>View Challenge</Text>
        <Ionicons name="chevron-forward" size={16} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.outline }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft} />
          <Text style={[styles.headerText, { color: theme.colors.onBackground }]}>Challenges</Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        {renderFilterTabs()}

        {/* Challenges List */}
        <View style={styles.challengesList}>
          {challenges.map(renderChallenge)}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    width: 40,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 40,
  },
  content: { 
    flex: 1, 
  },
  tabContainer: {
    paddingVertical: 20,
  },
  tabContent: {
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    // backgroundColor will be set dynamically
  },
  inactiveTab: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  inactiveTabText: {
    color: '#6B7280',
  },
  challengesList: {
    paddingHorizontal: 16,
  },
  challengeContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20, 
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  challengeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(251, 191, 36, 0.1)',
    alignItems: 'center', 
    justifyContent: 'center',
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16, 
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  challengeDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    minWidth: 40,
  },
  challengeFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  challengeStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  rewardContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: '500',
  },
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  challengeButtonText: {
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
});

export default ChallengesScreen; 