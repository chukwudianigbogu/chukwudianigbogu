import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getTheme } from '../../theme';

interface ProfileScreenProps {
  experienceType: 'green' | 'thread';
  accountType: string;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ experienceType, accountType }) => {
  const theme = getTheme(experienceType);

  const stats = [
    { icon: 'people', label: 'Connections', value: '234' },
    { icon: 'calendar', label: 'Events Attended', value: '18' },
    { icon: 'trophy', label: 'Challenges Won', value: '12' },
    { icon: 'star', label: 'Rating', value: '4.8' },
  ];

  const achievements = [
    { title: 'Networking Pro', description: 'Connected with 100+ people', icon: '🤝' },
    { title: 'Event Master', description: 'Attended 50+ events', icon: '🎉' },
    { title: 'Circle Leader', description: 'Created 3 successful circles', icon: '👑' },
  ];

  const renderStats = () => (
    <View style={styles.statsContainer}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons name={stat.icon as any} size={20} color={theme.colors.primary} />
          </View>
          <Text style={[styles.statValue, { color: theme.colors.onSurface }]}>{stat.value}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.onSurface }]}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );

  const renderAchievements = () => (
    <View style={styles.achievementsContainer}>
      <Text style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>Achievements</Text>
      <View style={styles.achievementsList}>
        {achievements.map((achievement, index) => (
          <View key={index} style={styles.achievementItem}>
            <Text style={styles.achievementIcon}>{achievement.icon}</Text>
            <View style={styles.achievementInfo}>
              <Text style={[styles.achievementTitle, { color: theme.colors.onSurface }]}>{achievement.title}</Text>
              <Text style={[styles.achievementDescription, { color: theme.colors.onSurface }]}>{achievement.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.outline }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft} />
          <Text style={[styles.headerText, { color: theme.colors.onBackground }]}>Profile</Text>
          <View style={styles.headerRight} />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={[styles.profileHeader, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={[styles.editImageButton, { backgroundColor: theme.colors.primary }]}>
              <MaterialIcons name="edit" size={12} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: theme.colors.onSurface }]}>Alex Thompson</Text>
            <Text style={[styles.profileTitle, { color: theme.colors.onSurface }]}>Software Engineer</Text>
            <Text style={[styles.profileLocation, { color: theme.colors.onSurface }]}>San Francisco, CA</Text>
          </View>
          <TouchableOpacity style={styles.settingsButton}>
            <Ionicons name="settings-outline" size={24} color={theme.colors.onSurface} />
          </TouchableOpacity>
        </View>

        {/* Bio */}
        <View style={[styles.bioContainer, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.bioText, { color: theme.colors.onSurface }]}>
            Passionate about technology and building meaningful connections. Always looking for new opportunities to learn and grow.
          </Text>
        </View>

        {/* Stats */}
        {renderStats()}

        {/* Achievements */}
        {renderAchievements()}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.primaryButton, { backgroundColor: theme.colors.primary }]}>
            <Text style={styles.primaryButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.secondaryButton, { borderColor: theme.colors.primary }]}>
            <Text style={[styles.secondaryButtonText, { color: theme.colors.primary }]}>View Public Profile</Text>
          </TouchableOpacity>
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
  profileHeader: {
    borderRadius: 16,
    padding: 24,
    margin: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editImageButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  profileTitle: {
    fontSize: 16,
    marginBottom: 2,
  },
  profileLocation: {
    fontSize: 14,
  },
  settingsButton: {
    padding: 8,
  },
  bioContainer: {
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
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
  bioText: {
    fontSize: 14,
    lineHeight: 20,
  },
  statsContainer: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(183, 203, 223, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  achievementsContainer: {
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    backgroundColor: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 12,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    gap: 8,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen; 