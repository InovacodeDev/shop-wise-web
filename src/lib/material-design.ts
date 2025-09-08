/**
 * Material Design 3 (Material You) Design System Configuration
 * Following Google Material Design 3 specifications for consistent UI/UX
 */

// Material 3 Color Roles
export const materialColors = {
    // Primary Colors
    primary: {
        primary: 'hsl(122 46% 34%)', // Main brand color - green
        onPrimary: 'hsl(0 0% 100%)',
        primaryContainer: 'hsl(122 46% 95%)',
        onPrimaryContainer: 'hsl(122 46% 12%)',
    },

    // Secondary Colors
    secondary: {
        secondary: 'hsl(45 100% 51%)', // Accent color - amber
        onSecondary: 'hsl(0 0% 0%)',
        secondaryContainer: 'hsl(45 100% 95%)',
        onSecondaryContainer: 'hsl(45 100% 12%)',
    },

    // Tertiary Colors
    tertiary: {
        tertiary: 'hsl(212 92% 51%)', // Blue
        onTertiary: 'hsl(0 0% 100%)',
        tertiaryContainer: 'hsl(212 92% 95%)',
        onTertiaryContainer: 'hsl(212 92% 12%)',
    },

    // Error Colors
    error: {
        error: 'hsl(0 63% 49%)',
        onError: 'hsl(0 0% 100%)',
        errorContainer: 'hsl(0 63% 95%)',
        onErrorContainer: 'hsl(0 63% 12%)',
    },

    // Neutral Colors
    neutral: {
        surface: 'hsl(0 0% 100%)',
        onSurface: 'hsl(240 10% 4%)',
        surfaceVariant: 'hsl(220 14% 96%)',
        onSurfaceVariant: 'hsl(240 6% 46%)',
        outline: 'hsl(240 6% 73%)',
        outlineVariant: 'hsl(240 6% 88%)',
        background: 'hsl(0 0% 100%)',
        onBackground: 'hsl(240 10% 4%)',
    },

    // Dark Theme Colors
    dark: {
        primary: 'hsl(122 46% 78%)',
        onPrimary: 'hsl(122 46% 12%)',
        primaryContainer: 'hsl(122 46% 18%)',
        onPrimaryContainer: 'hsl(122 46% 88%)',

        secondary: 'hsl(45 100% 78%)',
        onSecondary: 'hsl(45 100% 12%)',
        secondaryContainer: 'hsl(45 100% 18%)',
        onSecondaryContainer: 'hsl(45 100% 88%)',

        tertiary: 'hsl(212 92% 78%)',
        onTertiary: 'hsl(212 92% 12%)',
        tertiaryContainer: 'hsl(212 92% 18%)',
        onTertiaryContainer: 'hsl(212 92% 88%)',

        error: 'hsl(0 63% 78%)',
        onError: 'hsl(0 63% 12%)',
        errorContainer: 'hsl(0 63% 18%)',
        onErrorContainer: 'hsl(0 63% 88%)',

        surface: 'hsl(224 71% 4%)',
        onSurface: 'hsl(210 40% 98%)',
        surfaceVariant: 'hsl(215 28% 17%)',
        onSurfaceVariant: 'hsl(215 20% 65%)',
        outline: 'hsl(215 28% 42%)',
        outlineVariant: 'hsl(215 28% 26%)',
        background: 'hsl(224 71% 4%)',
        onBackground: 'hsl(210 40% 98%)',
    },
};

// Material 3 Typography Scale
export const materialTypography = {
    // Display styles - largest text
    displayLarge: {
        fontSize: '3.5rem', // 56px
        lineHeight: '4rem', // 64px
        fontWeight: '400',
        letterSpacing: '-0.025em',
    },
    displayMedium: {
        fontSize: '2.8125rem', // 45px
        lineHeight: '3.25rem', // 52px
        fontWeight: '400',
        letterSpacing: '0',
    },
    displaySmall: {
        fontSize: '2.25rem', // 36px
        lineHeight: '2.75rem', // 44px
        fontWeight: '400',
        letterSpacing: '0',
    },

    // Headline styles - high-emphasis text
    headlineLarge: {
        fontSize: '2rem', // 32px
        lineHeight: '2.5rem', // 40px
        fontWeight: '400',
        letterSpacing: '0',
    },
    headlineMedium: {
        fontSize: '1.75rem', // 28px
        lineHeight: '2.25rem', // 36px
        fontWeight: '400',
        letterSpacing: '0',
    },
    headlineSmall: {
        fontSize: '1.5rem', // 24px
        lineHeight: '2rem', // 32px
        fontWeight: '400',
        letterSpacing: '0',
    },

    // Title styles - medium-emphasis text
    titleLarge: {
        fontSize: '1.375rem', // 22px
        lineHeight: '1.75rem', // 28px
        fontWeight: '400',
        letterSpacing: '0',
    },
    titleMedium: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        fontWeight: '500',
        letterSpacing: '0.009375em',
    },
    titleSmall: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        fontWeight: '500',
        letterSpacing: '0.00625em',
    },

    // Label styles - text used in components
    labelLarge: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        fontWeight: '500',
        letterSpacing: '0.00625em',
    },
    labelMedium: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px
        fontWeight: '500',
        letterSpacing: '0.03125em',
    },
    labelSmall: {
        fontSize: '0.6875rem', // 11px
        lineHeight: '1rem', // 16px
        fontWeight: '500',
        letterSpacing: '0.03125em',
    },

    // Body styles - body text
    bodyLarge: {
        fontSize: '1rem', // 16px
        lineHeight: '1.5rem', // 24px
        fontWeight: '400',
        letterSpacing: '0.03125em',
    },
    bodyMedium: {
        fontSize: '0.875rem', // 14px
        lineHeight: '1.25rem', // 20px
        fontWeight: '400',
        letterSpacing: '0.015625em',
    },
    bodySmall: {
        fontSize: '0.75rem', // 12px
        lineHeight: '1rem', // 16px
        fontWeight: '400',
        letterSpacing: '0.025em',
    },
};

