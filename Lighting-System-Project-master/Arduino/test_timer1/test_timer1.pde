#include "TimerOne.h"

int seq=0;  // sequencer goes 0,1,2,3
 void setup() {                
  // initialize the digital pin as an output.
  // Pin 13 has an LED connected on most Arduino boards:
  pinMode(13, OUTPUT);    
 Serial.begin(9600);
pinMode (A0,INPUT);

 Timer1.initialize(500000);         // (period in microseconds) initialize timer1, and set a 1/2 second period
 Timer1.attachInterrupt(callback);  // attaches callback() as a timer overflow interrupt
 

}

void callback()
{
  digitalWrite(13, digitalRead(13) ^ 1);
// only if sequencer state is on
  ++seq;
  seq&=3;  // mod r
  Serial.println(seq,DEC);
}
 void loop() 
{
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

}}
