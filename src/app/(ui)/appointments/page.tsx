"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  Card,
  CardContent,
  CardActionArea,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
// import QRCode from 'qrcode.react';

// Import required icons
import GrassIcon from "@mui/icons-material/Grass";
import ScienceIcon from "@mui/icons-material/Science";
import AssessmentIcon from "@mui/icons-material/Assessment";
import NatureIcon from "@mui/icons-material/Nature";

// Step labels
const steps = [
  "Select Department",
  "Choose Service",
  "Select Date & Time",
  "Confirmation",
];

// Department data
const departments = [
  {
    id: 1,
    name: "Internal Audit Division",
    icon: <AssessmentIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
  {
    id: 2,
    name: "Seed and Planting Material Development Centre (SPMDC)",
    icon: <NatureIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
  {
    id: 3,
    name: "Crop Development Department",
    icon: <GrassIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
  {
    id: 4,
    name: "Fertilizer Management Department",
    icon: <ScienceIcon sx={{ fontSize: 40, color: "#4CAF50" }} />,
  },
];

// Service schema validation
const serviceSchema = yup.object({
  service: yup.string().required("Please select a service"),
});

// Time slot validation
const timeSlotSchema = yup.object({
  timeSlot: yup.string().required("Please select a time slot"),
});

export default function AppointmentBooking() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState<number | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [bookingReference, setBookingReference] = useState<string>("");

  // Map department to a demo officerId (replace with real mapping in production)
  const departmentOfficerMap: Record<number, string> = {
    1: "64f1a1b2c3d4e5f678901234", // Internal Audit Division
    2: "64f1a1b2c3d4e5f678901235", // SPMDC
    3: "64f1a1b2c3d4e5f678901236", // Crop Development
    4: "64f1a1b2c3d4e5f678901237", // Fertilizer Management
  };

  const [bookingError, setBookingError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Available services based on department (in a real app, fetch this based on selected department)
  const getAvailableServices = () => {
    if (selectedDepartment === 1) {
      // Internal Audit Division
      return [
        { id: 1, name: "Paid Document Section Appointment" },
        { id: 2, name: "Revenue Report Section Appointment" },
        { id: 3, name: "Running Chart Section Appointment" },
        { id: 4, name: "Internal Audit Consultation" },
        { id: 5, name: "Financial Document Review" },
      ];
    } else if (selectedDepartment === 2) {
      // Seed and Planting Material Development Centre (SPMDC)
      return [
        { id: 1, name: "Government Seed Sales Center Visit" },
        { id: 2, name: "Planting Material Purchase" },
        { id: 3, name: "Seed Quality Testing" },
        { id: 4, name: "Agricultural Material Consultation" },
        { id: 5, name: "Seed Potato Store Visit" },
        { id: 6, name: "Bean Seeds Center Appointment" },
        { id: 7, name: "Vegetable Seeds Center Visit" },
      ];
    } else if (selectedDepartment === 3) {
      // Crop Development Department
      return [
        { id: 1, name: "Rice Crop Submission" },
        { id: 2, name: "Vegetable Crop Submission" },
        { id: 3, name: "Fruit Crop Submission" },
        { id: 4, name: "Spice Crop Submission" },
        { id: 5, name: "Tea Crop Submission" },
        { id: 6, name: "Coconut Crop Submission" },
        { id: 7, name: "Rubber Crop Submission" },
        { id: 8, name: "Sugarcane Crop Submission" },
      ];
    } else if (selectedDepartment === 4) {
      // Fertilizer Management Department
      return [
        { id: 1, name: "Organic Fertilizer Request" },
        { id: 2, name: "Chemical Fertilizer Request" },
        { id: 3, name: "NPK Fertilizer Request" },
        { id: 4, name: "Urea Fertilizer Request" },
        { id: 5, name: "Phosphate Fertilizer Request" },
        { id: 6, name: "Potash Fertilizer Request" },
        { id: 7, name: "Micronutrient Fertilizer Request" },
        { id: 8, name: "Liquid Fertilizer Request" },
        { id: 9, name: "Soil Testing & Fertilizer Recommendation" },
      ];
    } else {
      return [];
    }
  };

  // Available time slots (in a real app, fetch this based on selected date and service)
  const availableTimeSlots = [
    "9:00 AM",
    "9:30 AM",
    "10:00 AM",
    "10:30 AM",
    "11:00 AM",
    "11:30 AM",
    "1:00 PM",
    "1:30 PM",
    "2:00 PM",
    "2:30 PM",
    "3:00 PM",
    "3:30 PM",
  ];

  // Form setup for service selection
  const serviceForm = useForm({
    resolver: yupResolver(serviceSchema),
  });

  // Form setup for time slot selection
  const timeSlotForm = useForm({
    resolver: yupResolver(timeSlotSchema),
  });

  const handleNext = () => {
    if (activeStep === 1) {
      serviceForm.handleSubmit(onServiceSubmit)();
    } else if (activeStep === 2) {
      timeSlotForm.handleSubmit(onTimeSlotSubmit)();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDepartmentSelect = (departmentId: number) => {
    setSelectedDepartment(departmentId);
    setActiveStep(1);
  };

  const onServiceSubmit = (data: { service: string }) => {
    console.log("Service selected:", data);
    setActiveStep(2);
  };

  const onTimeSlotSubmit = async (data: { timeSlot: string }) => {
    if (!selectedDate || !selectedDepartment) return;

    setIsBooking(true);
    setBookingError(null);

    // Prepare API payload
    const officerId = departmentOfficerMap[selectedDepartment];
    const serviceId = serviceForm.getValues().service;
    const serviceObj = getAvailableServices().find((s) => s.id === Number(serviceId));
    const purpose = serviceObj?.name || "Appointment";
    const description = purpose;
    const location = getDepartmentName(selectedDepartment);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          officerId,
          appointmentDate: selectedDate.toISOString(),
          timeSlot: data.timeSlot,
          purpose,
          description,
          location,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setBookingError(result?.error || "Failed to book appointment");
        setIsBooking(false);
        return;
      }

      // Generate a reference number (or use result.appointment._id)
      const ref = result?.appointment?._id
        ? `BK-${result.appointment._id.slice(-6).toUpperCase()}`
        : `BK-${Math.floor(Math.random() * 1000000).toString().padStart(6, "0")}`;
      setBookingReference(ref);

      setActiveStep(3);
    } catch (err) {
      setBookingError("Failed to book appointment");
    } finally {
      setIsBooking(false);
    }
  };

  // Get department name from ID
  const getDepartmentName = (id: number | null) => {
    if (!id) return "";
    const dept = departments.find((d) => d.id === id);
    return dept ? dept.name : "";
  };

  // Different content based on active step
  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#333333", mb: 3, textAlign: "center" }}
            >
              Select Government Department
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#7E7E7E", mb: 4, textAlign: "center" }}
            >
              Choose the department where you need to book an appointment
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 3,
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              {departments.map((dept) => (
                <Card
                  key={dept.id}
                  sx={{
                    height: "160px",
                    cursor: "pointer",
                    borderColor:
                      selectedDepartment === dept.id ? "#4CAF50" : "#E0E0E0",
                    borderWidth: selectedDepartment === dept.id ? 3 : 1,
                    borderStyle: "solid",
                    backgroundColor:
                      selectedDepartment === dept.id ? "#F1F8E9" : "#FFFFFF",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      borderColor: "#4CAF50",
                      backgroundColor: "#F1F8E9",
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(76, 175, 80, 0.15)",
                    },
                  }}
                >
                  <CardActionArea
                    onClick={() => handleDepartmentSelect(dept.id)}
                    sx={{
                      height: "100%",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <CardContent sx={{ textAlign: "center", p: 1 }}>
                      <Box sx={{ mb: 1.5 }}>{dept.icon}</Box>
                      <Typography
                        variant="h6"
                        component="div"
                        sx={{
                          color: "#333333",
                          fontSize: "0.95rem",
                          lineHeight: 1.3,
                          fontWeight:
                            selectedDepartment === dept.id ? 600 : 500,
                        }}
                      >
                        {dept.name}
                      </Typography>
                      {selectedDepartment === dept.id && (
                        <Typography
                          variant="body2"
                          sx={{ color: "#4CAF50", mt: 1, fontWeight: 600 }}
                        >
                          ✓ Selected
                        </Typography>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box
            component="form"
            onSubmit={serviceForm.handleSubmit(onServiceSubmit)}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#333333", textAlign: "center", mb: 2 }}
            >
              Choose Your Service
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#7E7E7E", textAlign: "center", mb: 4 }}
            >
              Services available at {getDepartmentName(selectedDepartment)}
            </Typography>

            <Box sx={{ maxWidth: "500px", mx: "auto" }}>
              <Controller
                name="service"
                control={serviceForm.control}
                defaultValue=""
                render={({ field, fieldState }) => (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel
                      id="service-select-label"
                      sx={{
                        color: "#7E7E7E",
                        "&.Mui-focused": { color: "#4CAF50" },
                      }}
                    >
                      Select Service
                    </InputLabel>
                    <Select
                      {...field}
                      labelId="service-select-label"
                      label="Select Service"
                      sx={{
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#4CAF50",
                        },
                      }}
                    >
                      {getAvailableServices().map((service) => (
                        <MenuItem
                          key={service.id}
                          value={service.id}
                          sx={{
                            "&:hover": { backgroundColor: "#F1F8E9" },
                            "&.Mui-selected": { backgroundColor: "#E8F5E8" },
                          }}
                        >
                          {service.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {fieldState.error && (
                      <FormHelperText sx={{ color: "#E64A19" }}>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                )}
              />
            </Box>
          </Box>
        );

      case 2:
        return (
          <Box
            component="form"
            onSubmit={timeSlotForm.handleSubmit(onTimeSlotSubmit)}
          >
            <Typography
              variant="h5"
              gutterBottom
              sx={{ color: "#333333", textAlign: "center", mb: 2 }}
            >
              Select Date & Time
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#7E7E7E", textAlign: "center", mb: 4 }}
            >
              Choose your preferred appointment date and time slot
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
                gap: 6,
                maxWidth: "900px",
                mx: "auto",
              }}
            >
              {/* Calendar Section */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#333333", mb: 3 }}
                >
                  📅 Choose a Date
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    ".react-calendar": {
                      width: "100%",
                      maxWidth: "350px",
                      border: "2px solid #E8F5E8",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(76, 175, 80, 0.1)",
                      fontFamily: "inherit",
                      fontSize: "14px",
                      ".react-calendar__tile": {
                        borderRadius: "8px",
                        margin: "2px",
                        "&:hover": {
                          backgroundColor: "#F1F8E9",
                          color: "#333333",
                        },
                      },
                      ".react-calendar__tile--active": {
                        backgroundColor: "#4CAF50 !important",
                        color: "white !important",
                        fontWeight: 600,
                      },
                      ".react-calendar__tile--now": {
                        backgroundColor: "#E8F5E8",
                        color: "#333333",
                      },
                      ".react-calendar__navigation button": {
                        color: "#4CAF50",
                        fontSize: "16px",
                        fontWeight: 600,
                        "&:hover": {
                          backgroundColor: "#F1F8E9",
                        },
                      },
                    },
                  }}
                >
                  <Calendar
                    onChange={(value) => setSelectedDate(value as Date)}
                    value={selectedDate}
                    minDate={new Date()}
                    maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days in the future
                  />
                </Box>
              </Box>

              {/* Time Slot Section */}
              <Box sx={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#333333", mb: 3 }}
                >
                  🕐 Choose a Time
                </Typography>

                {selectedDate ? (
                  <Box>
                    <Paper
                      sx={{
                        p: 2,
                        mb: 3,
                        backgroundColor: "#F1F8E9",
                        border: "1px solid #A5D6A7",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ color: "#333333", fontWeight: 600 }}
                      >
                        Available times for{" "}
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </Typography>
                    </Paper>

                    <Controller
                      name="timeSlot"
                      control={timeSlotForm.control}
                      defaultValue=""
                      render={({ field, fieldState }) => (
                        <FormControl fullWidth error={!!fieldState.error}>
                          <InputLabel
                            id="time-slot-label"
                            sx={{
                              color: "#7E7E7E",
                              "&.Mui-focused": { color: "#4CAF50" },
                            }}
                          >
                            Select Time Slot
                          </InputLabel>
                          <Select
                            {...field}
                            labelId="time-slot-label"
                            label="Select Time Slot"
                            sx={{
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                {
                                  borderColor: "#4CAF50",
                                },
                            }}
                          >
                            {availableTimeSlots.map((slot) => (
                              <MenuItem
                                key={slot}
                                value={slot}
                                sx={{
                                  "&:hover": { backgroundColor: "#F1F8E9" },
                                  "&.Mui-selected": {
                                    backgroundColor: "#E8F5E8",
                                  },
                                }}
                              >
                                {slot}
                              </MenuItem>
                            ))}
                          </Select>
                          {fieldState.error && (
                            <FormHelperText sx={{ color: "#E64A19" }}>
                              {fieldState.error.message}
                            </FormHelperText>
                          )}
                        </FormControl>
                      )}
                    />
                  </Box>
                ) : (
                  <Paper
                    sx={{
                      p: 4,
                      backgroundColor: "#F9F9F6",
                      border: "1px dashed #C8E6C9",
                    }}
                  >
                    <Typography variant="body1" sx={{ color: "#7E7E7E" }}>
                      👈 Please select a date first to see available time slots
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: "center", maxWidth: "600px", mx: "auto" }}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#388E3C", fontWeight: 700 }}
              >
                🎉 Appointment Confirmed!
              </Typography>
              <Typography variant="h6" sx={{ color: "#7E7E7E" }}>
                Your booking has been successfully confirmed
              </Typography>
            </Box>

            <Paper
              elevation={3}
              sx={{
                p: 4,
                mb: 4,
                backgroundColor: "#F9F9F6",
                border: "2px solid #A5D6A7",
                borderRadius: 3,
              }}
            >
              {/* QR Code Section */}
              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#333333", fontWeight: 600 }}
                >
                  Booking Reference
                </Typography>
                <Box
                  sx={{
                    width: 180,
                    height: 180,
                    backgroundColor: "#FFFFFF",
                    border: "3px dashed #4CAF50",
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    mx: "auto",
                    mb: 2,
                    boxShadow: "0 4px 12px rgba(76, 175, 80, 0.1)",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: "#4CAF50", mb: 1, fontWeight: 700 }}
                  >
                    QR Code
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#333333", fontWeight: 600 }}
                  >
                    {bookingReference}
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ color: "#7E7E7E", fontStyle: "italic" }}
                >
                  Show this QR code at your appointment
                </Typography>
              </Box>

              {/* Appointment Details */}
              <Box sx={{ textAlign: "left" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ color: "#333333", textAlign: "center", mb: 3 }}
                >
                  📋 Appointment Details
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#7E7E7E", fontWeight: 600 }}
                  >
                    Department:
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333333" }}>
                    {getDepartmentName(selectedDepartment)}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ color: "#7E7E7E", fontWeight: 600 }}
                  >
                    Service:
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333333" }}>
                    {
                      getAvailableServices().find(
                        (s) => s.id === Number(serviceForm.getValues().service)
                      )?.name
                    }
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ color: "#7E7E7E", fontWeight: 600 }}
                  >
                    Date:
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333333" }}>
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{ color: "#7E7E7E", fontWeight: 600 }}
                  >
                    Time:
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333333" }}>
                    {timeSlotForm.getValues().timeSlot}
                  </Typography>
                </Box>

                <Paper
                  sx={{
                    p: 3,
                    backgroundColor: "#E8F5E8",
                    border: "1px solid #A5D6A7",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "#333333", fontWeight: 600, mb: 1 }}
                  >
                    📌 Important Reminders:
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#333333", mb: 1 }}>
                    • Arrive 15 minutes before your appointment time
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#333333", mb: 1 }}>
                    • Bring all required original documents
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#333333" }}>
                    • Present this QR code for quick check-in
                  </Typography>
                </Paper>
              </Box>
            </Paper>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                variant="contained"
                href="/dashboard"
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#F9F9F6",
                  "&:hover": { backgroundColor: "#388E3C" },
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                }}
              >
                Return to Dashboard
              </Button>
              <Button
                variant="outlined"
                onClick={() => window.print()}
                sx={{
                  borderColor: "#4CAF50",
                  color: "#4CAF50",
                  "&:hover": {
                    backgroundColor: "#F1F8E9",
                    borderColor: "#388E3C",
                  },
                  px: 4,
                  py: 1.5,
                }}
              >
                Print Details
              </Button>
            </Box>
          </Box>
        );

      default:
        return "Unknown step";
    }
  };

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", px: 2 }}>
      {/* Header Section */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "#333333", fontWeight: 700 }}
        >
          Book an Appointment
        </Typography>
        <Typography
          variant="h6"
          sx={{ color: "#7E7E7E", maxWidth: "600px", mx: "auto" }}
        >
          Schedule your government service appointment in just a few simple
          steps
        </Typography>
      </Box>

      {/* Progress Stepper */}
      <Paper
        elevation={1}
        sx={{ p: 3, mb: 4, backgroundColor: "#F9F9F6", borderRadius: 3 }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                sx={{
                  ".MuiStepLabel-label": {
                    color: "#7E7E7E",
                    fontWeight: 500,
                  },
                  ".MuiStepLabel-label.Mui-active": {
                    color: "#4CAF50",
                    fontWeight: 600,
                  },
                  ".MuiStepLabel-label.Mui-completed": {
                    color: "#388E3C",
                    fontWeight: 600,
                  },
                  ".MuiStepIcon-root": {
                    fontSize: "2rem",
                  },
                  ".MuiStepIcon-root.Mui-active": {
                    color: "#4CAF50",
                  },
                  ".MuiStepIcon-root.Mui-completed": {
                    color: "#388E3C",
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Main Content */}
      <Paper
        elevation={2}
        sx={{
          p: 4,
          mb: 4,
          backgroundColor: "#FFFFFF",
          borderRadius: 3,
          border: "1px solid #E8F5E8",
        }}
      >
        {getStepContent()}
      </Paper>

      {/* Navigation Buttons */}
      {activeStep !== 3 && (
        <Paper
          elevation={1}
          sx={{ p: 3, backgroundColor: "#F9F9F6", borderRadius: 3 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{
                color: "#7E7E7E",
                borderColor: "#7E7E7E",
                "&:hover": {
                  borderColor: "#4CAF50",
                  backgroundColor: "#F1F8E9",
                },
                px: 4,
                py: 1.5,
              }}
            >
              Back
            </Button>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" sx={{ color: "#7E7E7E" }}>
                Step {activeStep + 1} of {steps.length}
              </Typography>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === 0 && !selectedDepartment}
                sx={{
                  backgroundColor: "#4CAF50",
                  color: "#F9F9F6",
                  "&:hover": { backgroundColor: "#388E3C" },
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(76, 175, 80, 0.3)",
                }}
              >
                {activeStep === steps.length - 2
                  ? "Confirm Booking"
                  : "Next Step"}
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
