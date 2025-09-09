import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { materialComponents, materialShapes, materialTypography, materialSpacing, materialColors } from "@/lib/material-design";

// Material Design 3 Text Field specifications
const inputVariants = cva(
    "flex w-full transition-all duration-200 ease-in-out file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-38",
    {
        variants: {
            variant: {
                // Filled text field - more emphasis, good for forms
                filled: [
                    "bg-surface-variant border-0 border-b-2 border-outline",
                    "text-on-surface placeholder:text-on-surface-variant",
                    "hover:bg-on-surface/4 hover:border-on-surface",
                    "focus:bg-on-surface/8 focus:border-primary",
                    "active:bg-on-surface/12",
                    "disabled:bg-on-surface/4 disabled:border-on-surface/38 disabled:text-on-surface/38"
                ],
                // Outlined text field - less emphasis, good for simple forms
                outlined: [
                    "bg-transparent border border-outline",
                    "text-on-surface placeholder:text-on-surface-variant",
                    "hover:border-on-surface",
                    "focus:border-2 focus:border-primary",
                    "disabled:border-on-surface/12 disabled:text-on-surface/38"
                ]
            },
            state: {
                default: "",
                error: "border-error focus:border-error text-error placeholder:text-error/60",
                success: "border-success focus:border-success"
            },
            size: {
                default: "",
                small: "text-sm",
                large: "text-lg"
            }
        },
        defaultVariants: {
            variant: "outlined",
            state: "default",
            size: "default",
        },
    }
);

export interface InputProps
    extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
    label?: string;
    helperText?: string;
    error?: boolean;
    success?: boolean;
    leadingIcon?: React.ReactNode;
    trailingIcon?: React.ReactNode;
    onTrailingIconClick?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({
        className,
        variant,
        state,
        size,
        type,
        label,
        helperText,
        error,
        success,
        leadingIcon,
        trailingIcon,
        onTrailingIconClick,
        disabled,
        id,
        ...props
    }, ref) => {
        // Determine state based on props
        const computedState = error ? "error" : success ? "success" : state || "default";

        // Generate unique ID if not provided
        const inputId = id || React.useId();
        const helperTextId = helperText ? `${inputId}-helper` : undefined;

        const getInputStyles = () => {
            const baseStyles = {
                fontSize: materialTypography.bodyLarge.fontSize, // 16px
                fontWeight: materialTypography.bodyLarge.fontWeight,
                lineHeight: materialTypography.bodyLarge.lineHeight,
                letterSpacing: materialTypography.bodyLarge.letterSpacing,
            };

            if (variant === "filled") {
                return {
                    ...baseStyles,
                    height: "56px", // Material Design 3 spec for filled text field
                    borderRadius: `${materialShapes.corner.extraSmall} ${materialShapes.corner.extraSmall} 0 0`, // 4px top corners only
                    paddingLeft: leadingIcon ? "52px" : materialSpacing.md, // 16px or 52px with icon
                    paddingRight: trailingIcon ? "52px" : materialSpacing.md,
                    paddingTop: label ? "28px" : "16px", // Space for floating label
                    paddingBottom: "8px",
                };
            } else { // outlined
                return {
                    ...baseStyles,
                    height: "56px", // Material Design 3 spec for outlined text field
                    borderRadius: materialShapes.corner.extraSmall, // 4px all corners
                    paddingLeft: leadingIcon ? "52px" : materialSpacing.md,
                    paddingRight: trailingIcon ? "52px" : materialSpacing.md,
                    paddingTop: "0",
                    paddingBottom: "0",
                };
            }
        };

        return (
            <div className="relative w-full">
                {/* Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            "absolute transition-all duration-200 pointer-events-none",
                            variant === "filled"
                                ? "left-4 top-2 text-xs text-on-surface-variant"
                                : "left-3 -top-2 text-xs bg-surface px-1 text-on-surface-variant",
                            computedState === "error" && "text-error",
                            disabled && "text-on-surface/38"
                        )}
                        style={{
                            fontSize: materialTypography.bodySmall.fontSize, // 12px
                            fontWeight: materialTypography.bodySmall.fontWeight,
                        }}
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    {/* Leading Icon */}
                    {leadingIcon && (
                        <div
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant"
                            style={{ fontSize: "24px" }}
                        >
                            {leadingIcon}
                        </div>
                    )}

                    {/* Input */}
                    <input
                        type={type}
                        className={cn(inputVariants({ variant, state: computedState, size }), className)}
                        style={getInputStyles()}
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        aria-describedby={helperTextId}
                        aria-invalid={error}
                        {...props}
                    />

                    {/* Trailing Icon */}
                    {trailingIcon && (
                        <div
                            className={cn(
                                "absolute right-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant",
                                onTrailingIconClick && "cursor-pointer hover:text-on-surface"
                            )}
                            style={{ fontSize: "24px" }}
                            onClick={onTrailingIconClick}
                        >
                            {trailingIcon}
                        </div>
                    )}
                </div>

                {/* Helper Text / Error Message */}
                {helperText && (
                    <div
                        id={helperTextId}
                        className={cn(
                            "mt-1 text-on-surface-variant",
                            computedState === "error" && "text-error",
                            disabled && "text-on-surface/38"
                        )}
                        style={{
                            fontSize: materialTypography.bodySmall.fontSize, // 12px
                            fontWeight: materialTypography.bodySmall.fontWeight,
                            paddingLeft: materialSpacing.md,
                        }}
                    >
                        {helperText}
                    </div>
                )}
            </div>
        );
    }
);
Input.displayName = "Input";

