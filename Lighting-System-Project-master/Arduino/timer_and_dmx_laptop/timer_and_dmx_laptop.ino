String inString="";

int number,lastnumber=0;

boolean gettingChannel;

int array[512];
int channel,value,inChar=' ';
#include <DmxSimple.h>
#include "TimerOne.h"
 
void setup() {                
  // initialize the digital pin as an output.
  // Pin 13 has an LED connected on most Arduino boards:
  pinMode(13, OUTPUT);    
 Serial.begin(9600);

inString="";

 DmxSimple.usePin(3);

  /* DMX devices typically need to receive a complete set of channels
  ** even if you only need to adjust the first channel. You can
  ** easily change the number of channels sent here. If you don't
  ** do this, DmxSimple will set the maximum channel number to the
  ** highest channel you DmxSimple.write() to. */
  DmxSimple.maxChannel(20); 

  Timer1.initialize(500000);         // (period in microseconds) initialize timer1, and set a 1/2 second period
  Timer1.attachInterrupt(callback);  // attaches callback() as a timer overflow interrupt



}

void callback()
{
  digitalWrite(13, digitalRead(13) ^ 1);
}
 
void loop() 
{
  while(Serial.available()>0)
  {
    inChar = Serial.read();
    if (isDigit(inChar))
      inString += (char)inChar; 
    else 
    {
      if (inChar==',') channel = inString.toInt();
      else if (inChar=='\n') 
      {
        value=inString.toInt();
        if(value<0) value=0;
        else if(value>255) value=255;
      
        DmxSimple.write(channel, value);
     Serial.println("wrote something");
      }
    inString="";  // non numeric so clear the building string
    }// end of non numeric character received
  }//end of while serial available
}// end of main loop




