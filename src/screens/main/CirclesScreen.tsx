import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getTheme } from '../../theme';

interface CirclesScreenProps {
  experienceType: 'green' | 'thread';
  accountType: string;
}

interface Circle {
  id: number;
  name: string;
  description: string;
  members: number;
  isOwner: boolean;
  location: string;
  image: string;
  category: string;
}

const CirclesScreen: React.FC<CirclesScreenProps> = ({ experienceType, accountType }) => {
  const theme = getTheme(experienceType);
  const [activeTab, setActiveTab] = useState('joined');

  const tabs = [
    { id: 'joined', label: 'Joined' },
    { id: 'discover', label: 'Discover' },
    { id: 'created', label: 'Created' },
  ];

  const circles: Circle[] = [
    {
      id: 1,
      name: 'Tech Entrepreneurs',
      description: 'Building the future of technology',
      members: 234,
      isOwner: false,
      location: 'San Francisco',
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Business'
    },
    {
      id: 2,
      name: 'Fitness Bros',
      description: 'Workout partners and motivation',
      members: 156,
      isOwner: true,
      location: 'Local',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Fitness'
    },
    {
      id: 3,
      name: 'Investment Club',
      description: 'Smart money moves and market insights',
      members: 89,
      isOwner: false,
      location: 'New York',
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Finance'
    }
  ];

  const handleCreateCircle = () => {
    console.log('Create new circle');
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

  const renderCircle = (circle: Circle) => (
    <View key={circle.id} style={styles.circleContainer}>
      <View style={styles.circleContent}>
        <Image source={{ uri: circle.image }} style={styles.circleImage} />
        <View style={styles.circleInfo}>
          <View style={styles.circleHeader}>
            <Text style={styles.circleName}>{circle.name}</Text>
            {circle.isOwner && (
              <MaterialIcons name="stars" size={16} color="#FBBF24" />
            )}
          </View>
          <Text style={styles.circleDescription}>{circle.description}</Text>
          
          <View style={styles.circleMetadata}>
            <View style={styles.metadataLeft}>
              <View style={styles.membersContainer}>
                <Ionicons name="people" size={16} color="#6B7280" />
                <Text style={styles.membersText}>{circle.members} members</Text>
              </View>
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={16} color="#6B7280" />
                <Text style={styles.locationText}>{circle.location}</Text>
              </View>
            </View>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{circle.category}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.circleActions}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>View Circle</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.outline }]}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.headerLeft}>
            <Ionicons name="search" size={24} color={theme.colors.onBackground} />
          </TouchableOpacity>
          <Text style={[styles.headerText, { color: theme.colors.onBackground }]}>Circles</Text>
          <TouchableOpacity 
            style={styles.headerRight}
            onPress={handleCreateCircle}
          >
            <Ionicons name="add" size={24} color={theme.colors.onBackground} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Filter Tabs */}
        {renderFilterTabs()}

        {/* Circles List */}
        <View style={styles.circlesList}>
          {circles.map(renderCircle)}
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
    padding: 8,
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
  circlesList: {
    paddingHorizontal: 16,
  },
  circleContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
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
  circleContent: {
    flexDirection: 'row',
    padding: 20,
  },
  circleImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 16,
  },
  circleInfo: {
    flex: 1,
  },
  circleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  circleName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginRight: 8,
  },
  circleDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  circleMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metadataLeft: {
    flex: 1,
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  membersText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  categoryBadge: {
    backgroundColor: 'rgba(183, 203, 223, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#B7CBDF',
    fontWeight: '500',
  },
  circleActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#B7CBDF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  secondaryButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#6B7280',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default CirclesScreen; 