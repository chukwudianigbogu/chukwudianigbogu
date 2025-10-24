import React from 'react';
import { View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Svg, { Path, G } from 'react-native-svg';

interface CustomIconProps {
  size: number;
  color: string;
  focused?: boolean;
  experienceType?: 'green' | 'thread';
}

export const ChallengesIcon: React.FC<CustomIconProps> = ({ size, color, focused }) => {
  const starOpacities = focused ? [1.0, 0.9, 0.8] : [1.0, 0.7, 0.4]; // Enhanced focused state
  const starSize = size * 0.3;
  
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <G>
          {/* Three stars in parabolic/semi-circular arrangement */}
          {/* Left star - full opacity */}
          <Path
            d={`M${size * 0.2} ${size * 0.7} L${size * 0.25} ${size * 0.5} L${size * 0.3} ${size * 0.7} L${size * 0.35} ${size * 0.65} L${size * 0.32} ${size * 0.8} L${size * 0.2} ${size * 0.75} L${size * 0.08} ${size * 0.8} L${size * 0.05} ${size * 0.65} Z`}
            fill={color}
            opacity={starOpacities[0]}
          />
          {/* Center star - medium opacity */}
          <Path
            d={`M${size * 0.5} ${size * 0.4} L${size * 0.55} ${size * 0.2} L${size * 0.6} ${size * 0.4} L${size * 0.65} ${size * 0.35} L${size * 0.62} ${size * 0.5} L${size * 0.5} ${size * 0.45} L${size * 0.38} ${size * 0.5} L${size * 0.35} ${size * 0.35} Z`}
            fill={color}
            opacity={starOpacities[1]}
          />
          {/* Right star - variable opacity based on focus */}
          <Path
            d={`M${size * 0.8} ${size * 0.7} L${size * 0.85} ${size * 0.5} L${size * 0.9} ${size * 0.7} L${size * 0.95} ${size * 0.65} L${size * 0.92} ${size * 0.8} L${size * 0.8} ${size * 0.75} L${size * 0.68} ${size * 0.8} L${size * 0.65} ${size * 0.65} Z`}
            fill={color}
            opacity={starOpacities[2]}
          />
        </G>
      </Svg>
    </View>
  );
};

export const RoomsIcon: React.FC<CustomIconProps> = ({ size, color, focused }) => {
  // Enhanced focused state - use different icon or style
  const iconName = focused ? 'meeting-room' : 'meeting-room';
  const iconOpacity = focused ? 1.0 : 0.8;
  
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Icon 
        name={iconName} 
        size={size} 
        color={color} 
        style={{ opacity: iconOpacity }}
      />
    </View>
  );
};

export const CirclesIcon: React.FC<CustomIconProps> = ({ 
  size, 
  color, 
  focused, 
  experienceType = 'green' 
}) => {
  const [imageLoadError, setImageLoadError] = React.useState(false);
  
  // Determine which image to use based on experience type
  const getCircleImage = () => {
    try {
      if (experienceType === 'green') {
        // For male/green experience, use Men.png
        return require('../../assets/Men.png');
      } else {
        // For female/thread experience, use Women.png
        return require('../../assets/Women.png');
      }
    } catch (error) {
      console.warn('Failed to load custom circle image:', error);
      setImageLoadError(true);
      return null;
    }
  };

  // Fallback to default icon if image loading fails
  if (imageLoadError) {
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Icon 
          name="group" 
          size={size} 
          color={color} 
          style={{ opacity: focused ? 1.0 : 0.8 }}
        />
      </View>
    );
  }

  const imageSource = getCircleImage();
  
  // If no image source available, use fallback
  if (!imageSource) {
    return (
      <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Icon 
          name="group" 
          size={size} 
          color={color} 
          style={{ opacity: focused ? 1.0 : 0.8 }}
        />
      </View>
    );
  }

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={imageSource}
        style={{ 
          width: size, 
          height: size,
          tintColor: color,
          opacity: focused ? 1.0 : 0.8, // Enhanced focused state
          resizeMode: 'contain'
        }}
        onError={(error) => {
          console.warn('Image loading error:', error.nativeEvent.error);
          setImageLoadError(true);
        }}
      />
    </View>
  );
};

export default { ChallengesIcon, RoomsIcon, CirclesIcon }; 