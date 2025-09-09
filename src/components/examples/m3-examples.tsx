/**
 * Examples showcasing Material Design 3 implementation
 * This file demonstrates how to use the new M3 tokens and utilities
 */

import React from 'react';
import {
    createM3ButtonClasses,
    createM3InputClasses,
    createM3CardClasses,
    createM3IconButtonClasses,
    materialMotion,
    cn,
} from '@/lib/material-design';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

export function M3ButtonExamples() {
    return (
        <div className="space-y-4 p-6">
            <h3 className="text-headline-small text-on-surface">M3 Button Examples</h3>

            {/* Button variants */}
            <div className="flex gap-4 flex-wrap">
                <button className={createM3ButtonClasses('filled', 'md')}>
                    Filled Button
                </button>
                <button className={createM3ButtonClasses('outlined', 'md')}>
                    Outlined Button
                </button>
                <button className={createM3ButtonClasses('text', 'md')}>
                    Text Button
                </button>
            </div>

            {/* Button sizes */}
            <div className="flex gap-4 items-center flex-wrap">
                <button className={createM3ButtonClasses('filled', 'sm')}>
                    Small
                </button>
                <button className={createM3ButtonClasses('filled', 'md')}>
                    Medium
                </button>
                <button className={createM3ButtonClasses('filled', 'lg')}>
                    Large
                </button>
            </div>

            {/* Icon buttons */}
            <div className="flex gap-4 items-center">
                <button className={createM3IconButtonClasses('small')}>
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button className={createM3IconButtonClasses('medium')}>
                    <FontAwesomeIcon icon={faPen} />
                </button>
                <button className={createM3IconButtonClasses('large')}>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
}

export function M3CardExamples() {
    return (
        <div className="space-y-4 p-6">
            <h3 className="text-headline-small text-on-surface">M3 Card Examples</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={createM3CardClasses('level1')}>
                    <h4 className="text-title-medium text-on-surface mb-2">Level 1 Elevation</h4>
                    <p className="text-body-medium text-on-surface-variant">
                        Basic card with subtle elevation for content organization.
                    </p>
                </div>

                <div className={createM3CardClasses('level2')}>
                    <h4 className="text-title-medium text-on-surface mb-2">Level 2 Elevation</h4>
                    <p className="text-body-medium text-on-surface-variant">
                        Medium elevation for interactive elements and emphasis.
                    </p>
                </div>

                <div className={createM3CardClasses('level3')}>
                    <h4 className="text-title-medium text-on-surface mb-2">Level 3 Elevation</h4>
                    <p className="text-body-medium text-on-surface-variant">
                        Higher elevation for floating action buttons and dialogs.
                    </p>
                </div>
            </div>
        </div>
    );
}

export function M3InputExamples() {
    return (
        <div className="space-y-4 p-6 max-w-md">
            <h3 className="text-headline-small text-on-surface">M3 Input Examples</h3>

            <div className="space-y-3">
                <input
                    className={createM3InputClasses()}
                    placeholder="Email address"
                    type="email"
                />
                <input
                    className={createM3InputClasses()}
                    placeholder="Password"
                    type="password"
                />
                <textarea
                    className={createM3InputClasses()}
                    placeholder="Your message..."
                    rows={4}
                />
            </div>
        </div>
    );
}

export function M3TypographyExamples() {
    return (
        <div className="space-y-6 p-6">
            <h3 className="text-headline-small text-on-surface">M3 Typography Examples</h3>

            {/* Display - using Tailwind classes instead of inline styles for simplicity */}
            <section className="space-y-2">
                <h4 className="text-title-medium text-primary">Display</h4>
                <p className="text-display-large text-on-surface">
                    Display Large
                </p>
                <p className="text-display-medium text-on-surface">
                    Display Medium
                </p>
                <p className="text-display-small text-on-surface">
                    Display Small
                </p>
            </section>

            {/* Headlines */}
            <section className="space-y-2">
                <h4 className="text-title-medium text-primary">Headlines</h4>
                <h1 className="text-headline-large text-on-surface">
                    Headline Large
                </h1>
                <h2 className="text-headline-medium text-on-surface">
                    Headline Medium
                </h2>
                <h3 className="text-headline-small text-on-surface">
                    Headline Small
                </h3>
            </section>

            {/* Titles */}
            <section className="space-y-2">
                <h4 className="text-title-medium text-primary">Titles</h4>
                <h4 className="text-title-large text-on-surface">
                    Title Large
                </h4>
                <h5 className="text-title-medium text-on-surface">
                    Title Medium
                </h5>
                <h6 className="text-title-small text-on-surface">
                    Title Small
                </h6>
            </section>

            {/* Body */}
            <section className="space-y-2">
                <h4 className="text-title-medium text-primary">Body</h4>
                <p className="text-body-large text-on-surface">
                    Body Large - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
                <p className="text-body-medium text-on-surface">
                    Body Medium - Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p className="text-body-small text-on-surface">
                    Body Small - Ut enim ad minim veniam, quis nostrud exercitation.
                </p>
            </section>

            {/* Labels */}
            <section className="space-y-2">
                <h4 className="text-title-medium text-primary">Labels</h4>
                <label className="text-label-large text-on-surface block">
                    Label Large
                </label>
                <label className="text-label-medium text-on-surface block">
                    Label Medium
                </label>
                <label className="text-label-small text-on-surface block">
                    Label Small
                </label>
            </section>
        </div>
    );
}

export function M3MotionExamples() {
    const [isAnimating, setIsAnimating] = React.useState(false);

    const triggerAnimation = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
    };

    return (
        <div className="space-y-4 p-6">
            <h3 className="text-headline-small text-on-surface">M3 Motion Examples</h3>

            <button
                onClick={triggerAnimation}
                className={createM3ButtonClasses('filled', 'md')}
            >
                Trigger Animations
            </button>

            <div className="space-y-4">
                {/* Hover lift animation */}
                <div
                    className={cn(
                        "p-4 bg-surface-container rounded-lg cursor-pointer",
                        materialMotion.classes.hoverLift
                    )}
                >
                    <p className="text-body-medium text-on-surface">
                        Hover Lift - Hover over this card to see the elevation change
                    </p>
                </div>

                {/* Focus ring animation */}
                <input
                    className={cn(
                        createM3InputClasses(),
                        materialMotion.classes.focusRing
                    )}
                    placeholder="Focus to see ring animation"
                />

                {/* Scale animation */}
                <div
                    className={cn(
                        "p-4 bg-primary text-on-primary rounded-lg transition-transform cursor-pointer",
                        "hover:scale-95 active:scale-95",
                        isAnimating ? "scale-95" : "scale-100"
                    )}
                >
                    <p className="text-body-medium">
                        Scale Press - Click the button above to see scale animation
                    </p>
                </div>

                {/* Fade animation */}
                <div
                    className={cn(
                        "p-4 bg-tertiary-container text-on-tertiary-container rounded-lg transition-opacity duration-300",
                        isAnimating ? "opacity-30" : "opacity-100"
                    )}
                >
                    <p className="text-body-medium">
                        Fade - Triggered by button click
                    </p>
                </div>
            </div>

            {/* Custom easing examples */}
            <div className="space-y-2">
                <h4 className="text-title-medium text-primary">Easing Curves</h4>
                <div className="grid grid-cols-2 gap-4">
                    <div
                        className="h-16 bg-secondary text-on-secondary rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-500"
                        style={{ transitionTimingFunction: materialMotion.easing.standard }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(20px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                        <span className="text-label-medium">Standard Easing</span>
                    </div>

                    <div
                        className="h-16 bg-tertiary text-on-tertiary rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-500"
                        style={{ transitionTimingFunction: materialMotion.easing.emphasized }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(20px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                    >
                        <span className="text-label-medium">Emphasized</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function M3SystemDemo() {
    return (
        <div className="min-h-screen bg-surface p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-display-medium text-on-surface">
                        Material Design 3 System
                    </h1>
                    <p className="text-body-large text-on-surface-variant">
                        Complete implementation following official M3 specifications
                    </p>
                </div>

                <div className="grid gap-8">
                    <div className={createM3CardClasses('level1')}>
                        <M3ButtonExamples />
                    </div>

                    <div className={createM3CardClasses('level1')}>
                        <M3InputExamples />
                    </div>

                    <div className={createM3CardClasses('level1')}>
                        <M3CardExamples />
                    </div>

                    <div className={createM3CardClasses('level1')}>
                        <M3TypographyExamples />
                    </div>

                    <div className={createM3CardClasses('level1')}>
                        <M3MotionExamples />
                    </div>
                </div>
            </div>
        </div>
    );
}
