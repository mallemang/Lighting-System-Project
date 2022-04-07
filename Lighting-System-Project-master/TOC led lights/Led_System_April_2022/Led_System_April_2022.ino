// January 5th 2011 
// LED Stege Lighting System
//******** Release 1.0

// april 2022 - updated...removed silver lights, fixed a couple errors...had lost the recent version but then found it.
// preparing to add bluetooth control for abba band.


#include <DmxSimple.h>
#include "TimerOne.h"
#include "OneButton.h"
 
 
#define FA 19
#define BA 30  // newer back lights matching the front ones

// all other channels are relative to those
#define master 4
#define sequencer 5
#define strobe 6
#define spot 7



OneButton butMst(8, true);
OneButton butRed(4, true);
OneButton butBlu(5, true);
OneButton butYel(6, true);
OneButton butGrn(7, true);
OneButton butSeq(9, true);
OneButton butStr(10, true);
OneButton butSpt(11, true);
bool MstState,RedState,BluState,YelState,GrnState,SeqState,StrState,SptState;

 
  int oldanalog,val; 
  int seq=0;
int pan,tilt;
void cntrl_front(void);
 void cntrl_back(void);


 
//#define BLEFT 26
//#define BRIGHT 42

//#define MWHITE 9
//#define MSHUTTER 5
//#define MSOUND 12
//#define MRESET 13
//#define MSPEED 4

char thisChar,lastChar;

void setup()
{
  
  Serial.begin(9600);
  
  DmxSimple.usePin(3);
 DmxSimple.maxChannel(60); 
pinMode(8,INPUT_PULLUP);
pinMode(4,INPUT_PULLUP);
pinMode(5,INPUT_PULLUP);
pinMode(6,INPUT_PULLUP);
pinMode(7,INPUT_PULLUP);
  
 
  
  
  
  Timer1.initialize(500000);         // (period in microseconds) initialize timer1, and set a 1/2 second period
  Timer1.attachInterrupt(timercallback);  // attaches callback() as a timer overflow interrupt
pinMode(13,OUTPUT);
pinMode (A0,INPUT);
 butMst.attachClick(MstClk);
  butMst.attachLongPressStart(MstLng);
  butRed.attachClick(RedClk);
  butRed.attachLongPressStart(RedLng);
  butBlu.attachClick(BluClk);
  butBlu.attachLongPressStart(BluLng);
  butYel.attachClick(YelClk);
  butYel.attachLongPressStart(YelLng);
  butGrn.attachClick(GrnClk);
  butGrn.attachLongPressStart(GrnLng);
  butStr.attachClick(StrClk);
  butStr.attachLongPressStart(StrLng);
  butSpt.attachClick(SptClk);
  butSpt.attachLongPressStart(SptLng);
  butSeq.attachClick(SeqClk);
  butSeq.attachLongPressStart(SeqLng);

  
  RedState=false;
  BluState=false;
  GrnState=false;
  YelState=false;
  SeqState=false;
  SptState=false;
  MstState=false;
  thisChar=lastChar=0;
}
void timercallback()
{
  digitalWrite(13, digitalRead(13) ^ 1);
  if(SeqState)
  {
    if(digitalRead(13)) {++seq; if(seq==5) seq=1;}
  }
  else
    seq=0;
}


void manage_bt()
// this function sets/clears state of lights based on bt char received
{
  switch (lastChar)
  {
    case 'a':
  RedState = false;
    
    break;
    
case 'A':
  RedState = true;
  MstState = true;
    break;
    
case 'b':
  BluState = false;
    break;
    
case 'B':
  BluState = true;
  MstState = true;
   
    break;
    
case 'c':
  YelState = false;
      break;
    
case 'C':
  YelState = true;
  MstState = true;
    break;
    
case 'd':
  GrnState = false;

    break;
    
case 'D':
  GrnState = true;
  MstState = true;
    break;
    
case 's':
      StrState = false;
  break;
    
case 'S':
      StrState = true;
    break;
    
  }
}


