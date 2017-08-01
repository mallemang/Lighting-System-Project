// January 30th 2013
// LED Stege Lighting System
//******** Release 1.0

#include <DmxSimple.h>
#include <MIDI.h>
 
#define BASEB 2  // THIS IS THE BASE OF THE 3 COLOURS FOR THE BACK

void setup()
{
 DmxSimple.usePin(3);
 DmxSimple.maxChannel(20); 

 // Initiate MIDI communications, listen to all channels
  MIDI.begin(12); // channel 12 only

  // Connect the HandleNoteOn function to the library, so it is called upon reception of a NoteOn.
  MIDI.setHandleNoteOn(HandleNoteOn);  // Put only the name of the function


}
void loop()
{

  DmxSimple.write(BASEB,dmxch[0]);
  DmxSimple.write(BASEB+1,dmxch[1]);
  DmxSimple.write(BASEB+2,dmxch[2]);
  DmxSimple.write(BASEB-1,255); // shutter
  
}// end of not strobe


/* //strobe is on
  DmxSimple.write(BASEB,255);
  DmxSimple.write(BASEB+1,255);
  DmxSimple.write(BASEB+2,255);
  DmxSimple.write(BASEB-1,240); // strobe is shutter=240
*/

 // Call MIDI.read the fastest you can for real-time performance.
  MIDI.read();
  
  // There is no need to check if there are messages incoming if they are bound to a Callback function.








// This function will be automatically called when a NoteOn is received.
// It must be a void-returning function with the correct parameters,
// see documentation here: 
// http://arduinomidilib.sourceforge.net/class_m_i_d_i___class.html

void HandleNoteOn(byte channel, byte pitch, byte velocity) { 

  // Do whatever you want when you receive a Note On.

  if (velocity == 0) {
    if(pitch==48)digitalWrite(4, 0);
 else   if(pitch==50) DmxSimple.write(BASEB,255);
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




