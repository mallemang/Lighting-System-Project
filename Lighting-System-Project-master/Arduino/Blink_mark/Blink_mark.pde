/*
  
  This example code is in the public domain.
 */
String inString="";

int number,lastnumber=0;

boolean gettingChannel;

int array[512];
int channel,value,inChar=' ';
#include <DmxSimple.h>
void setup() {                
  // initialize the digital pin as an output.
  // Pin 13 has an LED connected on most Arduino boards:
  pinMode(13, OUTPUT);    
 Serial.begin(9600);
Serial.println("press ENTER to get my attention");
inString="";

 DmxSimple.usePin(3);

  /* DMX devices typically need to receive a complete set of channels
  ** even if you only need to adjust the first channel. You can
  ** easily change the number of channels sent here. If you don't
  ** do this, DmxSimple will set the maximum channel number to the
  ** highest channel you DmxSimple.write() to. */
  DmxSimple.maxChannel(60); 
   DmxSimple.write(1,255);
     DmxSimple.write(2,255);
     DmxSimple.write(3,255);

}
void loop() {
  blink();
  while (Serial.available() > 0) 
  {
    inChar = Serial.read();
    if (isDigit(inChar)) 
    {
      // convert the incoming byte to a char 
      // and add it to the string:
      inString += (char)inChar; 
    }
    // if you get a newline, print the string and assign it to either channel or value
    // then the string's value:
    if (inChar == '\n') 
    {
      if(inString=="")
        {
          Serial.println("empty string so enter channel 0-255");
          gettingChannel=true;
        }
      else
      { // enter pressed but not empty string
        
        Serial.print("the numer:");
        Serial.println(inString.toInt());
        Serial.print("String: ");
        Serial.println(inString);
        if(gettingChannel)
          {  // getting the channel
            Serial.println("assigning channel");         
            channel=inString.toInt();
            inString="";
            if(channel<0 || channel > 511)
              Serial.println("invalid channel");
              else
              {
            gettingChannel=false;  //SWITCH TO VALUE INPUT
            Serial.println("enter value");
              }            
          }
          else   //getting the value
          {
            Serial.println("assigning value");
            value=inString.toInt();
            inString="";
            if(value<0 || value > 255)
              Serial.println("invalid value");
              else
              {
              DmxSimple.write(channel,value);
            gettingChannel=true;  //SWITCH TO CHANNEL INPUT
            Serial.println("hi enter to get my attention and enter new channel number");
              }
           }//end of getting value/channel
        }// end of not empty string
    } // end of enter pressed  
  }// end of while serial available

blink();


}// end of loop



void blink()
{
  digitalWrite(13, HIGH);   // set the LED on
  delay(50);              // wait for a second
  digitalWrite(13, LOW);    // set the LED off
  delay(50);              // wait for a second
}

