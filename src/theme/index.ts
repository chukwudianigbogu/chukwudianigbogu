import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

// Base theme structure - EXPORTED for external use
export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
    surface: string;
    surfaceVariant: string;
    onPrimary: string;
    onSecondary: string;
    onBackground: string;
    onSurface: string;
    outline: string;
    shadow: string;
    error: string;
    warning: string;
    success: string;
  };
  fonts: {
    regular: string;
    medium: string;
    bold: string;
    light: string;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
    full: number;
  };
}

// Green Theme (Male Experience) - #F9FAFB (background), #B7CBDF (primary)
const greenTheme: AppTheme = {
  colors: {
    primary: '#B7CBDF',
    secondary: '#F9FAFB',
    tertiary: '#8FA8C4',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    surfaceVariant: '#F1F5F9',
    onPrimary: '#FFFFFF',
    onSecondary: '#1F2937',
    onBackground: '#1F2937',
    onSurface: '#374151',
    outline: '#E2E8F0',
    shadow: '#000000',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  },
  fonts: {
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    bold: 'Quicksand-Bold',
    light: 'Quicksand-Light',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
};

// Thread Theme (Female Experience) - #FCF8F9 (background), #EEBECE (primary)
const threadTheme: AppTheme = {
  colors: {
    primary: '#EEBECE',
    secondary: '#FCF8F9',
    tertiary: '#E8A5C0',
    background: '#FCF8F9',
    surface: '#FFFFFF',
    surfaceVariant: '#F9F5F6',
    onPrimary: '#FFFFFF',
    onSecondary: '#1F2937',
    onBackground: '#1F2937',
    onSurface: '#374151',
    outline: '#F3E8EA',
    shadow: '#000000',
    error: '#EF4444',
    warning: '#F59E0B',
    success: '#10B981',
  },
  fonts: {
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    bold: 'Quicksand-Bold',
    light: 'Quicksand-Light',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
};

// Font fallbacks for better reliability
const getFontWithFallback = (fontName: string): string => {
  const fallbacks = {
    'Quicksand-Regular': 'Quicksand-Regular, system font, -apple-system, BlinkMacSystemFont, sans-serif',
    'Quicksand-Medium': 'Quicksand-Medium, system font, -apple-system, BlinkMacSystemFont, sans-serif',
    'Quicksand-Bold': 'Quicksand-Bold, system font, -apple-system, BlinkMacSystemFont, sans-serif',
    'Quicksand-Light': 'Quicksand-Light, system font, -apple-system, BlinkMacSystemFont, sans-serif',
  };
  return fallbacks[fontName as keyof typeof fallbacks] || fontName;
};

// Theme selector function
export const getTheme = (experienceType: 'green' | 'thread'): AppTheme => {
  const baseTheme = experienceType === 'green' ? greenTheme : threadTheme;
  
  // Apply font fallbacks
  return {
    ...baseTheme,
    fonts: {
      regular: getFontWithFallback(baseTheme.fonts.regular),
      medium: getFontWithFallback(baseTheme.fonts.medium),
      bold: getFontWithFallback(baseTheme.fonts.bold),
      light: getFontWithFallback(baseTheme.fonts.light),
    },
  };
};

// React Native Paper theme integration
export const getPaperTheme = (experienceType: 'green' | 'thread') => {
  const appTheme = getTheme(experienceType);
  
  return {
    ...MD3LightTheme,
    colors: {
      ...MD3LightTheme.colors,
      primary: appTheme.colors.primary,
      secondary: appTheme.colors.secondary,
      tertiary: appTheme.colors.tertiary,
      background: appTheme.colors.background,
      surface: appTheme.colors.surface,
      surfaceVariant: appTheme.colors.surfaceVariant,
      onPrimary: appTheme.colors.onPrimary,
      onSecondary: appTheme.colors.onSecondary,
      onBackground: appTheme.colors.onBackground,
      onSurface: appTheme.colors.onSurface,
      outline: appTheme.colors.outline,
      error: appTheme.colors.error,
    },
    fonts: {
      ...MD3LightTheme.fonts,
      regular: {
        fontFamily: appTheme.fonts.regular,
        fontWeight: '400' as const,
      },
      medium: {
        fontFamily: appTheme.fonts.medium,
        fontWeight: '500' as const,
      },
      bold: {
        fontFamily: appTheme.fonts.bold,
        fontWeight: '700' as const,
      },
    },
  };
};

// Export individual themes for direct access
export { greenTheme, threadTheme };

export default { getTheme, getPaperTheme, greenTheme, threadTheme }; 