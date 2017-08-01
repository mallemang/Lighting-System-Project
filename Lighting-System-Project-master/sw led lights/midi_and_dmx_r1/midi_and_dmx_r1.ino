// January 30th 2013
// LED Stege Lighting System
//******** Release 1.0
// modified april 2015 -> new black plastic lights added
// their config is:  0 shutter, 1 green 2 blue 3red  4 strobe (val 49) 5 fancychannel
//
// july 16, 2015 - modified for new version of chinese lights.
// just mod'd colours, and speed of strobe channel.

#include <DmxSimple.h>
#include <MIDI.h>
 //dmx channels  
#define BASEB 1  // THIS IS THE BASE OF THE 3 COLOURS FOR THE BACK
#define GREEN 2
#define RED 1
#define BLUE 3
#define SHUTTER 0

#define STROBEVAL 242
// note that the front lights serve as the spot
#define BASEF 5

#define MASTER 4
#define SPOT 9
#define SPOTALONE 10
#define STROBE 11

#define BASEX 10
#define XGREEN 2
#define XBLUE 3
#define XRED 1
#define XSTROBE 4
#define XSTROBEVAL 242
// SHUTTER IS THE SAME AS THE OTHERS

int chstate[4];


void setup()
{
 DmxSimple.usePin(3);
 DmxSimple.maxChannel(20); 

 // Initiate MIDI communications, listen to all channels
  MIDI.begin(12); // channel 12 only

  // Connect the HandleNoteOn function to the library, so it is called upon reception of a NoteOn.
  MIDI.setHandleNoteOn(HandleNoteOn);  // Put only the name of the function

for (int ch=0; ch<4; ++ch)  chstate[ch]=0;
for(int ip=4; ip<=11; ip++)
  {
  pinMode(ip,INPUT);
  digitalWrite(ip,HIGH);  // internal pullup resistors
  }
  

}
void loop()
{


 // Call MIDI.read the fastest you can for real-time performance.
  MIDI.read();
  
  // There is no need to check if there are messages incoming if they are bound to a Callback function.
/*
if master
  if not strobe
    if not spot alone
      take channel bits and or-on the 4 inputs
      then transfer 4 channels to 4 dmx outputs
      do same for front but depends on spot.

    else  spot alone
      turn on spot alone
     endif
  else strobe
    turn on strobe
   endif
else master is off
   if strobe    perform cool sequence
endif
*/

if(digitalRead(MASTER)==0)
  {

    if(digitalRead(STROBE)==1)
    {
    DmxSimple.write(BASEX+XSTROBE, 0);
    if(digitalRead(SPOTALONE) == 1)
        send_channels();
      else 
      send_spot_alone();
    }
    else 
      send_strobe();
  }
  else  // master off
    {
DmxSimple.write(BASEB+SHUTTER, 0);  
DmxSimple.write(BASEF+SHUTTER, 0);  //      all_off();
DmxSimple.write(BASEX+SHUTTER, 0);  //      all_off();
 }



}



