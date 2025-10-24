import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getTheme } from '../../theme';

interface SearchScreenProps {
  experienceType: 'green' | 'thread';
  accountType: string;
}

interface SearchResult {
  id: number;
  type: 'person' | 'event' | 'circle';
  name: string;
  title: string;
  location: string;
  rating: number;
  image: string;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ experienceType, accountType }) => {
  const theme = getTheme(experienceType);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'people', label: 'People' },
    { id: 'events', label: 'Events' },
    { id: 'circles', label: 'Circles' },
  ];

  const searchResults: SearchResult[] = [
    {
      id: 1,
      type: 'person',
      name: 'Marcus Johnson',
      title: 'Software Engineer',
      location: '2.3 miles away',
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      type: 'event',
      name: 'Tech Meetup',
      title: 'Networking Event',
      location: 'Downtown',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      type: 'circle',
      name: 'Entrepreneurs Hub',
      title: '156 members',
      location: 'Business Network',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const renderFilterTabs = () => (
    <View style={styles.filterContainer}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            onPress={() => setActiveFilter(filter.id)}
            style={[
              styles.filterTab,
              activeFilter === filter.id ? styles.activeFilterTab : styles.inactiveFilterTab
            ]}
          >
            <Text style={[
              styles.filterTabText,
              activeFilter === filter.id ? styles.activeFilterText : styles.inactiveFilterText
            ]}>
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderSearchResult = (result: SearchResult) => (
    <View key={result.id} style={styles.resultContainer}>
      <View style={styles.resultContent}>
        <Image source={{ uri: result.image }} style={styles.resultImage} />
        <View style={styles.resultInfo}>
          <Text style={styles.resultName}>{result.name}</Text>
          <Text style={styles.resultTitle}>{result.title}</Text>
          <View style={styles.resultMetadata}>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={12} color="#6B7280" />
              <Text style={styles.locationText}>{result.location}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={12} color="#FBBF24" />
              <Text style={styles.ratingText}>{result.rating}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.connectButton}>
          <Text style={styles.connectButtonText}>Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.outline }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft} />
          <Text style={[styles.headerText, { color: theme.colors.onBackground }]}>Search</Text>
          <TouchableOpacity 
            style={styles.headerRight}
            onPress={() => setShowNotificationDropdown(!showNotificationDropdown)}
          >
            <Ionicons name="notifications-outline" size={24} color={theme.colors.onBackground} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search people, events, circles..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity style={styles.filterIcon}>
              <MaterialIcons name="tune" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter Tabs */}
        {renderFilterTabs()}

        {/* Search Results */}
        <View style={styles.resultsContainer}>
          {searchResults.map(renderSearchResult)}
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
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    backgroundColor: '#EF4444',
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
  },
  filterIcon: {
    padding: 4,
  },
  filterContainer: {
    paddingBottom: 20,
  },
  filterContent: {
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: '#B7CBDF',
  },
  inactiveFilterTab: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeFilterText: {
    color: 'white',
  },
  inactiveFilterText: {
    color: '#6B7280',
  },
  resultsContainer: {
    paddingHorizontal: 16,
  },
  resultContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  resultContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  resultImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  resultTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  resultMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  connectButton: {
    backgroundColor: '#B7CBDF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  connectButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SearchScreen; 