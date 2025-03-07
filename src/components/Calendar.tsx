
import {supabase} from './../utils/supabase';

import { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Payment from './Payment';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import Notes from './Notes';
// import AlarmDialog from './AlarmDialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarPicker } from '@/components/ui/calendar';



export type NoteData = {
  [date: string]: string[];
};

export type AlarmData = {
  [date: string]: {
    time: string;
    note: string;
  }[];
};

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<NoteData>({});
  const [alarms, setAlarms] = useState<AlarmData>({});
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const [showPopup, setShowPopup] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [verificationResult, setVerificationResult] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [showEffect, setShowEffect] = useState(true); // Control useEffect execution


  useEffect(() => {
    const checkVerificationStatus = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Error fetching user:", userError);
        return;
      }

      const userId = user.user.id;

      const { data, error } = await supabase
        .from("notes") // Change to your actual table
        .select("isverified")
        .eq("user_id", userId)
        .limit(1)
        .single();

      // if (error) {
      //   console.error("Error fetching verification status:", error);
      //   return;
      // }

      /*  if (error) {
          console.log("Full error details:", error);
          console.error("Error fetching verification status:", error);
          return;
        }
        */

      if (data?.isverified) {
        setShowEffect(false); // Prevents the popup from showing
      }
    };

    checkVerificationStatus();
  }, []); // Runs only on mount

  useEffect(() => {
    if (showEffect) {
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 2000); // Show popup after 2 seconds

      return () => clearTimeout(timer); // Cleanup timeout on unmount
    }
  }, [showEffect]);


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowPopup(true);
  //   }, 2000); // 2 seconds delay

  //   return () => clearTimeout(timer); // Cleanup on unmount
  // }, []);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // const verifyImage = () => {
  //   if (!image) return;

  //   Tesseract.recognize(
  //     URL.createObjectURL(image),
  //     'eng'
  //   ).then(({ data: { text } }) => {
  //     if (text.includes('uday')) {
  //       setVerificationResult('✅ Payment Verified');
  //       setIsDisabled(false);
        
  //     } else {
  //       setVerificationResult('❌ Verification Failed');
  //       setIsDisabled(true);
  //     }
  //   });
  // };
  const verifyImage = async () => {
    if (!image) return;
  
    const { data } = await Tesseract.recognize(
      URL.createObjectURL(image),
      'eng'
    );
  
    const text = data.text;
  
    if (text.includes('uday')) {
      setVerificationResult('✅ Payment Verified');
      setIsDisabled(false);
  
      // Ensure `userId` is defined before using it
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Error fetching user:", userError);
        return;
      }
      const userId = user.user.id;
      console.log(userId);
      const {error}  = await supabase
      .from('notes') // Ensure the table is correctly named
      .update({ isverified: true })
      .eq('user_id', userId);

    if (error) {
      console.log("alreasy true updating verification:", error);
    }

  
  
    } else {
      setVerificationResult('❌ Verification Failed');
      setIsDisabled(true);
    }
  };
  
  const previousMonth = () => {
    setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(date => new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleGoToDate = (date: Date | undefined) => {
    if (date) {
      setCurrentDate(date);
    }
  };

  const hasNote = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return notes[dateStr]?.length > 0;
  };

  const hasAlarm = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return alarms[dateStr]?.length > 0;
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl space-y-6">
      <Card className="p-6 shadow-sm">
        <div className="dpDate flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={previousMonth}
            className="hover:bg-secondary"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-medium">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            {/* <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="center">
                <CalendarPicker
                  mode="single"
                  selected={currentDate}
                  onSelect={handleGoToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover> */}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextMonth}
            className="hover:bg-secondary"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="calendar-grid mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="day-cell">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map(day => (
            <button
              key={day.toString()}
              onClick={() => handleDateSelect(day)}
              className={`day-cell ${isToday(day) ? 'today' : ''
                } ${selectedDate && isSameDay(day, selectedDate) ? 'selected' : ''} 
              ${hasNote(day) ? 'has-note' : ''} 
              ${hasAlarm(day) ? 'has-alarm' : ''}`}
            >
              {format(day, 'd')}
            </button>

            // <button
            //   key={day.toString()}
            //   onClick={() => handleDateSelect(day)}
            //   className={`day-cell ${
            //     isToday(day) ? 'font-bold' : ''
            //   } ${
            //     selectedDate && isSameDay(day, selectedDate) ? 'selected' : ''
            //   } ${hasNote(day) ? 'has-note' : ''} ${
            //     hasAlarm(day) ? 'has-alarm' : ''
            //   }`}
            // >
            //   {format(day, 'd')}
            // </button>
          ))}
        </div>
      </Card>
      {/* {showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <Payment/>  
      <button onClick={() => setShowPopup(false)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Close
      </button>
    </div>
  </div>
)} */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Payment />
            <input type="file" onChange={handleImageUpload} className="my-2" />
            <button onClick={verifyImage} className="px-4 py-2 bg-blue-500 text-white rounded">Verify Image</button>
            <p className="mt-2 font-semibold">{verificationResult}</p>
            <button
              className={isDisabled ? "close-button disabled" : "close-button enabled"}
              onClick={() => setShowPopup(false)}
              disabled={isDisabled}>
              Close
            </button>

          </div>
        </div>
      )}

      {selectedDate && (
        <div className="slide-up">
          <Notes
            date={selectedDate}
            notes={notes}
            setNotes={setNotes}
          />
          {/* <AlarmDialog
            date={selectedDate}
            alarms={alarms}
            setAlarms={setAlarms}
          /> */}
        </div>
      )}
    </div>
  );
};

export default Calendar;
