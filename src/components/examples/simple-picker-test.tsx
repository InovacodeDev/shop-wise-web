"use client";

import React, { useState } from "react";
import {
    DatePicker,
    DatePickerTrigger,
    DatePickerContent,
    ModalDatePickerTrigger,
    ModalDatePickerContent,
    TimePicker,
    TimePickerTrigger,
    TimePickerDial,
    TimePickerInputMode
} from "@/components/md3/pickers";

// Simple test component to verify the pickers work
export const SimplePickerTest: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState("");

    return (
        <div className="p-8 space-y-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold">Picker Components Test</h1>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Docked Date Picker</h2>
                <DatePicker variant="docked" value={selectedDate} onValueChange={setSelectedDate}>
                    <DatePickerTrigger placeholder="Select date" />
                    <DatePickerContent />
                </DatePicker>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Modal Date Picker</h2>
                <DatePicker variant="modal" value={selectedDate} onValueChange={setSelectedDate}>
                    <ModalDatePickerTrigger placeholder="Select date" />
                    <ModalDatePickerContent title="Choose date" />
                </DatePicker>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Time Picker Dial</h2>
                <TimePicker variant="dial" value={selectedTime} onValueChange={setSelectedTime}>
                    <TimePickerTrigger placeholder="Select time" />
                    <TimePickerDial title="Select time" />
                </TimePicker>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Time Picker Input</h2>
                <TimePicker variant="input" value={selectedTime} onValueChange={setSelectedTime}>
                    <TimePickerTrigger placeholder="Enter time" />
                    <TimePickerInputMode title="Enter time" />
                </TimePicker>
            </div>

            {selectedDate && (
                <div className="p-4 bg-surface-container rounded-lg">
                    <h3 className="font-medium">Selected Date:</h3>
                    <p>{selectedDate.toDateString()}</p>
                </div>
            )}

            {selectedTime && (
                <div className="p-4 bg-surface-container rounded-lg">
                    <h3 className="font-medium">Selected Time:</h3>
                    <p>{selectedTime}</p>
                </div>
            )}
        </div>
    );
};
