

/**
 * ControlP5 Slider. Horizontal and vertical sliders, 
 * with and without tick marks and snap-to-tick.
 * by andreas schlegel, 2010
 */
import processing.serial.*;
import controlP5.*;
Serial port;

ControlP5 controlP5;
int myColor = color(0,0,0);

int sliderValue = 100;
int sliderTicks1 = 100;
int sliderTicks2 = 30;


void setup() {
  port = new Serial(this, Serial.list()[0], 9600);  
  size(800,600);
  controlP5 = new ControlP5(this);
  
  // add a vertical slider
 int maxval=255;
 int defval=0;
 int xpos=20;
 int xinc=50;
 int ypos=100;
 int xwidth=20;
 int yheight=100;
  controlP5.addSlider("ch1",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch2",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch3",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch4",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch5",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch6",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch7",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch8",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch9",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch10",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch11",0,maxval,defval,xpos,ypos,xwidth,yheight);
xpos+=xinc;
  controlP5.addSlider("ch12",0,maxval,defval,xpos,ypos,xwidth,yheight);


/*  // create another slider with tick marks, now without
  // default value, the initial value will be set according th
  // the value of variable sliderTicks2 then.
  controlP5.addSlider("sliderTicks1",0,255,100,400,10,100);
  Slider s1 = (Slider)controlP5.controller("sliderTicks1");
  s1.setNumberOfTickMarks(5);
  */
 
 /* 
  // add horizontal sliders
  controlP5.addSlider("sliderValue",0,255,128,200,180,100,10);
  controlP5.addSlider("sliderTicks2",0,255,128,200,220,100,10);
  Slider s2 = (Slider)controlP5.controller("sliderTicks2");
  s2.setNumberOfTickMarks(7);
  // use Slider.FIX or Slider.FLEXIBLE to change the slider handle
  // by default it is Slider.FIX
  s2.setSliderMode(Slider.FLEXIBLE);
  */
}

void draw() {
  background(127);
  
  fill(sliderValue);
  
  rect(0,0,width,100);
  
  fill(myColor);
  
  

  
  rect(0,370,width,30);
}


void ch1(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "1"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch2(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "2"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch3(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "3"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch4(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "4"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch5(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "5"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch6(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "6"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch7(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "7"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch8(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "8"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch9(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "9"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch10(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "10"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch11(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "11"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}
void ch12(float fval1) {
  String str;
int ival1=(int)fval1;
 // println("a slider event. setting backgrounds to "+ival1);
  str = "12"+","+Integer.toString(ival1)+"\n";
  port.write(str);  
 
}