void loop()
{
 // cha4-7  channels   chstate 0-3
#define mastch 8 // ch8 - mast        chstate 4
#define seqch 9 // ch9 seq          chstate 5
#define strobech 10 // ch10 strobe     chstate 6
#define spotch 11  // ch11 spot      chstate 7
 // 
unsigned long  p;
int lastanalog; 
int analogval;

while(1)
{
  butMst.tick();
  butRed.tick();
  butBlu.tick();
  butYel.tick();
  butGrn.tick();
  butSeq.tick();
  butStr.tick();
  butSpt.tick();
  analogval=analogRead(0);
 
 if(analogval<lastanalog-10 || analogval>lastanalog+10)
  {

  p=analogval;
  p=p*914L+50000L;
  lastanalog=analogval;
  Timer1.setPeriod(p);
   
  } 
// new code added for control from bluetooth
  while(Serial.available()>0)
  {
    thisChar = Serial.read();
    if(thisChar==',' || thisChar=='\n' )
  {
      if(lastChar!=0)
          manage_bt();
    
      
    }
    else // if it is not a , or \n then save the char
    {
  //Serial.println(thisChar);
      lastChar=thisChar;
    }  
    // regardless of the char, throw it away
    thisChar = 0;
       

  }//end of while serial


cntrl_front();
cntrl_back();
} //end of while
} // end of loop


/* if strobe is not on
  if master is on 
    transfer state bits t output bits
    if sequencer is on add the seq 
    do DMX work to turn on the appropriate colours
    ch0 is red
    ch 1 is blue    
    ch 2 is yellow (R&g + white if applicable)
    ch 3 is green
    
    
*/
// so two front lights are the spot lights...if spot is off..then have to follow back lights..else turn them white
// set both groups shutter full

//********************* replacing dmxch with red,green,blue...and a new one white
// the dmxch[3] array is used to assign intensities to the channels of the primary colours.
// each of the 3 elements are initialized to zero and then assigned values depending upon the ch status, seq etc.

void cntrl_front()
// note yellow is red + green
{ //RGB
int red,green,blue,white;
red=green=blue=white=0;
if(!StrState)
{
 DmxSimple.write(FA+5,0); // strobe
 
if(SptState)
   {
red=green=blue=white=255;    
   }
   else
  {

    if(MstState)
    {

   // red  
     if(RedState || seq==1)
red=255;    
  //blue
   if(BluState || seq==2)
blue=255;
// yellow
   if(YelState || seq==3)
   { 
red=green=white=255;  
   }
   // green
   if(GrnState || seq==4)
 green=255;
 }// end of master on
 }// ene of not spot
  
    DmxSimple.write(FA+1,red);
    DmxSimple.write(FA+2,green);
    DmxSimple.write(FA+3,blue);
    DmxSimple.write(FA+4,white);
    DmxSimple.write(FA+5,0);
    
 
}// end of not strobe
else
  { //strobe is on
   DmxSimple.write(FA+1,255);
   DmxSimple.write(FA+2,255);
   DmxSimple.write(FA+3,255);
   DmxSimple.write(FA+4,255);
   DmxSimple.write(FA+5,255); // strobe
  }


  DmxSimple.write(FA,255); //SHUTTER
  DmxSimple.write(FA+6,0); //SPECIAL DO-ALL CHANNEL
  DmxSimple.write(FA+7,0); //SPECIAL DO-ALL CHANNEL
}//end of function
/*********************************************

*/

void cntrl_back()
{ //RGB
  int red,green,blue,white;
 red=green=blue=white=0;
if(!StrState)
{

  if(MstState)
  {

   // red  
   if(RedState || seq==1)
red=255;
  //blue
   if(BluState || seq==2)
blue=255;
  // yellow
   if(YelState || seq==3)
   red=green=white=255;
   // green
   if(GrnState || seq==4)
   green = 255;
  }// end of master on
  //ok turn on the channels and the shutter
  
    DmxSimple.write(BA+1,red);
    DmxSimple.write(BA+2,green);
    DmxSimple.write(BA+3,blue);
    DmxSimple.write(BA+4,white);
    DmxSimple.write(BA+5,0);
    
}// end of not strobe
else
{ //strobe is on
  
 //strobe is on
   DmxSimple.write(BA+1,255);
   DmxSimple.write(BA+2,255);
   DmxSimple.write(BA+3,255);
   DmxSimple.write(BA+4,255);
   DmxSimple.write(BA+5,255); // strobe
  }
  
  DmxSimple.write(BA,255); //SHUTTER
  DmxSimple.write(BA+6,0); //SPECIAL DO-ALL CHANNEL
  DmxSimple.write(BA+7,0); //SPECIAL DO-ALL CHANNEL
  }//end of function 





