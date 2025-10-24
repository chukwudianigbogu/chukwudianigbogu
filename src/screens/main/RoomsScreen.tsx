import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getTheme } from '../../theme';

interface RoomsScreenProps {
  experienceType: 'green' | 'thread';
  accountType: string;
}

interface Room {
  id: number;
  title: string;
  host: string;
  participants: number;
  maxParticipants: number;
  isPrivate: boolean;
  isLive: boolean;
  topic: string;
  startTime: string;
  hostImage: string;
}

const RoomsScreen: React.FC<RoomsScreenProps> = ({ experienceType, accountType }) => {
  const theme = getTheme(experienceType);
  const [activeTab, setActiveTab] = useState('live');

  const tabs = [
    { id: 'live', label: 'Live Rooms' },
    { id: 'scheduled', label: 'Scheduled' },
    { id: 'my-rooms', label: 'My Rooms' },
  ];

  const rooms: Room[] = [
    {
      id: 1,
      title: 'Startup Pitch Night',
      host: 'Marcus Johnson',
      participants: 45,
      maxParticipants: 100,
      isPrivate: false,
      isLive: true,
      topic: 'Entrepreneurship',
      startTime: 'Now',
      hostImage: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Tech Talk Tuesday',
      host: 'Alex Chen',
      participants: 23,
      maxParticipants: 50,
      isPrivate: false,
      isLive: true,
      topic: 'Technology',
      startTime: 'Now',
      hostImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Investment Strategies',
      host: 'David Wilson',
      participants: 67,
      maxParticipants: 80,
      isPrivate: true,
      isLive: false,
      topic: 'Finance',
      startTime: '8:00 PM',
      hostImage: 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

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
              activeTab === tab.id ? styles.activeTab : styles.inactiveTab
            ]}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab.id ? styles.activeTabText : styles.inactiveTabText
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderRoom = (room: Room) => (
    <View key={room.id} style={styles.roomContainer}>
      <View style={styles.roomHeader}>
        <View style={styles.roomInfo}>
          <View style={styles.roomTitleRow}>
            <Text style={styles.roomTitle}>{room.title}</Text>
            {room.isLive && (
              <View style={styles.liveBadge}>
                <View style={styles.liveIndicator} />
                <Text style={styles.liveText}>LIVE</Text>
              </View>
            )}
            {room.isPrivate && (
              <Ionicons name="lock-closed" size={16} color="#6B7280" />
            )}
          </View>
          <Text style={styles.roomTopic}>{room.topic}</Text>
        </View>
      </View>

      <View style={styles.roomContent}>
        <View style={styles.hostInfo}>
          <Image source={{ uri: room.hostImage }} style={styles.hostImage} />
          <View>
            <Text style={styles.hostName}>{room.host}</Text>
            <Text style={styles.hostLabel}>Host</Text>
          </View>
        </View>

        <View style={styles.roomStats}>
          <View style={styles.participantsInfo}>
            <Ionicons name="people" size={16} color="#6B7280" />
            <Text style={styles.participantsText}>
              {room.participants}/{room.maxParticipants}
            </Text>
          </View>
          <View style={styles.timeInfo}>
            <Ionicons name="time" size={16} color="#6B7280" />
            <Text style={styles.timeText}>{room.startTime}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={[
        styles.joinButton,
        room.isLive ? styles.liveJoinButton : styles.scheduledJoinButton
      ]}>
        <Text style={[
          styles.joinButtonText,
          room.isLive ? styles.liveJoinButtonText : styles.scheduledJoinButtonText
        ]}>
          {room.isLive ? 'Join Room' : 'Set Reminder'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.outline }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft} />
          <Text style={[styles.headerText, { color: theme.colors.onBackground }]}>Rooms</Text>
          <TouchableOpacity style={styles.headerRight}>
            <Ionicons name="add" size={24} color={theme.colors.onBackground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        {renderFilterTabs()}

        {/* Rooms List */}
        <View style={styles.roomsList}>
          {rooms.map(renderRoom)}
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
    padding: 8,
    width: 40,
    alignItems: 'center',
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
    backgroundColor: '#B7CBDF',
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
  roomsList: {
    paddingHorizontal: 16,
  },
  roomContainer: {
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
  roomHeader: {
    marginBottom: 16,
  },
  roomInfo: {
    flex: 1,
  },
  roomTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  roomTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  liveIndicator: {
    width: 6,
    height: 6,
    backgroundColor: 'white',
    borderRadius: 3,
    marginRight: 4,
  },
  liveText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  roomTopic: {
    fontSize: 14,
    color: '#6B7280',
  },
  roomContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  hostInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hostImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  hostName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  hostLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  roomStats: {
    alignItems: 'flex-end',
  },
  participantsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  participantsText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  joinButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  liveJoinButton: {
    backgroundColor: '#B7CBDF',
  },
  scheduledJoinButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#B7CBDF',
  },
  joinButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  liveJoinButtonText: {
    color: 'white',
  },
  scheduledJoinButtonText: {
    color: '#B7CBDF',
  },
});

export default RoomsScreen; 