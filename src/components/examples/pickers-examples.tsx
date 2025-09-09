"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/md3/card";
import { Button } from "@/components/md3/button";
import { Badge } from "@/components/md3/badge";
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
import { Input } from "@/components/md3/input";
import { Label } from "@/components/ui/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faClock, faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";

export const PickersExamples: React.FC = () => {
    // Example 1: Event Scheduling Form
    const EventSchedulingExample = () => {
        const [eventDate, setEventDate] = useState<Date>();
        const [startTime, setStartTime] = useState("");
        const [endTime, setEndTime] = useState("");
        const [eventTitle, setEventTitle] = useState("");

        const handleSave = () => {
            if (eventDate && startTime && endTime && eventTitle) {
                alert(`Event "${eventTitle}" scheduled for ${eventDate.toDateString()} from ${startTime} to ${endTime}`);
            }
        };

        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faCalendar} className="w-5 h-5 text-primary" />
                        Schedule Event
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="event-title">Event Title</Label>
                        <Input
                            id="event-title"
                            variant="outlined"
                            placeholder="Enter event title"
                            value={eventTitle}
                            onChange={(e) => setEventTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Event Date</Label>
                        <DatePicker variant="docked" value={eventDate} onValueChange={setEventDate}>
                            <DatePickerTrigger placeholder="Select event date" variant="outlined" />
                            <DatePickerContent showTodayButton showClearButton />
                        </DatePicker>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Time</Label>
                            <TimePicker variant="dial" value={startTime} onValueChange={setStartTime}>
                                <TimePickerTrigger placeholder="Start time" variant="outlined" />
                                <TimePickerDial title="Start Time" />
                            </TimePicker>
                        </div>

                        <div className="space-y-2">
                            <Label>End Time</Label>
                            <TimePicker variant="dial" value={endTime} onValueChange={setEndTime}>
                                <TimePickerTrigger placeholder="End time" variant="outlined" />
                                <TimePickerDial title="End Time" />
                            </TimePicker>
                        </div>
                    </div>

                    <Button
                        className="w-full"
                        disabled={!eventDate || !startTime || !endTime || !eventTitle}
                        onClick={handleSave}
                    >
                        <FontAwesomeIcon icon={faCheck} className="w-4 h-4 mr-2" />
                        Schedule Event
                    </Button>
                </CardContent>
            </Card>
        );
    };

    // Example 2: Appointment Booking System
    const AppointmentBookingExample = () => {
        const [selectedDate, setSelectedDate] = useState<Date>();
        const [selectedTime, setSelectedTime] = useState("");
        const [appointmentType, setAppointmentType] = useState("consultation");

        const availableTimes = [
            "09:00 AM", "10:00 AM", "11:00 AM",
            "02:00 PM", "03:00 PM", "04:00 PM"
        ];

        return (
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-primary" />
                        Book Appointment
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Appointment Type</Label>
                        <select
                            className="w-full p-3 border border-outline rounded-lg bg-transparent"
                            value={appointmentType}
                            onChange={(e) => setAppointmentType(e.target.value)}
                        >
                            <option value="consultation">Consultation</option>
                            <option value="followup">Follow-up</option>
                            <option value="checkup">Check-up</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <Label>Select Date</Label>
                        <DatePicker variant="modal" value={selectedDate} onValueChange={setSelectedDate}>
                            <ModalDatePickerTrigger placeholder="Choose appointment date" variant="filled" />
                            <ModalDatePickerContent
                                title="Select Appointment Date"
                                description="Choose your preferred appointment date"
                            />
                        </DatePicker>
                    </div>

                    {selectedDate && (
                        <div className="space-y-3">
                            <Label>Available Times for {selectedDate.toDateString()}</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {availableTimes.map((time) => (
                                    <Button
                                        key={time}
                                        variant={selectedTime === time ? "filled" : "outlined"}
                                        size="sm"
                                        onClick={() => setSelectedTime(time)}
                                        className="text-sm"
                                    >
                                        {time}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {selectedDate && selectedTime && (
                        <div className="p-4 bg-primary-container/10 rounded-lg border border-primary-container">
                            <h4 className="font-medium text-on-surface mb-2">Appointment Summary</h4>
                            <div className="space-y-1 text-sm text-on-surface-variant">
                                <p><strong>Type:</strong> {appointmentType}</p>
                                <p><strong>Date:</strong> {selectedDate.toDateString()}</p>
                                <p><strong>Time:</strong> {selectedTime}</p>
                            </div>
                            <Button className="w-full mt-4">
                                Confirm Appointment
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    // Example 3: Task Management with Deadlines
    const TaskManagerExample = () => {
        const [tasks, setTasks] = useState([
            { id: 1, title: "Project Review", deadline: new Date("2024-01-15"), time: "2:00 PM", completed: false },
            { id: 2, title: "Client Meeting", deadline: new Date("2024-01-18"), time: "10:30 AM", completed: false }
        ]);
        const [newTaskTitle, setNewTaskTitle] = useState("");
        const [newTaskDeadline, setNewTaskDeadline] = useState<Date>();
        const [newTaskTime, setNewTaskTime] = useState("");

        const addTask = () => {
            if (newTaskTitle && newTaskDeadline && newTaskTime) {
                const newTask = {
                    id: Date.now(),
                    title: newTaskTitle,
                    deadline: newTaskDeadline,
                    time: newTaskTime,
                    completed: false
                };
                setTasks([...tasks, newTask]);
                setNewTaskTitle("");
                setNewTaskDeadline(undefined);
                setNewTaskTime("");
            }
        };

        const toggleTask = (id: number) => {
            setTasks(tasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            ));
        };

        return (
            <Card className="w-full max-w-xl">
                <CardHeader>
                    <CardTitle>Task Manager with Deadlines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Add new task */}
                    <div className="space-y-4 p-4 bg-surface-variant/20 rounded-lg">
                        <Input
                            variant="outlined"
                            placeholder="Task title"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <DatePicker variant="docked" value={newTaskDeadline} onValueChange={setNewTaskDeadline}>
                                <DatePickerTrigger placeholder="Deadline" variant="outlined" />
                                <DatePickerContent />
                            </DatePicker>

                            <TimePicker variant="input" format24={false} value={newTaskTime} onValueChange={setNewTaskTime}>
                                <TimePickerTrigger placeholder="Time" variant="outlined" />
                                <TimePickerInputMode title="Set Time" />
                            </TimePicker>
                        </div>

                        <Button onClick={addTask} className="w-full">
                            <FontAwesomeIcon icon={faPlus} className="w-4 h-4 mr-2" />
                            Add Task
                        </Button>
                    </div>

                    {/* Task list */}
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`p-4 border rounded-lg transition-colors ${task.completed
                                    ? 'bg-surface-variant/30 border-outline-variant'
                                    : 'bg-surface border-outline hover:bg-surface-variant/10'
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => toggleTask(task.id)}
                                            className="w-4 h-4 text-primary"
                                        />
                                        <div className="flex-1">
                                            <h4 className={`font-medium ${task.completed ? 'line-through text-on-surface-variant' : 'text-on-surface'}`}>
                                                {task.title}
                                            </h4>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-on-surface-variant">
                                                <span className="flex items-center gap-1">
                                                    <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                                                    {task.deadline.toDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                                                    {task.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Badge
                                        variant={task.completed ? "secondary" : (task.deadline < new Date() ? "destructive" : "default")}
                                    >
                                        {task.completed ? "Done" : (task.deadline < new Date() ? "Overdue" : "Pending")}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    };

    // Example 4: Meeting Scheduler with Time Zones
    const MeetingSchedulerExample = () => {
        const [meetingDate, setMeetingDate] = useState<Date>();
        const [meetingTime, setMeetingTime] = useState("");
        const [duration, setDuration] = useState("60");
        const [timeFormat, setTimeFormat] = useState<boolean>(false); // false = 12h, true = 24h

        return (
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>International Meeting Scheduler</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Meeting Date</Label>
                        <DatePicker variant="modal" value={meetingDate} onValueChange={setMeetingDate}>
                            <ModalDatePickerTrigger placeholder="Select meeting date" variant="filled" />
                            <ModalDatePickerContent title="Meeting Date" />
                        </DatePicker>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Time</Label>
                            <TimePicker
                                variant="dial"
                                format24={timeFormat}
                                value={meetingTime}
                                onValueChange={setMeetingTime}
                            >
                                <TimePickerTrigger placeholder="Meeting time" variant="outlined" />
                                <TimePickerDial title={`Meeting Time (${timeFormat ? '24h' : '12h'})`} />
                            </TimePicker>
                        </div>

                        <div className="space-y-2">
                            <Label>Duration</Label>
                            <select
                                className="w-full p-3 border border-outline rounded-lg bg-transparent"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="90">1.5 hours</option>
                                <option value="120">2 hours</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Time Format</Label>
                        <div className="flex gap-4">
                            <Button
                                variant={!timeFormat ? "filled" : "outlined"}
                                size="sm"
                                onClick={() => setTimeFormat(false)}
                            >
                                12 Hour
                            </Button>
                            <Button
                                variant={timeFormat ? "filled" : "outlined"}
                                size="sm"
                                onClick={() => setTimeFormat(true)}
                            >
                                24 Hour
                            </Button>
                        </div>
                    </div>

                    {meetingDate && meetingTime && (
                        <div className="p-4 bg-secondary-container/20 rounded-lg border border-secondary-container">
                            <h4 className="font-medium text-on-surface mb-3">Meeting Details</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Date:</span>
                                    <span className="text-on-surface">{meetingDate.toDateString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Time:</span>
                                    <span className="text-on-surface">{meetingTime}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Duration:</span>
                                    <span className="text-on-surface">{duration} minutes</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-on-surface-variant">Format:</span>
                                    <span className="text-on-surface">{timeFormat ? "24 Hour" : "12 Hour"}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    // Example 5: Reminder System  
    const ReminderSystemExample = () => {
        const [reminderDate, setReminderDate] = useState<Date>();
        const [reminderTime, setReminderTime] = useState("");
        const [reminderText, setReminderText] = useState("");
        const [reminders, setReminders] = useState([
            { id: 1, text: "Call doctor", date: new Date("2024-01-16"), time: "9:00 AM" },
            { id: 2, text: "Buy groceries", date: new Date("2024-01-17"), time: "6:00 PM" }
        ]);

        const addReminder = () => {
            if (reminderDate && reminderTime && reminderText) {
                const newReminder = {
                    id: Date.now(),
                    text: reminderText,
                    date: reminderDate,
                    time: reminderTime
                };
                setReminders([...reminders, newReminder]);
                setReminderDate(undefined);
                setReminderTime("");
                setReminderText("");
            }
        };

        return (
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Personal Reminders</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Add reminder form */}
                    <div className="space-y-4">
                        <Input
                            variant="outlined"
                            placeholder="What do you want to remember?"
                            value={reminderText}
                            onChange={(e) => setReminderText(e.target.value)}
                        />

                        <DatePicker variant="docked" value={reminderDate} onValueChange={setReminderDate}>
                            <DatePickerTrigger placeholder="Reminder date" variant="outlined" />
                            <DatePickerContent showTodayButton />
                        </DatePicker>

                        <TimePicker variant="input" value={reminderTime} onValueChange={setReminderTime}>
                            <TimePickerTrigger placeholder="Reminder time" variant="outlined" />
                            <TimePickerInputMode title="Set Reminder Time" />
                        </TimePicker>

                        <Button
                            className="w-full"
                            onClick={addReminder}
                            disabled={!reminderDate || !reminderTime || !reminderText}
                        >
                            Add Reminder
                        </Button>
                    </div>

                    {/* Reminders list */}
                    <div className="space-y-3">
                        <Label>Upcoming Reminders</Label>
                        {reminders.map((reminder) => (
                            <div
                                key={reminder.id}
                                className="p-3 bg-tertiary-container/10 border border-tertiary-container rounded-lg"
                            >
                                <p className="text-on-surface font-medium">{reminder.text}</p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-on-surface-variant">
                                    <span className="flex items-center gap-1">
                                        <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
                                        {reminder.date.toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                                        {reminder.time}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-on-surface">
                    Material Design 3 Pickers Examples
                </h1>
                <p className="text-lg text-on-surface-variant max-w-3xl mx-auto">
                    Comprehensive examples showcasing Date Picker and Time Picker components following
                    Material Design 3 specifications with various use cases and configurations.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-on-surface">Event Scheduling</h2>
                    <EventSchedulingExample />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-on-surface">Appointment Booking</h2>
                    <AppointmentBookingExample />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-on-surface">Task Management</h2>
                    <TaskManagerExample />
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-on-surface">Meeting Scheduler</h2>
                    <MeetingSchedulerExample />
                </div>

                <div className="col-span-1 lg:col-span-2 flex justify-center">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-on-surface">Reminder System</h2>
                        <ReminderSystemExample />
                    </div>
                </div>
            </div>
        </div>
    );
};
