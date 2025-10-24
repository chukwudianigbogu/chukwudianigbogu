import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getTheme } from '../../theme';

interface FeedScreenProps {
  experienceType: 'green' | 'thread';
  accountType: string;
}

interface Post {
  id: number;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  time: string;
  location?: string;
}

const FeedScreen: React.FC<FeedScreenProps> = ({ experienceType, accountType }) => {
  const theme = getTheme(experienceType);
  const [showMessageDropdown, setShowMessageDropdown] = useState(false);
  
  const headerText = experienceType === 'green' ? 'For Him' : 'For Her';

  const posts: Post[] = [
    {
      id: 1,
      user: {
        name: "Marcus Johnson",
        username: "marcus_dev",
        avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      image: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Great networking event tonight! Met some amazing entrepreneurs 🚀",
      likes: 42,
      comments: 8,
      time: "2h ago",
      location: "Downtown Bar"
    },
    {
      id: 2,
      user: {
        name: "Alex Chen",
        username: "alex_designer", 
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      image: "https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Weekend hackathon was intense! Built something amazing 💻",
      likes: 87,
      comments: 23,
      time: "5h ago",
      location: "Tech Hub"
    },
    {
      id: 3,
      user: {
        name: "Sarah Kim",
        username: "sarah_wellness",
        avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
      caption: "Morning meditation session in the park 🧘‍♀️ #mindfulness",
      likes: 156,
      comments: 42,
      time: "8h ago"
    }
  ];

  const quickActions = [
    { icon: 'add-circle-outline', label: 'Create', onPress: () => {} },
    { icon: 'people-outline', label: 'Connect', onPress: () => {} },
    { icon: 'star-outline', label: 'Challenges', onPress: () => {} },
    { icon: 'location-outline', label: 'Events', onPress: () => {} },
  ];

  const renderQuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.quickActionsTitle}>Quick Actions</Text>
      <View style={styles.quickActions}>
        {quickActions.map((action, index) => (
          <TouchableOpacity key={index} style={styles.quickActionItem} onPress={action.onPress}>
            <View style={[styles.quickActionIcon, { backgroundColor: theme.colors.primary }]}>
              <Ionicons name={action.icon as any} size={24} color="white" />
            </View>
            <Text style={styles.quickActionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderPost = (post: Post) => (
    <View key={post.id} style={styles.post}>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{post.user.name}</Text>
            {post.location && (
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={12} color="#666" />
                <Text style={styles.location}>{post.location}</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="more-horiz" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      <Image source={{ uri: post.image }} style={styles.postImage} />

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.postActionsLeft}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <Text style={styles.timeText}>{post.time}</Text>
      </View>

      {/* Likes */}
      <Text style={styles.likesText}>{post.likes} likes</Text>

      {/* Caption */}
      <View style={styles.captionContainer}>
        <Text style={styles.usernameText}>{post.user.username}</Text>
        <Text style={styles.captionText}> {post.caption}</Text>
      </View>

      {/* Comments */}
      {post.comments > 0 && (
        <TouchableOpacity>
          <Text style={styles.commentsText}>View all {post.comments} comments</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Translucent Star Logo at Top Center */}
      <View style={styles.starLogoContainer}>
        <Image 
          source={require('../../assets/star-logo.png')} 
          style={[styles.starLogo, { opacity: 0.3 }]}
          resizeMode="contain"
        />
      </View>

      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.colors.outline }]}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft} />
          <Text style={[styles.headerText, { color: theme.colors.onBackground }]}>{headerText}</Text>
          <TouchableOpacity 
            style={styles.headerRight}
            onPress={() => setShowMessageDropdown(!showMessageDropdown)}
          >
            <Ionicons name="chatbubble-outline" size={24} color={theme.colors.onBackground} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {renderQuickActions()}
        {posts.map(renderPost)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1 
  },
  starLogoContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 10,
  },
  starLogo: {
    width: 60,
    height: 60,
  },
  header: { 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderBottomWidth: 1,
    paddingTop: 20, // Add extra padding to accommodate the star logo
  },
  headerContent: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between' 
  },
  headerLeft: { 
    width: 40 
  },
  headerText: { 
    fontSize: 18, 
    fontWeight: '600' 
  },
  headerRight: { 
    position: 'relative' 
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  content: { 
    flex: 1 
  },
  quickActionsContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1F2937',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickActionItem: {
    alignItems: 'center',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  quickActionLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  post: {
    backgroundColor: 'white',
    marginBottom: 12,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  username: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  location: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 2,
  },
  postImage: {
    width: '100%',
    height: 300,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  postActionsLeft: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 16,
  },
  timeText: {
    fontSize: 12,
    color: '#6B7280',
  },
  likesText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    paddingHorizontal: 16,
    marginBottom: 4,
  },
  captionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  usernameText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  captionText: {
    fontSize: 14,
    color: '#1F2937',
    flex: 1,
  },
  commentsText: {
    fontSize: 14,
    color: '#6B7280',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
});

export default FeedScreen; 