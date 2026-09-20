import React, { useState, useRef } from 'react';
import { HeroSection } from './components/HeroSection';
import { StepIndicator } from './components/StepIndicator';
import { ServicesStep } from './components/ServicesStep';
import { DateStep } from './components/DateStep';
import { TimeStep } from './components/TimeStep';
import { CustomerStep } from './components/CustomerStep';
import { SummaryStep } from './components/SummaryStep';
import { SuccessStep } from './components/SuccessStep';
import { Footer } from './components/Footer';
import { ServiceItem, CustomerData } from './types';
import { getInitialAvailableBookingDate } from './services/barbershopData';
import { bookAppointmentAtomic } from './services/bookingService';
import { openWhatsAppDirectly } from './services/whatsappService';

export default function App() {
  // Step state: 1: Service, 2: Date, 3: Time, 4: Customer, 5: Summary, 6: Success
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(getInitialAvailableBookingDate());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [customerData, setCustomerData] = useState<CustomerData>({ name: '', phone: '' });

  // Booking process states
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [conflictError, setConflictError] = useState<string | null>(null);
  const [confirmedAppointmentId, setConfirmedAppointmentId] = useState<string>('');

  const bookingSectionRef = useRef<HTMLDivElement>(null);

  const scrollToBooking = () => {
    bookingSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStepChange = (targetStep: number) => {
    // Only allow jumping backwards to previous steps
    if (targetStep < currentStep) {
      setConflictError(null);
      setCurrentStep(targetStep);
      scrollToBooking();
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !customerData.name || !customerData.phone) {
      return;
    }

    setIsSubmitting(true);
    setConflictError(null);

    // EXACT REQUIRED SEQUENCE:
    // 1. Check availability again & atomic reservation in Firestore
    const result = await bookAppointmentAtomic({
      customerName: customerData.name,
      customerPhone: customerData.phone,
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      price: selectedService.price,
      date: selectedDate,
      time: selectedTime
    });

    setIsSubmitting(false);

    if (!result.success) {
      // If slot was taken by someone else in the same split second:
      if (result.error === 'SLOT_ALREADY_TAKEN') {
        setConflictError(result.message || 'Esse horário acabou de ser reservado 😕');
      } else {
        alert(result.message || 'Ocorreu um erro ao gravar o agendamento. Tente novamente.');
      }
      return;
    }

    // SUCCESS CONFIRMED BY FIREBASE:
    setConfirmedAppointmentId(result.appointmentId || 'CONFIRMADO');
    setCurrentStep(6); // Success view
    scrollToBooking();

    // Automatically open WhatsApp with pre-filled message (Requirement 15 & 16)
    // Only opened AFTER Firebase confirms creation
    setTimeout(() => {
      openWhatsAppDirectly({
        customerName: customerData.name,
        serviceName: selectedService.name,
        date: selectedDate,
        time: selectedTime,
        price: selectedService.price
      });
    }, 500);
  };

  const handleReset = () => {
    setSelectedService(null);
    setSelectedTime('');
    setConflictError(null);
    setCustomerData({ name: '', phone: '' });
    setCurrentStep(1);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden">
      {/* Background cinematic mesh glows */}
      <div className="fixed inset-0 pointer-events-none -z-20 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,102,255,0.18),rgba(255,255,255,0))]" />
      <div className="fixed -bottom-40 -left-40 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none -z-20" />
      <div className="fixed -top-40 -right-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-20" />

      {/* Hero with transparent logo & quick start */}
      <HeroSection onStartBooking={scrollToBooking} />

      {/* Main Booking Container */}
      <main ref={bookingSectionRef} className="w-full max-w-2xl mx-auto px-4 flex-1">
        {/* Step progress bar (shown during steps 1 to 5) */}
        {currentStep <= 5 && (
          <StepIndicator
            currentStep={currentStep}
            onStepClick={handleStepChange}
          />
        )}

        {/* Step 1: Services */}
        {currentStep === 1 && (
          <ServicesStep
            selectedService={selectedService}
            onSelectService={(service) => {
              setSelectedService(service);
            }}
            onContinue={() => {
              if (selectedService) {
                setCurrentStep(2);
                scrollToBooking();
              }
            }}
          />
        )}

        {/* Step 2: Date */}
        {currentStep === 2 && (
          <DateStep
            selectedDate={selectedDate}
            onSelectDate={(date) => setSelectedDate(date)}
            onContinue={() => {
              if (selectedDate) {
                setCurrentStep(3);
                scrollToBooking();
              }
            }}
            onBack={() => {
              setCurrentStep(1);
              scrollToBooking();
            }}
          />
        )}

        {/* Step 3: Time (Real-time Firestore sync & collision block) */}
        {currentStep === 3 && (
          <TimeStep
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onSelectTime={(time) => setSelectedTime(time)}
            onContinue={() => {
              if (selectedTime) {
                setCurrentStep(4);
                scrollToBooking();
              }
            }}
            onBack={() => {
              setCurrentStep(2);
              scrollToBooking();
            }}
          />
        )}

        {/* Step 4: Customer Details (Phone mask & Brazilian format) */}
        {currentStep === 4 && (
          <CustomerStep
            customerData={customerData}
            onChangeCustomerData={setCustomerData}
            onContinue={() => {
              setCurrentStep(5);
              scrollToBooking();
            }}
            onBack={() => {
              setCurrentStep(3);
              scrollToBooking();
            }}
          />
        )}

        {/* Step 5: Summary & Atomic Booking Confirmation */}
        {currentStep === 5 && selectedService && (
          <SummaryStep
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            customer={customerData}
            isSubmitting={isSubmitting}
            conflictError={conflictError}
            onConfirmBooking={handleConfirmBooking}
            onBack={() => {
              setCurrentStep(4);
              scrollToBooking();
            }}
            onPickAnotherTime={() => {
              setSelectedTime('');
              setConflictError(null);
              setCurrentStep(3);
              scrollToBooking();
            }}
          />
        )}

        {/* Step 6: Confirmation & Success Celebration */}
        {currentStep === 6 && selectedService && (
          <SuccessStep
            service={selectedService}
            date={selectedDate}
            time={selectedTime}
            customer={customerData}
            appointmentId={confirmedAppointmentId}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Minimalist Premium Footer */}
      <Footer />
    </div>
  );
}
