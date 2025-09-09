import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { materialComponents, materialShapes, materialSpacing, materialElevation, materialTypography, materialColors } from "@/lib/material-design";

// Material Design 3 Card specifications
const cardVariants = cva(
    "transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
    {
        variants: {
            variant: {
                // Elevated cards have a drop shadow, providing more separation from the background
                elevated: [
                    "bg-surface text-on-surface",
                    "hover:shadow-lg active:shadow-md",
                    "border-0"
                ],
                // Filled cards provide subtle separation from the background
                filled: [
                    "bg-surface-variant text-on-surface-variant",
                    "hover:bg-surface-variant/80 hover:shadow-sm",
                    "border-0"
                ],
                // Outlined cards have a visual boundary around the container
                outlined: [
                    "bg-surface text-on-surface",
                    "border border-outline",
                    "hover:bg-surface-variant/8 hover:shadow-sm",
                    "active:bg-surface-variant/12"
                ]
            },
            interactive: {
                true: "cursor-pointer hover:scale-[1.02] active:scale-[0.98]",
                false: ""
            }
        },
        defaultVariants: {
            variant: "elevated",
            interactive: false,
        },
    }
);

export interface CardProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
    asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, variant, interactive, style, ...props }, ref) => {
        const getElevation = () => {
            switch (variant) {
                case "elevated":
                    return materialElevation.level1;
                case "filled":
                    return "none";
                case "outlined":
                    return "none";
                default:
                    return materialElevation.level1;
            }
        };

        return (
            <div
                ref={ref}
                className={cn(cardVariants({ variant, interactive }), className)}
                style={{
                    borderRadius: materialShapes.components.card, // 12px
                    boxShadow: getElevation(),
                    ...style,
                }}
                {...props}
            />
        );
    }
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex flex-col space-y-1.5", className)}
            style={{
                padding: materialSpacing.md, // 16px - Material Design 3 spec for card content padding
                paddingBottom: materialSpacing.xs // 4px - reduced bottom padding to maintain proper spacing
            }}
            {...props}
        />
    )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h3
            ref={ref}
            className={cn("font-medium leading-tight tracking-tight", className)}
            style={{
                // Material Design 3 headline text for card titles
                fontSize: materialTypography.headlineSmall.fontSize, // 24px
                fontWeight: materialTypography.headlineSmall.fontWeight,
                lineHeight: materialTypography.headlineSmall.lineHeight,
                letterSpacing: materialTypography.headlineSmall.letterSpacing,
            }}
            {...props}
        />
    )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-on-surface-variant opacity-80", className)}
            style={{
                // Material Design 3 body text for card descriptions/subheads
                fontSize: materialTypography.bodyMedium.fontSize, // 14px
                fontWeight: materialTypography.bodyMedium.fontWeight,
                lineHeight: materialTypography.bodyMedium.lineHeight,
                letterSpacing: materialTypography.bodyMedium.letterSpacing,
            }}
            {...props}
        />
    )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("", className)}
            style={{
                padding: `0 ${materialSpacing.md} ${materialSpacing.md}`, // 0 16px 16px
                fontSize: materialTypography.bodyMedium.fontSize,
                lineHeight: materialTypography.bodyMedium.lineHeight
            }}
            {...props}
        />
    )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("flex items-center", className)}
            style={{
                padding: `0 ${materialSpacing.md} ${materialSpacing.md}`, // 0 16px 16px
                gap: materialSpacing.sm // 8px gap between action elements
            }}
            {...props}
        />
    )
);
CardFooter.displayName = "CardFooter";

// Additional Material Design 3 Card components
const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("overflow-hidden", className)}
            style={{
                borderRadius: `${materialShapes.components.card} ${materialShapes.components.card} 0 0`, // Rounded top corners only
            }}
            {...props}
        >
            {children}
        </div>
    )
);
CardMedia.displayName = "CardMedia";

const CardSubhead = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p
            ref={ref}
            className={cn("text-on-surface-variant", className)}
            style={{
                fontSize: materialTypography.bodySmall.fontSize, // 12px
                fontWeight: materialTypography.bodySmall.fontWeight,
                lineHeight: materialTypography.bodySmall.lineHeight,
                letterSpacing: materialTypography.bodySmall.letterSpacing,
                marginTop: materialSpacing.xs, // 4px
            }}
            {...props}
        />
    )
);
CardSubhead.displayName = "CardSubhead";

const CardSupportingText = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("text-on-surface", className)}
            style={{
                fontSize: materialTypography.bodyMedium.fontSize,
                fontWeight: materialTypography.bodyMedium.fontWeight,
                lineHeight: materialTypography.bodyMedium.lineHeight,
                letterSpacing: materialTypography.bodyMedium.letterSpacing,
                marginTop: materialSpacing.sm, // 8px
            }}
            {...props}
        />
    )
);
CardSupportingText.displayName = "CardSupportingText";

export {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent,
    CardMedia,
    CardSubhead,
    CardSupportingText,
    cardVariants
};
