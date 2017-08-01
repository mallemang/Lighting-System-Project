#include <MIDI.h>


// This function will be automatically called when a NoteOn is received.
// It must be a void-returning function with the correct parameters,
// see documentation here: 
// http://arduinomidilib.sourceforge.net/class_m_i_d_i___class.html

void HandleNoteOn(byte channel, byte pitch, byte velocity) { 

  // Do whatever you want when you receive a Note On.

  if (velocity == 0) {
    if(pitch==48)digitalWrite(4, 0);
 else   if(pitch==50)digitalWrite(5, 0);
 else   if(pitch==52)digitalWrite(6, 0);
 else   if(pitch==53)digitalWrite(7, 0);
    // This acts like a NoteOff.
  }
else
{   if(pitch==48)digitalWrite(4, 1);
   else if(pitch==50)digitalWrite(5, 1);
   else if(pitch==52)digitalWrite(6, 1);
   else if(pitch==53)digitalWrite(7, 1);
 
}
  // Try to keep your callbacks short (no delays ect) as the contrary would slow down the loop()
  // and have a bad impact on real-time performance.
}

void setup() {
  // Initiate MIDI communications, listen to all channels
  MIDI.begin(12); // channel 12 only
   
  
  // Connect the HandleNoteOn function to the library, so it is called upon reception of a NoteOn.
  MIDI.setHandleNoteOn(HandleNoteOn);  // Put only the name of the function
  pinMode(4, OUTPUT);  
  pinMode(5, OUTPUT);  
  pinMode(6, OUTPUT);  
  pinMode(7, OUTPUT);  
}


void loop() {
  // Call MIDI.read the fastest you can for real-time performance.
  MIDI.read();
  
  // There is no need to check if there are messages incoming if they are bound to a Callback function.
}