// Material 3 Elevation (Shadow) System
export const materialElevation = {
    level0: 'none', // Surface
    level1: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    level2: '0px 1px 2px 0px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
    level3: '0px 1px 3px 0px rgba(0, 0, 0, 0.3), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)',
    level4: '0px 2px 3px 0px rgba(0, 0, 0, 0.3), 0px 6px 10px 4px rgba(0, 0, 0, 0.15)',
    level5: '0px 4px 4px 0px rgba(0, 0, 0, 0.3), 0px 8px 12px 6px rgba(0, 0, 0, 0.15)',
};

// Material 3 Shape System
export const materialShapes = {
    corner: {
        none: '0px',
        extraSmall: '4px',
        small: '8px',
        medium: '12px',
        large: '16px',
        extraLarge: '24px',
        full: '9999px',
    },

    // Component-specific shape tokens
    components: {
        button: '24px',
        card: '12px',
        dialog: '16px',
        sheet: '16px',
        chip: '8px',
        fab: '16px',
        navigationDrawer: '0px',
        tooltip: '4px',
    },
};

// Material 3 Motion/Animation System
export const materialMotion = {
    duration: {
        short1: '50ms',
        short2: '100ms',
        short3: '150ms',
        short4: '200ms',
        medium1: '250ms',
        medium2: '300ms',
        medium3: '350ms',
        medium4: '400ms',
        long1: '450ms',
        long2: '500ms',
        long3: '550ms',
        long4: '600ms',
    },

    easing: {
        standard: 'cubic-bezier(0.2, 0, 0, 1)',
        standardAccelerate: 'cubic-bezier(0.3, 0, 1, 1)',
        standardDecelerate: 'cubic-bezier(0, 0, 0, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
        emphasizedAccelerate: 'cubic-bezier(0.3, 0, 0.8, 0.15)',
        emphasizedDecelerate: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
        legacy: 'cubic-bezier(0.4, 0, 0.2, 1)',
        legacyAccelerate: 'cubic-bezier(0.4, 0, 1, 1)',
        legacyDecelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    },
};

// Material 3 Spacing System
export const materialSpacing = {
    density: {
        default: '24px',
        comfortable: '16px',
        compact: '8px',
    },

    baseline: '4px', // Base unit

    // Semantic spacing tokens
    xs: '4px', // 1 unit
    sm: '8px', // 2 units
    md: '16px', // 4 units
    lg: '24px', // 6 units
    xl: '32px', // 8 units
    '2xl': '48px', // 12 units
    '3xl': '64px', // 16 units

    // Component spacing
    component: {
        padding: {
            button: '16px 24px',
            card: '16px',
            dialog: '24px',
            sheet: '16px',
            listItem: '16px',
        },
        margin: {
            section: '24px',
            component: '16px',
            element: '8px',
        },
    },
};

// Material 3 Component Specifications
export const materialComponents = {
    button: {
        height: {
            small: '32px',
            medium: '40px',
            large: '48px',
        },
        borderRadius: materialShapes.components.button,
        typography: materialTypography.labelLarge,
    },

    card: {
        borderRadius: materialShapes.components.card,
        elevation: materialElevation.level1,
        padding: materialSpacing.component.padding.card,
    },

    fab: {
        size: {
            small: '40px',
            medium: '56px',
            large: '96px',
        },
        borderRadius: materialShapes.components.fab,
        elevation: materialElevation.level3,
    },

    navigationBar: {
        height: '80px',
        elevation: materialElevation.level2,
    },

    topAppBar: {
        height: {
            small: '64px',
            medium: '112px',
            large: '152px',
        },
        elevation: materialElevation.level0,
    },

    navigationDrawer: {
        width: '360px',
        borderRadius: materialShapes.components.navigationDrawer,
        elevation: materialElevation.level1,
    },

    dialog: {
        borderRadius: materialShapes.components.dialog,
        elevation: materialElevation.level3,
        padding: materialSpacing.component.padding.dialog,
    },

    sheet: {
        borderRadius: materialShapes.components.sheet,
        elevation: materialElevation.level1,
        padding: materialSpacing.component.padding.sheet,
    },

    chip: {
        height: '32px',
        borderRadius: materialShapes.components.chip,
        typography: materialTypography.labelMedium,
    },

    textField: {
        height: {
            filled: '56px',
            outlined: '56px',
        },
        borderRadius: materialShapes.corner.extraSmall,
    },

    list: {
        itemHeight: {
            oneLineText: '56px',
            twoLineText: '72px',
            threeLineText: '88px',
        },
        padding: materialSpacing.component.padding.listItem,
    },
};

// Utility function to get Material 3 theme colors
export const getMaterialTheme = (isDark: boolean = false) => {
    return isDark ? materialColors.dark : materialColors;
};

// Utility function to apply Material 3 typography
export const getMaterialTypography = (variant: keyof typeof materialTypography) => {
    return materialTypography[variant];
};

// Utility function to apply Material 3 elevation
export const getMaterialElevation = (level: keyof typeof materialElevation) => {
    return materialElevation[level];
};

export default {
    colors: materialColors,
    typography: materialTypography,
    elevation: materialElevation,
    shapes: materialShapes,
    motion: materialMotion,
    spacing: materialSpacing,
    components: materialComponents,
    getMaterialTheme,
    getMaterialTypography,
    getMaterialElevation,
};
