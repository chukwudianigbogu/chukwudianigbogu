import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Screens
import FeedScreen from '../screens/main/FeedScreen';
import SearchScreen from '../screens/main/SearchScreen';
import ChallengesScreen from '../screens/main/ChallengesScreen';
import CirclesScreen from '../screens/main/CirclesScreen';
import RoomsScreen from '../screens/main/RoomsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

// Custom Icons
import { ChallengesIcon, RoomsIcon, CirclesIcon } from '../components/CustomIcons';

// Theme
import { getTheme, AppTheme } from '../theme';

// Types
export type MainTabParamList = {
  Feed: undefined;
  Search: { interestTag?: string };
  Challenges: undefined;
  Circles: undefined;
  Rooms: undefined;
  Profile: undefined;
};

  type MainTabNavigatorProps = {
    route: RouteProp<{
      Main: {
        experienceType: 'green' | 'thread';
        accountType: 'individual' | 'entity';
      };
    }, 'Main'>;
  };

  const Tab = createBottomTabNavigator<MainTabParamList>();

  const MainTabNavigator: React.FC<MainTabNavigatorProps> = ({ route }) => {
    const { experienceType, accountType } = route.params;
    
    // Validate params
    if (!experienceType || !accountType) {
      throw new Error('MainTabNavigator: Missing required route parameters');
    }
    
    if (experienceType !== 'green' && experienceType !== 'thread') {
      throw new Error('MainTabNavigator: Invalid experienceType');
    }
    
    if (accountType !== 'individual' && accountType !== 'entity') {
      throw new Error('MainTabNavigator: Invalid accountType');
    }
    
    const theme: AppTheme = getTheme(experienceType);

  const getTabBarIcon = (
    routeName: string, 
    focused: boolean, 
    color: string, 
    size: number
  ): React.ReactElement => {
    let iconName: string;

    switch (routeName) {
      case 'Feed':
        iconName = focused ? 'home' : 'home';
        break;
      case 'Search':
        iconName = focused ? 'search' : 'search';
        break;
      case 'Challenges':
        return (
          <ChallengesIcon 
            size={size} 
            color={color} 
            focused={focused} 
            experienceType={experienceType} 
          />
        );
      case 'Circles':
        return (
          <CirclesIcon 
            size={size} 
            color={color} 
            focused={focused} 
            experienceType={experienceType} 
          />
        );
      case 'Rooms':
        return (
          <RoomsIcon 
            size={size} 
            color={color} 
            focused={focused} 
            experienceType={experienceType} 
          />
        );
      case 'Profile':
        iconName = focused ? 'person' : 'person';
        break;
      default:
        iconName = 'help-outline';
    }

    return <Icon name={iconName} size={size} color={color} />;
  };

  const getTabBarLabel = (routeName: string): string => {
    if (experienceType === 'green') {
      // Project Green (masculine-coded) labels
      switch (routeName) {
        case 'Feed':
          return 'Home';
        case 'Search':
          return 'Search';
        case 'Challenges':
          return 'Challenges';
        case 'Circles':
          return 'Circles';
        case 'Rooms':
          return 'Rooms';
        case 'Profile':
          return 'Profile';
        default:
          return routeName;
      }
    } else {
      // Project Thread (feminine-coded) labels
      switch (routeName) {
        case 'Feed':
          return 'Home';
        case 'Search':
          return 'Search';
        case 'Challenges':
          return 'Challenges';
        case 'Circles':
          return 'Circles';
        case 'Rooms':
          return 'Rooms';
        case 'Profile':
          return 'Profile';
        default:
          return routeName;
      }
    }
  };

  // Create screen wrapper to pass props - simplified for type compatibility
  const createScreenWrapper = (Component: React.ComponentType<any>) => {
    return (props: any) => (
      <Component 
        {...props} 
        experienceType={experienceType} 
        accountType={accountType} 
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) =>
          getTabBarIcon(route.name, focused, color, size),
        tabBarLabel: getTabBarLabel(route.name),
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: experienceType === 'green' ? '#888888' : '#AAAAAA',
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopColor: theme.colors.outline,
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: theme.fonts.medium,
          marginBottom: 4,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Feed" component={createScreenWrapper(FeedScreen)} />
      <Tab.Screen name="Search" component={createScreenWrapper(SearchScreen)} />
      <Tab.Screen name="Challenges" component={createScreenWrapper(ChallengesScreen)} />
      <Tab.Screen name="Circles" component={createScreenWrapper(CirclesScreen)} />
      <Tab.Screen name="Rooms" component={createScreenWrapper(RoomsScreen)} />
      <Tab.Screen name="Profile" component={createScreenWrapper(ProfileScreen)} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator; 