// Textarea component following Material Design 3 specifications
const Textarea = React.forwardRef<HTMLTextAreaElement,
    Omit<React.ComponentProps<"textarea">, "size"> &
    Pick<InputProps, "variant" | "state" | "label" | "helperText" | "error" | "success">
>(({
    className,
    variant = "outlined",
    state,
    label,
    helperText,
    error,
    success,
    disabled,
    id,
    rows = 3,
    ...props
}, ref) => {
    const computedState = error ? "error" : success ? "success" : state || "default";
    const inputId = id || React.useId();
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    const getTextareaStyles = () => {
        const baseStyles = {
            fontSize: materialTypography.bodyLarge.fontSize,
            fontWeight: materialTypography.bodyLarge.fontWeight,
            lineHeight: materialTypography.bodyLarge.lineHeight,
            letterSpacing: materialTypography.bodyLarge.letterSpacing,
        };

        if (variant === "filled") {
            return {
                ...baseStyles,
                borderRadius: `${materialShapes.corner.extraSmall} ${materialShapes.corner.extraSmall} 0 0`,
                padding: label ? "28px 16px 8px 16px" : "16px",
                minHeight: "56px",
            };
        } else {
            return {
                ...baseStyles,
                borderRadius: materialShapes.corner.extraSmall,
                padding: "16px",
                minHeight: "56px",
            };
        }
    };

    return (
        <div className="relative w-full">
            {label && (
                <label
                    htmlFor={inputId}
                    className={cn(
                        "absolute transition-all duration-200 pointer-events-none",
                        variant === "filled"
                            ? "left-4 top-2 text-xs text-on-surface-variant"
                            : "left-3 -top-2 text-xs bg-surface px-1 text-on-surface-variant",
                        computedState === "error" && "text-error",
                        disabled && "text-on-surface/38"
                    )}
                    style={{
                        fontSize: materialTypography.bodySmall.fontSize,
                        fontWeight: materialTypography.bodySmall.fontWeight,
                    }}
                >
                    {label}
                </label>
            )}

            <textarea
                className={cn(inputVariants({ variant, state: computedState }), "resize-none", className)}
                style={getTextareaStyles()}
                ref={ref}
                id={inputId}
                disabled={disabled}
                aria-describedby={helperTextId}
                aria-invalid={error}
                rows={rows}
                {...props}
            />

            {helperText && (
                <div
                    id={helperTextId}
                    className={cn(
                        "mt-1 text-on-surface-variant",
                        computedState === "error" && "text-error",
                        disabled && "text-on-surface/38"
                    )}
                    style={{
                        fontSize: materialTypography.bodySmall.fontSize,
                        fontWeight: materialTypography.bodySmall.fontWeight,
                        paddingLeft: materialSpacing.md,
                    }}
                >
                    {helperText}
                </div>
            )}
        </div>
    );
});
Textarea.displayName = "Textarea";

// Search input component with built-in search icon
const SearchInput = React.forwardRef<HTMLInputElement,
    Omit<InputProps, "leadingIcon" | "type"> & { onClear?: () => void }
>(({ onClear, trailingIcon, onTrailingIconClick, value, ...props }, ref) => {
    const handleClear = () => {
        onClear?.();
        onTrailingIconClick?.();
    };

    return (
        <Input
            {...props}
            ref={ref}
            type="search"
            leadingIcon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z" />
                </svg>
            }
            trailingIcon={
                value && (trailingIcon || (
                    <button type="button" onClick={handleClear} className="hover:text-on-surface">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </button>
                ))
            }
            onTrailingIconClick={onClear ? handleClear : onTrailingIconClick}
            value={value}
        />
    );
});
SearchInput.displayName = "SearchInput";

// Password input component with show/hide functionality
const PasswordInput = React.forwardRef<HTMLInputElement,
    Omit<InputProps, "type" | "trailingIcon" | "onTrailingIconClick">
>(({ ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
        <Input
            {...props}
            ref={ref}
            type={showPassword ? "text" : "password"}
            trailingIcon={
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-on-surface"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" />
                        </svg>
                    ) : (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                        </svg>
                    )}
                </button>
            }
        />
    );
});
PasswordInput.displayName = "PasswordInput";

export { Input, Textarea, SearchInput, PasswordInput, inputVariants };
