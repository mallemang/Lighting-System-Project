// January 5th 2011 
// LED Stege Lighting System
//******** Release 1.0

#include <DmxSimple.h>
#include "TimerOne.h"
 
#define BASEF 5  // THIS IS THE BASE OF THE 3 COLOURS FOR THE FRONT
#define BASEB 2  // THIS IS THE BASE OF THE 3 COLOURS FOR THE BACK
// all other channels are relative to those
#define master 4
#define sequencer 5
#define strobe 6
#define spot 7


 int chstate[8];
  int laststate[8];
  int oldchstate[8];//for testing
  int oldanalog,val; 
  int seq=0;
 void cntrl_front(void);
 void cntrl_back(void);
 
void setup()
{
  for(int ch=4;ch<=11;ch++)
  {
    pinMode(ch, INPUT);      // sets the digital pin as input
    digitalWrite(ch, HIGH);   // pull-up resistors
  }
  for(int i=0;i<8; i++)
  {
    oldchstate[i]=chstate[i]=0;
  }
  Serial.begin(9600);
  DmxSimple.usePin(3);
 DmxSimple.maxChannel(20); 

  Timer1.initialize(500000);         // (period in microseconds) initialize timer1, and set a 1/2 second period
  Timer1.attachInterrupt(callback);  // attaches callback() as a timer overflow interrupt
pinMode(13,OUTPUT);
pinMode (A0,INPUT);
}
void callback()
{
  digitalWrite(13, digitalRead(13) ^ 1);
  if(chstate[sequencer]==1 )
  {
    if(digitalRead(13)) {++seq; if(seq==5) seq=1;}
  }
  else
    seq=0;
}

void loop()
{
 // cha4-7  channels   chstate 0-3
#define mastch 8 // ch8 - mast        chstate 4
#define seqch 9 // ch9 seq          chstate 5
#define strobech 10 // ch10 strobe     chstate 6
#define spotch 11  // ch11 spot      chstate 7
 // 
 int index;
 int inputpin;
 unsigned long  p;
int lastanalog; 
int analogval;

while(1)
{
analogval=analogRead(0);
 
 if(analogval<lastanalog-10 || analogval>lastanalog+10)
  {

  p=analogval;
  p=p*914L+50000L;
  lastanalog=analogval;
  Timer1.setPeriod(p);
   
  } 

   for(inputpin=4; inputpin<=11; inputpin++)
  {
    index=inputpin-4;
    if(digitalRead(inputpin)==LOW)
    {
      if(laststate[index]==HIGH)
      {
        delay(8);
        if(digitalRead(inputpin)==LOW)
        {
          laststate[index]=LOW;
          chstate[index]=chstate[index]^1;
          delay(500);
          if(digitalRead(inputpin)==LOW)
          {
            // depending on the value of index...do different things...good time for switch/case
 
            switch(index)
 {
           case 0:
           case 1:
           case 2:
           case 3:
           // any of the channel bits
            for(int i=0; i<=7; i++)
            {
              if(i==index) chstate[i]=HIGH;
              else
                           chstate[i]=LOW;  //clear all other channels
            }
            chstate[master]=1;
          break;
          case 4: // master
          break;
          case 5: // seq
          chstate[spot]=0;
          chstate[master]=1;
          chstate[seq]=1;
          case 7: //spot  
           for(int i=0; i<=3; i++)
               chstate[i]=LOW;  //clear all other channels
               chstate[index]=1;
            
            break;
            
          case 6: // strobe
          break;
 }
          }// end of long low and clear channels
        }
      }//end last state was high
      else;  //last state was already low
    }// end of found one low
    else
    {
      laststate[index]=HIGH;
    }
  }// end of for loop  
 for(int i=0; i<4; i++)
 {
   if(chstate[i] != oldchstate[i])
   { Serial.print("channel "); Serial.print(i,DEC); Serial.print("="); Serial.println(chstate[i],DEC);
   } 
   oldchstate[i]=chstate[i];
 }

  
cntrl_front();
cntrl_back();

}// end of while
}//end of main loop

/* if strobe is not on
  if master is on 
    transfer state bits t output bits
    if sequencer is on add the seq 
    do DMX work to turn on the appropriate colours
    ch0 is red
    ch 1 is blue    
    ch 2 is yellow (R&g)
    ch 3 is green
    
    
*/
// so two front lights are the spot lights...if spot is off..then have to follow back lights..else turn them white
// set both groups shutter full


// the dmxch[3] array is used to assign intensities to the channels of the primary colours.
// each of the 3 elements are initialized to zero and then assigned values depending upon the ch status, seq etc.

void cntrl_front()
{
  /*dmx ch1 is blue
    dmx ch2 green
    dmx ch3 red
    dms ch4 is the do-all channel
    dmx ch 5 is stobe
    dmx ch 6 is shutter
    */
  int dmxch[3];
   for(int i=0; i<3;i++)
     dmxch[i]=0;
if(chstate[strobe]==0)
{
 DmxSimple.write(BASEF+4,0); // strobe
 
if(chstate[spot]==1)
   {  dmxch[0]=255;
     dmxch[1]=255;
     dmxch[2]=255;
   }
   else
  {

  if(chstate[master]==1)
  {

   // red  
   if(chstate[0]==1 || seq==1)
    dmxch[2]=255;
  //blue
   if(chstate[1]==1 || seq==2)
    dmxch[0]=255;
  // yellow
   if(chstate[2]==1 || seq==3)
   { dmxch[2]=255;
    dmxch[1]=255;}
   // green
   if(chstate[3]==1 || seq==4)
    dmxch[1]=255;
  }// end of master on
  }// ene of not spot
  
  DmxSimple.write(BASEF,dmxch[0]);
  DmxSimple.write(BASEF+1,dmxch[1]);
  DmxSimple.write(BASEF+2,dmxch[2]);
 
}// end of not strobe
else
{ //strobe is on
  DmxSimple.write(BASEF,255);
  DmxSimple.write(BASEF+1,255);
  DmxSimple.write(BASEF+2,255);
  DmxSimple.write(BASEF+4,240); // strobe
}


  DmxSimple.write(BASEF+5,255); //SHUTTER
  DmxSimple.write(BASEF+3,0); //SPECIAL DO-ALL CHANNEL
}//end of function
/*********************************************

*/
void cntrl_back()
{
  int dmxch[3];
   for(int i=0; i<3;i++)
     dmxch[i]=0;
if(chstate[strobe]==0)
{

  if(chstate[master]==1)
  {

   // red  
   if(chstate[0]==1 || seq==1)
    dmxch[0]=255;
  //blue
   if(chstate[1]==1 || seq==2)
    dmxch[2]=255;
  // yellow
   if(chstate[2]==1 || seq==3)
   { dmxch[0]=255;
    dmxch[1]=255;}
   // green
   if(chstate[3]==1 || seq==4)
    dmxch[1]=255;
  }// end of master on
  //ok turn on the channels and the shutter
  DmxSimple.write(BASEB,dmxch[0]);
  DmxSimple.write(BASEB+1,dmxch[1]);
  DmxSimple.write(BASEB+2,dmxch[2]);
  DmxSimple.write(BASEB-1,255); // shutter
  
}// end of not strobe
else
{ //strobe is on
  DmxSimple.write(BASEB,255);
  DmxSimple.write(BASEB+1,255);
  DmxSimple.write(BASEB+2,255);
  DmxSimple.write(BASEB-1,240); // strobe is shutter=240
}
}//end of function

