// January 30th 2013
// LED Stege Lighting System
//******** Release 1.0

#include <DmxSimple.h>
//#include <MIDI.h>
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


int chstate[4];


void setup()
{
 DmxSimple.usePin(3);
 DmxSimple.maxChannel(20); 

 // Initiate MIDI communications, listen to all channels
//  MIDI.begin(12); // channel 12 only

  // Connect the HandleNoteOn function to the library, so it is called upon reception of a NoteOn.
//  MIDI.setHandleNoteOn(HandleNoteOn);  // Put only the name of the function

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
//  MIDI.read();
  
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
  send_channels();
  
    /*  if(digitalRead(STROBE)==1)
    {
    if(digitalRead(SPOTALONE) == 1)
      {
              send_channels();
      }
      else ;
      send_spot_alone();
    }
    else 
      send_strobe();
  }
  else  // master off
    {
    if(digitalRead(STROBE)==0);
      // master off but strobe on
 //     sequence();
    else 
 {   
DmxSimple.write(BASEB+SHUTTER, 0);  
DmxSimple.write(BASEF+SHUTTER, 0);  //      all_off();
 }

    }

*/

}
else
{
DmxSimple.write(BASEB+SHUTTER,0);
DmxSimple.write(BASEF+SHUTTER,0);

}

}// end of loop



void send_channels()
{
  // do backs
// if white...turn all all 3 colours
if(chstate[2] | ! digitalRead(7))
{ DmxSimple.write(BASEB+RED, 255);
 DmxSimple.write(BASEB+GREEN, 255);
 DmxSimple.write(BASEB+BLUE, 255);
}
else
{  
  if(chstate[0] | !digitalRead(5 ))  DmxSimple.write(BASEB+RED, 255);
  else  DmxSimple.write(BASEB+RED, 0);
  if(chstate[1] |!digitalRead(6))    DmxSimple.write(BASEB+BLUE, 255);
  else  DmxSimple.write(BASEB+BLUE, 0);
  if(chstate[3] |! digitalRead(8))   DmxSimple.write(BASEB+GREEN, 255);
  else  DmxSimple.write(BASEB+GREEN, 0);
}

DmxSimple.write(BASEB+SHUTTER, 255);

// if spot is off then do fronts too

if(!digitalRead(SPOT))
  send_spot();
  else
{
  if(chstate[2])
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
}// not spot  



}
void send_strobe()
{
  
DmxSimple.write(BASEB+SHUTTER, STROBEVAL);  
DmxSimple.write(BASEF+SHUTTER, STROBEVAL);  
DmxSimple.write(BASEB+RED, 255);  
DmxSimple.write(BASEF+RED, 255);  
DmxSimple.write(BASEB+GREEN, 255);  
DmxSimple.write(BASEF+GREEN, 255);  
DmxSimple.write(BASEB+BLUE, 255);  
DmxSimple.write(BASEF+BLUE, 255);  

}

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





