

// import { useState, useEffect, useCallback } from "react";
// import { format } from 'date-fns';
// import { Card } from '@/components/ui/card';
// import { Textarea } from '@/components/ui/textarea';
// import { Button } from '@/components/ui/button';  // ✅ Added Save Button
// import { createClient } from '@supabase/supabase-js';

// // Supabase Setup
// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );



// interface NotesProps {
//   date: Date;
//   notes: { [date: string]: string[] };  // ✅ Accept notes object
//   setNotes: React.Dispatch<React.SetStateAction<{ [date: string]: string[] }>>; // ✅ Accept setter function
// }


// const Notes = ({ date }: NotesProps) => {

//   const [allNotes, setAllNotes] = useState('');

  
//   const dateStr = format(date, 'yyyy-MM-dd');  // ✅ Use the date prop

//   // const dateStr = format(date, 'yyyy-MM-dd');
//   const [note, setNote] = useState('');
//   const [secondnote, setsecondNote] = useState('');
//   const [thirdnote, setthirdNote] = useState('');
//   const [fourthnote, setfourthNote] = useState('');
  
//   const [userId, setUserId] = useState<string | null>(null); // ✅ Store User ID
//   const [loading, setLoading] = useState(false);

//   const fetchUserAndNote = useCallback(async () => {
//     try {
//       const { data: { session } } = await supabase.auth.getSession();
//       const user = session?.user;
  
//       if (!user) {
//         console.error("🚨 User not authenticated");
//         return;
//       }
  
//       setUserId(user.id);
  
//       console.log("🟢 Fetching notes for user:", user.id, "on date:", dateStr);
  
//       const { data, error } = await supabase
//         .from("notes")
//         .select("*")
//         .eq("user_id", user.id)
//         .eq("date", dateStr);
  
//       console.log("🟢 Raw Supabase Response:", data, error);
  
//       if (error) {
//         console.error("🚨 Error fetching notes:", error);
//       } else {
//         console.log("✅ Notes fetched:", data);
//         if (data.length > 0) {
//           // Extracting notes from multiple rows
//           const notesArray = data.map((row) => row.content);
          
//           // ✅ Batch update state
//           setNote(notesArray[0] || "");
//           setsecondNote(notesArray[1] || "");
//           setthirdNote(notesArray[2] || "");
//           setfourthNote(notesArray[3] || "");
//           setAllNotes(notesArray.join("$")); // ✅ Join all into one state
//         }
//       }
//     } catch (err) {
//       console.error("❌ Unexpected error:", err);
//     }
//   }, [dateStr]);
  
//   // ✅ Only calls fetch when date changes
//   useEffect(() => {
//     const fetchData = async () => {
//       // ✅ Reset state before fetching new notes
//       setNote('');
//       setsecondNote('');
//       setthirdNote('');
//       setfourthNote('');
//       setAllNotes('');
  
//       await fetchUserAndNote(); // ✅ Ensure data is fetched after resetting state
//     };
  
//     fetchData();
//   }, [dateStr]);  // ✅ Only depend on `dateStr`
  
//   // ✅ Update `allNotes` whenever any note changes
//   useEffect(() => {
//     setAllNotes([note, secondnote, thirdnote, fourthnote].join("\n"));
//   }, [note, secondnote, thirdnote, fourthnote]);
  

//   const handleSaveNote = async () => {
//     if (!userId) {
//       console.error("🚨 User ID not found, cannot save note.");
//       return;
//     }
  
//     setLoading(true);  // Show loading state while saving
  
//     console.log(`📡 Saving note for User ID: ${userId} on Date: ${dateStr}`);
//     const { data, error } = await supabase
//       .from('notes')
//       .upsert([{ 
//         user_id: userId, 
//         date: dateStr, 
//         content: allNotes
//       }]);
  
//     setLoading(false);
  
//     if (error) {
//       console.error("🚨 Error saving note:", error.message, error.details);
//     } else {
//       console.log("✅ Note successfully saved to Supabase", data);
  
//       // ✅ Re-fetch updated note from Supabase
//       fetchUserAndNote();
//     }
//   };
  
//   return (
//     <Card className="p-6 shadow-sm">
//       {/* <h3 className="text-lg font-medium mb-4">
//         Notes for {format(date, 'MMMM d, yyyy')}
//       </h3> */}

// <h3 className={`text-lg font-medium mb-4 ${dateStr === format(new Date(), 'yyyy-MM-dd') ? 'today-heading' : ''}`}>
//   Notes for {format(date, 'MMMM d, yyyy')}
// </h3>


//       <Textarea
//         placeholder="Write your note here..."
//         value={note}
//         onChange={(e) => setNote(e.target.value)} // ✅ Only updates state, no auto-save
//         className="w-full h-32 resize-none bg-transparent border-none focus:ring-0"
//       />
//       <Textarea
//         placeholder="Write your note here..."
//         value={secondnote}
//         onChange={(e) => setsecondNote(e.target.value)} // ✅ Only updates state, no auto-save
//         className="w-full h-32 resize-none bg-transparent border-none focus:ring-0"
//       />
//       <Textarea
//         placeholder="Write your note here..."
//         value={thirdnote}
//         onChange={(e) => setthirdNote(e.target.value)} // ✅ Only updates state, no auto-save
//         className="w-full h-32 resize-none bg-transparent border-none focus:ring-0"
//       />
//       <Textarea
//         placeholder="Write your note here..."
//         value={fourthnote}
//         onChange={(e) => setfourthNote(e.target.value)} // ✅ Only updates state, no auto-save
//         className="w-full h-32 resize-none bg-transparent border-none focus:ring-0"
//       />
      
