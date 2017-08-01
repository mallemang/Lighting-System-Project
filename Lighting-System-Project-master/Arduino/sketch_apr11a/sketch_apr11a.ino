// program to control led cube Mark Allemang april 11/2012

void clearanodes()
{
for(int pin=2; pin<=7; ++pin)
  digitalWrite(pin,LOW);
}

void clearcathodes()
{
for(int pin=8; pin<=13; ++pin)
  digitalWrite(pin,HIGH);
}



void setup() {
for(int pin=2; pin<=13; ++pin)
  pinMode(pin, OUTPUT); 

// set all anode control low and all cathode control high
clearanodes();
clearcathodes();

}


void loop()
{
/* to turn on top top LED r1/c1 need 
D2 high to select group of first 4 anodes
D4 High to supply +5 to a1/a5
D8 high to select group of first 4 cathodes
D10 low to pull 
*/
digitalWrite(2,HIGH);
digitalWrite(4,HIGH);
digitalWrite(8,LOW);
digitalWrite(10,LOW);
delay(2000);
/*
clearanodes();
clearcathodes();

// move to next anode across the row

digitalWrite(2,HIGH);
digitalWrite(5,HIGH);// this guy
digitalWrite(8,LOW);
digitalWrite(10,LOW);

delay(2000);

clearanodes();
clearcathodes();
*/

}
