import * as React from "react";

import { cn } from "@/lib/utils";
import { materialColors, materialTypography, materialShapes, materialSpacing } from "@/lib/material-design";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
    ({ className, style, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex w-full border border-outline bg-background text-on-background ring-offset-background placeholder:text-on-surface-variant focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ease-in-out hover:border-on-surface resize-vertical",
                    className
                )}
                style={{
                    minHeight: '80px',
                    borderRadius: materialShapes.corner.extraSmall,
                    padding: `${materialSpacing.md} ${materialSpacing.md}`,
                    ...materialTypography.bodyLarge,
                    ...style,
                }}
                ref={ref}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

export { Textarea };