//       <Button onClick={handleSaveNote} disabled={loading} className="mt-4">
//         {loading ? 'Saving...' : 'Save Note'}  {/* ✅ Show Loading State */}
//       </Button>
//     </Card>
//   );
// };

// export default Notes;
import { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button"; 
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// interface NotesProps {
//     date: Date;
// }
interface NotesProps {
  date: Date;
  notes: { [date: string]: string[] };  // ✅ Accept notes object
  setNotes: React.Dispatch<React.SetStateAction<{ [date: string]: string[] }>>; // ✅ Accept setter function
}

const Notes = ({ date }: NotesProps) => {
    const [notes, setNotes] = useState<string[]>(["", "", "", ""]); // ✅ Store notes in an array
    const [changedNoteIndex, setChangedNoteIndex] = useState<number | null>(null); // ✅ Track changed note index
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    
    const dateStr = format(date, "yyyy-MM-dd");

    const fetchUserAndNote = useCallback(async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            const user = session?.user;

            if (!user) {
                console.error("🚨 User not authenticated");
                return;
            }

            setUserId(user.id);
            console.log("🟢 Fetching notes for user:", user.id, "on date:", dateStr);

            const { data, error } = await supabase
                .from("notes")
                .select("*")
                .eq("user_id", user.id)
                .eq("date", dateStr);

            if (error) {
                console.error("🚨 Error fetching notes:", error);
            } else {
                console.log("✅ Notes fetched:", data);

                // ✅ Store each note in separate array indexes
                const notesArray = ["", "", "", ""];  // Default to empty notes
                data.forEach(row => {
                    if (row.index !== undefined) {  
                        notesArray[row.index] = row.content;  // ✅ Store note in its correct index
                    }
                });

                setNotes(notesArray);
            }
        } catch (err) {
            console.error("❌ Unexpected error:", err);
        }
    }, [dateStr]);

    useEffect(() => {
        fetchUserAndNote();
    }, [dateStr]);

    const handleNoteChange = (index: number, value: string) => {
        setNotes(prevNotes => {
            const updatedNotes = [...prevNotes];
            updatedNotes[index] = value;
            return updatedNotes;
        });
        setChangedNoteIndex(index); // ✅ Mark which note was changed
    };

    const handleSaveNote = async () => {
        if (!userId || changedNoteIndex === null) {
            console.error("🚨 User ID not found or no note changed, cannot save.");
            return;
        }

        setLoading(true);

        console.log(`📡 Saving note for User ID: ${userId} on Date: ${dateStr} for Note Index: ${changedNoteIndex}`);

        // ✅ Save only the modified note in a separate row
        const { error } = await supabase
            .from("notes")
            .upsert([{ 
                user_id: userId, 
                date: dateStr, 
                index: changedNoteIndex,  // ✅ Store index to keep notes separate
                content: notes[changedNoteIndex]  
            }]);

        setLoading(false);
        setChangedNoteIndex(null); // ✅ Reset changed note index after saving

        if (error) {
            console.error("🚨 Error saving note:", error.message);
        } else {
            console.log("✅ Note successfully saved to Supabase");
            fetchUserAndNote(); // ✅ Re-fetch updated note
        }
    };
    const labels = ["Important", "Not Important", "Urgent", "Not Urgent"];


    return (
        <Card className="p-6 shadow-sm">
            <h3 className={`text-lg font-medium mb-4 ${dateStr === format(new Date(), "yyyy-MM-dd") ? "today-heading" : ""}`}>
                Notes for {format(date, "MMMM d, yyyy")}
            </h3>
            <div className="noting-ka-box">

            {notes.map((note, index) => (
        <div key={index} className="flex flex-col items-start">
            <Textarea
            placeholder={labels[index % labels.length]} // Assigns labels dynamically
            value={note}
            onChange={(e) => handleNoteChange(index, e.target.value)}
            className="w-full h-32 resize-none bg-transparent border-none focus:ring-0"
            />
            <Button 
                onClick={handleSaveNote} 
                disabled={loading || changedNoteIndex === null} 
                className="mt-4"
            >
                {loading ? "Saving..." : "Save Note"}
            </Button>
            
        </div>
        ))}


            {/* {notes.map((note, index) => (
                <Textarea
                key={index}
                placeholder={`Write note ${index + 1} here...`}
                value={note}
                onChange={(e) => handleNoteChange(index, e.target.value)}
                className="w-full h-32 resize-none bg-transparent border-none focus:ring-0"
                />
            ))} */}
            </div>

            {/* <Button 
                onClick={handleSaveNote} 
                disabled={loading || changedNoteIndex === null} 
                className="mt-4"
            >
                {loading ? "Saving..." : "Save Note"}
            </Button> */}
        </Card>
    );
};

export default Notes;
