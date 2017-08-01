/* DMX Shift Out for arduino - 004 and 005
 * -------------
 *
 * Shifts data in DMX format out to DMX enabled devices
 * it is extremely restrictive in terms of timing. Therefore
 * the program will stop the interrupts when sending data
 *
 * The elektronic foundation for DMX is RS 485, so you have to use
 * a MAX-485 or a 75176.
 *
 * wirring for sending dmx with a MAX-485

 1 - RO  - Receiver Output --- set to ground with a 100 ohm resistor
 2 - RE  - Receiver Output Enable -- set to ground
 3 - DE  - Driver Output Enable -- set to 5v
 4 - DI  - Driver Input -- Input from Arduino
 5 - GnD - Ground Connection -- set to ground -- refence for the DMX singal --- (DMX pin 1)
 6 - A   - Driver Output / Receiver Input -- DMX Signal (hot)------------------ (DMX pin 3)
 7 - B   - Driver Output / Receiver Input -- DMX Signal inversion ( cold)------ (DMX pin 2)
 8 - Vcc - Positive Supply -- 4,75V < Vcc < 5,25V

 * Every dmx packet contains 512 bytes of information (for 512 channels).
 * The start of each packet is market by a start byte (shiftDmxOut(sig,0);),
 * you should always send all 512 bytes even if you don*t use all 512 channels.
 * The time between every dmx packet is market by a break
 * between 88us and 1s ( digitalWrite(sig, LOW); delay(10);)
 *
 * (cleft) 2006 by Tomek Ness and D. Cuartielles
 * K3 - School of Arts and Communication
 * fhp - University of Applied Sciences
 * <http://www.arduino.cc>
 * <http://www.mah.se/k3>
 * <http://www.design.fh-potsdam.de>
 *
 * @date: 2006-09-30
 * @idea: Tomek Ness
 * @code: D. Cuartielles and Tomek Ness
 * @acknowledgements: Johny Lowgren for his DMX devices
 *
 */


int sig = 3;
#define ledPin 13
int count = 0;
int swing = 0;
int updown = 0;

#include "pins_arduino.h";

int port_to_output[] = {
  NOT_A_PORT,
  NOT_A_PORT,
  _SFR_IO_ADDR(PORTB),
  _SFR_IO_ADDR(PORTC),
  _SFR_IO_ADDR(PORTD)
  };

  int value = 0;
int valueadd = 3;

/* Sends a DMX byte out on a pin.  Assumes a 16 MHz clock.
 * Disables interrupts, which will disrupt the millis() function if used
 * too frequently. */


void shiftDmxOut(int pin, int theByte)
{
  int wasteTime = 0;
  int theDelay = 1;
  int count = 0;
 
  // the first thing we do is to write te pin to high
  // it will be the mark between bytes. It may be also
  // high from before
  digitalWrite(pin, HIGH);
  delayMicroseconds(10);

  // disable interrupts, otherwise the timer 0 overflow interrupt that
  // tracks milliseconds will make us delay longer than we want.
  cli();

  // DMX starts with a start-bit that must always be zero
 digitalWrite(pin, LOW);
 
  // we need a delay of 4us (then one bit is transferred)
  // this seems more stable then using delayMicroseconds
  asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");
  asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");

  asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");
  asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");

  asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");
  asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");

  for (count = 0; count < 8; count++) {

    if (theByte & 01) {
 digitalWrite(pin, HIGH);
     }
    else {
 digitalWrite(pin, LOW);
     }

    asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");
    asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");

    asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");
    asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");

    asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");
    asm("nop\n nop\n nop\n nop\n nop\n nop\n nop\n nop\n");
    // to write every bit exactly 4 microseconds, we have to waste some time here.
    //thats why we are doing a for loop with nothing to do, a delayMicroseonds is not smal enough
    //for (wasteTime =0; wasteTime <2; wasteTime++) {}


    theByte>>=1;
  }

  // the last thing we do is to write the pin to high
  // it will be the mark between bytes. (this break is have to be between 8 us and 1 sec)
 digitalWrite(pin, HIGH);
 
  // reenable interrupts.
  sei();
}

void setup() {

  Serial.begin(9600);	  // initialize serial communications

  pinMode(sig, OUTPUT);
  pinMode(13,OUTPUT);
  digitalWrite(13, HIGH);
  digitalWrite(sig, HIGH);
}

void loop()  {

  // sending the break (the break can be between 88us and 1sec)
  int i;
  for(i=1;i<=4;i++){		// LED boot sequence -- blinks 4 times
    digitalWrite(ledPin, HIGH);
    delay(50);
    digitalWrite(ledPin, LOW);
    delay(50);
  }
  while(1){



  //  if (Serial.available() > 0) 
        {
//	int value1 = Serial.read();

    /***** sending the dmx signal *****/
    // sending the break (the break can be between 88us and 1sec)
    digitalWrite(sig, LOW);
    delay(100);
        int value1 = 1;
         int value2=200;
	// sending the start byte
	shiftDmxOut(sig, 0);
        // data bytes
	shiftDmxOut(sig, value1); //1
	shiftDmxOut(sig, value2); //2
	shiftDmxOut(sig, value2); //3
	shiftDmxOut(sig, value2); //4
        shiftDmxOut(sig, value2); //5
        shiftDmxOut(sig, value2); //6

	for (count = 7; count<=512; count++)
        {  //the rest
	  shiftDmxOut(sig, value2);
	}
    }
  }
} 