// logic:  any channel clicks...toggle the state
// any channel long, turn it on and all others off and master on
// strobe long doesn't clear channel bits but seq & spot long does
void MstClk(){
  if(MstState) MstState=false;
  else MstState=true;
  
} 
void MstLng(){
  MstState=true;
  fade();
}  


void RedClk(){
  if(RedState) RedState=false;
  else RedState=true;
  
} 
void RedLng(){
  RedState=true;
  BluState=false;
  GrnState=false;
  YelState=false;
  MstState=true;
  SptState=false;
  SeqState=false;
}  

void BluClk(){
  if(BluState) BluState=false;
  else BluState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void BluLng(){
  RedState=false;
  BluState=true;
  GrnState=false;
  YelState=false;
  MstState=true;
  SeqState=false;
  SptState=false;
}  

void YelClk(){
  if(YelState) YelState=false;
  else YelState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void YelLng(){
  RedState=false;
  BluState=false;
  GrnState=false;
  YelState=true;
  MstState=true;
  SptState=false;
  SeqState=false;
}  

void GrnClk(){
  if(GrnState) GrnState=false;
  else GrnState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void GrnLng(){
  RedState=false;
  BluState=false;
  GrnState=true;
  YelState=false;
  MstState=true;
  SptState=false;
  SeqState=false;
}  

void SeqClk(){
  if(SeqState) SeqState=false;
  else SeqState=true;

} 
void SeqLng(){
  RedState=false;
  BluState=false;
  GrnState=false;
  YelState=false;
  SeqState=true;
  MstState=true;
}  

void StrClk(){
  if(StrState) StrState=false;
  else StrState=true;
} 
void StrLng(){
  Serial.println("Strobe Long.");
  StrState = true;
 
}  

void SptClk(){
  Serial.println("Spot click.");
  if(SptState) SptState=false;
  else SptState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void SptLng(){
  Serial.println("Spot Long.");
  
  MstState=false;
  SptState=true;
}  

void fade(){
// turn off any white
DmxSimple.write(FA+4,0);
DmxSimple.write(BA+4,0);

int r,g,b;
// 
while(1)
{
// red up blue down g=off
b=255;r=1;
DmxSimple.write(FA+2,0);
DmxSimple.write(BA+2,0);

while(r<255)
{
 DmxSimple.write(FA+1,r);
 DmxSimple.write(FA+3,b);
 DmxSimple.write(BA+1,r);
 DmxSimple.write(BA+3,b);
for(int ch=4; ch<8; ch++)
  if(!digitalRead(ch)) return;
delay(20);
r++;b--;
  
}

//green up red down  blueoff
r=255;g=1;
DmxSimple.write(FA+3,0);
DmxSimple.write(BA+3,0);
while(g<255)
{
 DmxSimple.write(FA+1,r);
 DmxSimple.write(FA+2,g);
 DmxSimple.write(BA+1,r);
 DmxSimple.write(BA+2,g);
for(int ch=4; ch<8; ch++)
  if(!digitalRead(ch)) return;
delay(20);
g++;r--;
  
}

//blue up green down   red off
g=255;b=1;
DmxSimple.write(FA+1,0);
DmxSimple.write(BA+1,0);
while(b<255)
{
 DmxSimple.write(FA+2,g);
 DmxSimple.write(FA+3,b);
 DmxSimple.write(BA+2,g);
 DmxSimple.write(BA+3,b);
for(int ch=4; ch<8; ch++)
  if(!digitalRead(ch)) return;
delay(20);
b++;g--;
}
}// end of while 1 

}
