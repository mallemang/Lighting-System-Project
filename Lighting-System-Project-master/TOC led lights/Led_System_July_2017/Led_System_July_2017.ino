// January 5th 2011 
// LED Stege Lighting System
//******** Release 1.0

#include <DmxSimple.h>
#include "TimerOne.h"
#include "OneButton.h"
 
#define BFLA 6  // THIS IS THE BASE OF THE 3 COLOURS FOR THE FRONT
#define BSILV 1  // THIS IS THE BASE OF THE 3 COLOURS FOR THE BACK
#define BFLB 12 //new back lights
#define FA 18
// all other channels are relative to those
#define master 4
#define sequencer 5
#define strobe 6
#define spot 7


// Setup a new OneButton on pin A1.  
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
 void cntrl_front(void);
 void cntrl_back(void);


 
void setup()
{

  Serial.begin(9600);
  DmxSimple.usePin(3);
 DmxSimple.maxChannel(20); 

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
    ch 2 is yellow (R&g)
    ch 3 is green
    
    
*/
// so two front lights are the spot lights...if spot is off..then have to follow back lights..else turn them white
// set both groups shutter full


// the dmxch[3] array is used to assign intensities to the channels of the primary colours.
// each of the 3 elements are initialized to zero and then assigned values depending upon the ch status, seq etc.

void cntrl_front()

{ //RGB
  int dmxch[3];
   for(int i=0; i<3;i++)
     dmxch[i]=0;
if(!StrState)
{
 DmxSimple.write(FA+5,0); // strobe
 
if(SptState)
   {
    dmxch[0] = 255;
    dmxch[1] = 255;
    dmxch[2] = 255;
    
   }
   else
  {

    if(MstState)
    {

   // red  
     if(RedState || seq==1)
dmxch[0]=255;    
  //blue
   if(BluState || seq==2)
dmxch[2] = 255;
// yellow
   if(YelState || seq==3)
   { 
dmxch[0]=255;
dmxch[1]=255;
  
   }
   // green
   if(GrnState || seq==4)
 dmxch[1]= 255;
 }// end of master on
 }// ene of not spot
  
    DmxSimple.write(FA+1,dmxch[0]);
    DmxSimple.write(FA+2,dmxch[1]);
    DmxSimple.write(FA+3,dmxch[2]);
    DmxSimple.write(FA+5,0);
    
 
}// end of not strobe
else
  { //strobe is on
   DmxSimple.write(FA+1,255);
   DmxSimple.write(FA+2,255);
   DmxSimple.write(FA+3,255);
   DmxSimple.write(FA+5,255); // strobe
  }


  DmxSimple.write(FA,255); //SHUTTER
  DmxSimple.write(FA+4,0); //SPECIAL DO-ALL CHANNEL
  DmxSimple.write(FA+6,0); //SPECIAL DO-ALL CHANNEL
  DmxSimple.write(FA+7,0); //SPECIAL DO-ALL CHANNEL
}//end of function
/*********************************************

*/

void cntrl_back()
{ //RGB
  int dmxch[3];
   for(int i=0; i<3;i++)
     dmxch[i]=0;
if(!StrState)
{

  if(MstState)
  {

   // red  
   if(RedState || seq==1)
    dmxch[0]=255;
  //blue
   if(BluState || seq==2)
    dmxch[2]=255;
  // yellow
   if(YelState || seq==3)
   { dmxch[0]=255;  //red
    dmxch[1]=255;}  //grn
   // green
   if(GrnState || seq==4)
    dmxch[1]=255;
  }// end of master on
  //ok turn on the channels and the shutter
  DmxSimple.write(BSILV+1,dmxch[0]);
  DmxSimple.write(BSILV+2,dmxch[1]);
  DmxSimple.write(BSILV+3,dmxch[2]);
  DmxSimple.write(BSILV,152); // shutter
  
  DmxSimple.write(BFLA+1,dmxch[0]);
  DmxSimple.write(BFLA+2,dmxch[1]);
  DmxSimple.write(BFLA+3,dmxch[2]);
  DmxSimple.write(BFLA,255); // shutter
  DmxSimple.write(BFLA+4,0); // STROBE
  
  DmxSimple.write(BFLB+1,dmxch[0]);
  DmxSimple.write(BFLB+2,dmxch[1]);
  DmxSimple.write(BFLB+3,dmxch[2]);
  DmxSimple.write(BFLB,255); // shutter
  DmxSimple.write(BFLB+4,0); // STROBE
  
}// end of not strobe
else
{ //strobe is on
  DmxSimple.write(BSILV+1,255);
  DmxSimple.write(BSILV+2,255);
  DmxSimple.write(BSILV+3,255);
  DmxSimple.write(BSILV,242); // strobe is shutter=240
  
  DmxSimple.write(BFLA+1,255);
  DmxSimple.write(BFLA+2,255);
  DmxSimple.write(BFLA+3,255);
  DmxSimple.write(BFLA,255); //SHUTTER
  DmxSimple.write(BFLA+4,255);//FLASH

  DmxSimple.write(BFLB+1,255);
  DmxSimple.write(BFLB+2,255);
  DmxSimple.write(BFLB+3,255);
  DmxSimple.write(BFLB,255); //SHUTTER
  DmxSimple.write(BFLB+4,49);//FLASH
}
}//end of function 





// logic:  any channel clicks...toggle the state
// any channel long, turn it on and all others off and master on
// strobe long doesn't clear channel bits but seq & spot long does
void MstClk(){
  Serial.println("Mst click.");
  if(MstState) MstState=false;
  else MstState=true;
  
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void MstLng(){
  Serial.println("Mst Long.");
  MstState=true;
  fade();
}  

void RedClk(){
  Serial.println("Red click.");
  if(RedState) RedState=false;
  else RedState=true;
  
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void RedLng(){
  Serial.println("Red Long.");
  RedState=true;
  BluState=false;
  GrnState=false;
  YelState=false;
  MstState=true;
  SptState=false;
  SeqState=false;
}  

void BluClk(){
  Serial.println("Blue click.");
  if(BluState) BluState=false;
  else BluState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void BluLng(){
  Serial.println("Blue Long.");
  RedState=false;
  BluState=true;
  GrnState=false;
  YelState=false;
  MstState=true;
  SeqState=false;
  SptState=false;
}  

void YelClk(){
  Serial.println("Yellow click.");
  if(YelState) YelState=false;
  else YelState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void YelLng(){
  Serial.println("Yellow Long.");
  RedState=false;
  BluState=false;
  GrnState=false;
  YelState=true;
  MstState=true;
  SptState=false;
  SeqState=false;
}  

void GrnClk(){
  Serial.println("Green click.");
  if(GrnState) GrnState=false;
  else GrnState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void GrnLng(){
  Serial.println("Green Long.");
  RedState=false;
  BluState=false;
  GrnState=true;
  YelState=false;
  MstState=true;
  SptState=false;
  SeqState=false;
}  

void SeqClk(){
  Serial.println("Sequencer click.");
  if(SeqState) SeqState=false;
  else SeqState=true;

} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void SeqLng(){
  Serial.println("Sequencer Long.");
  RedState=false;
  BluState=false;
  GrnState=false;
  YelState=false;
  SeqState=true;
  MstState=true;
}  

void StrClk(){
  Serial.println("Strobe click.");
  if(StrState) StrState=false;
  else StrState=true;
} 
// This function will be called when the button1 was pressed 2 times in a short timeframe.
void StrLng(){
  Serial.println("Strobe Long.");
  StrState=true;
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

int r,g,b;
// 
while(1)
{
// red up blue down g=off
b=255;r=1;
DmxSimple.write(FA+2,0);
DmxSimple.write(BSILV+2,0);
DmxSimple.write(BFLA+2,0);
DmxSimple.write(BFLB+2,0);

while(r<255)
{
 DmxSimple.write(FA+1,r);
 DmxSimple.write(FA+3,b);
 DmxSimple.write(BSILV+1,r);
 DmxSimple.write(BSILV+3,b);
 DmxSimple.write(BFLA+1,r);
 DmxSimple.write(BFLA+3,b);
 DmxSimple.write(BFLB+1,r);
 DmxSimple.write(BFLB+3,b);
for(int ch=4; ch<8; ch++)
  if(!digitalRead(ch)) return;
delay(20);
r++;b--;
  
}

//green up red down  blueoff
r=255;g=1;
DmxSimple.write(FA+3,0);
DmxSimple.write(BSILV+3,0);
DmxSimple.write(BFLA+3,0);
DmxSimple.write(BFLB+3,0);
while(g<255)
{
 DmxSimple.write(FA+1,r);
 DmxSimple.write(FA+2,g);
 DmxSimple.write(BSILV+1,r);
 DmxSimple.write(BSILV+2,g);
 DmxSimple.write(BFLA+1,r);
 DmxSimple.write(BFLA+2,g);
 DmxSimple.write(BFLB+1,r);
 DmxSimple.write(BFLB+2,g);
for(int ch=4; ch<8; ch++)
  if(!digitalRead(ch)) return;
delay(20);
g++;r--;
  
}

//blue up green down   red off
g=255;b=1;
DmxSimple.write(FA+1,0);
DmxSimple.write(BSILV+1,0);
DmxSimple.write(BFLA+1,0);
DmxSimple.write(BFLB+1,0);
while(b<255)
{
 DmxSimple.write(FA+2,g);
 DmxSimple.write(FA+3,b);
 DmxSimple.write(BSILV+2,g);
 DmxSimple.write(BSILV+3,b);
 DmxSimple.write(BFLA+2,g);
 DmxSimple.write(BFLA+3,b);
 DmxSimple.write(BFLB+2,g);
 DmxSimple.write(BFLB+3,b);
for(int ch=4; ch<8; ch++)
  if(!digitalRead(ch)) return;
delay(20);
b++;g--;
}
}// end of while 1 

}