void send_channels()
{
  // do backs
// if white...turn all all 3 colours
if(chstate[2] |!digitalRead(7))
{ DmxSimple.write(BASEB+RED, 255);
 DmxSimple.write(BASEB+GREEN, 255);
 DmxSimple.write(BASEB+BLUE, 255);
 DmxSimple.write(BASEX+XRED, 255);
 DmxSimple.write(BASEX+XGREEN, 255);
 DmxSimple.write(BASEX+XBLUE, 255);
 }
else
{  
  if(chstate[0] |!digitalRead(5))  DmxSimple.write(BASEB+RED, 255);
  else  DmxSimple.write(BASEB+RED, 0);
  if(chstate[1] |!digitalRead(6))    DmxSimple.write(BASEB+BLUE, 255);
  else  DmxSimple.write(BASEB+BLUE, 0);
  if(chstate[3] |! digitalRead(8))   DmxSimple.write(BASEB+GREEN, 255);
  else  DmxSimple.write(BASEB+GREEN, 0);
  
  // DO SAME FOR NEW LIGHTS
  if(chstate[0] |!digitalRead(5 ))  DmxSimple.write(BASEX+XRED, 255);
  else  DmxSimple.write(BASEX+XRED, 0);
  if(chstate[1] |!digitalRead(6))    DmxSimple.write(BASEX+XBLUE, 255);
  else  DmxSimple.write(BASEX + XBLUE, 0);
  if(chstate[3] |! digitalRead(8))   DmxSimple.write(BASEX+XGREEN, 255);
  else  DmxSimple.write(BASEX+XGREEN, 0);
  }

DmxSimple.write(BASEB+SHUTTER, 255);
DmxSimple.write(BASEX+SHUTTER, 255);

// if spot is off then do fronts too

if(!digitalRead(SPOT))
  send_spot();
  else
{
  if(chstate[2]|!digitalRead(7 ))
{ DmxSimple.write(BASEF+RED, 255);
 DmxSimple.write(BASEF+GREEN, 255);
 DmxSimple.write(BASEF+BLUE, 255);
}
else
{
  if(chstate[0]| !digitalRead(5 ))  DmxSimple.write(BASEF+RED, 255);
  else  DmxSimple.write(BASEF+RED, 0);
  if(chstate[1] |!digitalRead(6))    DmxSimple.write(BASEF+BLUE, 255);
  else  DmxSimple.write(BASEF+BLUE, 0);
  if(chstate[3] |! digitalRead(8)) DmxSimple.write(BASEF+GREEN, 255);
  else  DmxSimple.write(BASEF+GREEN, 0);
}
DmxSimple.write(BASEF+SHUTTER, 255);
} // END OF SPOT OFF
//

} // end of send channels

// THE FOLLOWING FUNCTION SENDS THE CONFIGURATION FOR STOBE
void send_strobe()
{
  
DmxSimple.write(BASEB+SHUTTER, STROBEVAL);  
DmxSimple.write(BASEX+SHUTTER, 255);
DmxSimple.write(BASEX+XSTROBE, XSTROBEVAL);
  

DmxSimple.write(BASEF+SHUTTER, STROBEVAL);  

DmxSimple.write(BASEB+RED, 255);  
DmxSimple.write(BASEF+RED, 255);  
DmxSimple.write(BASEB+GREEN, 255);  
DmxSimple.write(BASEF+GREEN, 255);  
DmxSimple.write(BASEB+BLUE, 255);  
DmxSimple.write(BASEF+BLUE, 255);  

DmxSimple.write(BASEX+XRED, 255);  
DmxSimple.write(BASEX+XGREEN, 255);  
DmxSimple.write(BASEX+XBLUE, 255);  

} // end of send strobe

void send_spot()
{
DmxSimple.write(BASEF+SHUTTER, 255);  
DmxSimple.write(BASEF+RED, 255);  
DmxSimple.write(BASEF+GREEN, 255);  
DmxSimple.write(BASEF+BLUE, 255);  
}  
 
void send_spot_alone()
{
DmxSimple.write(BASEF+SHUTTER, 255);  
DmxSimple.write(BASEF+RED, 255);  
DmxSimple.write(BASEF+GREEN, 255);  
DmxSimple.write(BASEF+BLUE, 255);  
DmxSimple.write(BASEB+SHUTTER, 0);  
DmxSimple.write(BASEX+SHUTTER, 0);  
}  
 
  
// This function will be automatically called when a NoteOn is received.
// It must be a void-returning function with the correct parameters,
// see documentation here: 
// http://arduinomidilib.sourceforge.net/class_m_i_d_i___class.html

void HandleNoteOn(byte channel, byte pitch, byte velocity) { 

  // Do whatever you want when you receive a Note On.
  DmxSimple.write(1,255); // shutter

  if (velocity == 0) {

    //if(pitch==48) DmxSimple.write(RED, 0);
    if(pitch==48) chstate[0]=0;

 else   if(pitch==50) chstate[1]=0;
 else   if(pitch==52)chstate[2]=0;
 else   if(pitch==53)chstate[3]=0;
  }
else
  {
    if(pitch==48) chstate[0]=1;

 else   if(pitch==50) chstate[1]=1;
 else   if(pitch==52)chstate[2]=1;
 else   if(pitch==53)chstate[3]=1;
  }
  
 
}






