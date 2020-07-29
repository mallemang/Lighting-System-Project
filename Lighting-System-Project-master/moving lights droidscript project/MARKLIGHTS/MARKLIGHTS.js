/*
This is the Performance part of the project.
Nov 16, 2017

Perform mode:
10 arrays are loaded from the 10 sql tables


*/



var master=134;// max brightness,  135-239 is strobe
//master = 134
var seq1=[];
var seq2=[];
var seq3=[];
var seq4=[];
var seq5=[];
var seq6=[];
var seq7=[];
var seq8=[];
var seq9=[];
var seq10=[];
	mytxt = app.ReadFile("/sdcard/buttons.txt");
	var buttontxt = mytxt.split("\n");

var index=0;
var maxindex=0;
var running = 0;
var seqinterval=0;
var colorchase=false;
//Called when application is started.
//1=pan 3=tilt,789 rgb,10=w, 6=134(shutter) 

//Called when application is started.
function OnStart()
{
     app.SetOrientation("landscape");
    layVert = app.CreateLayout( "Linear", "Vertical,FillXY" );
  layHoriz1 = app.CreateLayout( "Linear", "Horizontal" );
  layVert.AddChild( layHoriz1 );
  layHoriz2 = app.CreateLayout( "Linear", "Horizontal" );
  layVert.AddChild( layHoriz2 );
  layHoriz3 = app.CreateLayout( "Linear", "Horizontal" );
  layVert.AddChild( layHoriz3 );
 
  btn1 = app.CreateButton( buttontxt[0], 0.2, 0.3 );
  layHoriz1.AddChild( btn1 );
  btn2 = app.CreateButton( buttontxt[1], 0.2, 0.3 );
  layHoriz1.AddChild( btn2 );
  btn3 = app.CreateButton( buttontxt[2], 0.2, 0.3 );
  layHoriz1.AddChild( btn3 );
  btn4 = app.CreateButton( buttontxt[3], 0.2, 0.3 );
  layHoriz1.AddChild( btn4 );
  btn5 = app.CreateButton( buttontxt[4], 0.2, 0.3 );
  layHoriz1.AddChild( btn5 );

   
  btn6 = app.CreateButton( buttontxt[5], 0.2, 0.3 );
  layHoriz2.AddChild( btn6 );
  btn7 = app.CreateButton( buttontxt[6], 0.2, 0.3 );
  layHoriz2.AddChild( btn7 );
  btn8 = app.CreateButton( buttontxt[7], 0.2, 0.3 );
  layHoriz2.AddChild( btn8 );
  btn9 = app.CreateButton( buttontxt[8], 0.2, 0.3 );
  layHoriz2.AddChild( btn9 );
  btn10 = app.CreateToggle( "10", 0.2, 0.3 );
  layHoriz2.AddChild( btn10 );
  btnRPT = app.CreateToggle( "REPEAT",.2,.3  );
  txtBut=app.CreateText("",.3);
  txtBut.SetTextSize(25);
  layHoriz3.AddChild(txtBut);
  layHoriz3.AddChild( btnRPT );
  txtState=app.CreateText("",.3);
  txtState.SetTextSize(25);
  layHoriz3.AddChild(txtState);
  
  

	//Set function to call when button pressed.
	btn1.SetOnTouch( btn1_OnTouch );
	btn2.SetOnTouch( btn2_OnTouch );
	btn3.SetOnTouch( btn3_OnTouch );
	btn4.SetOnTouch( btn4_OnTouch );
	btn5.SetOnTouch( btn5_OnTouch );
	btn6.SetOnTouch( btn6_OnTouch );
	btn7.SetOnTouch( btn7_OnTouch );
	btn8.SetOnTouch( btn8_OnTouch );
	btn9.SetOnTouch( btn9_OnTouch );
	btn10.SetOnTouch( btn10_OnTouch );

 app.AddLayout( layVert );
   
  
    //Create Bluetooth serial object.
    bt = app.CreateBluetoothSerial();
    bt.SetOnConnect( bt_OnConnect )
 


    bt.Connect( "HC-06" );
 
 
   //Create or open a database called "MyData".  
    db = app.OpenDatabase( "MyData" );  
    ReadTable();
    
}

//Called when we are connected.
function bt_OnConnect( ok )
{
    if( ok ) 
    { 
        app.ShowPopup( "Connected!" );
    }
   else app.ShowPopup( "Failed to connect!" );
}

// button functions
// set seq no and call func to read values into seq

function btn1_OnTouch(){
seq=seq1.slice(0);
if(seq.length <1) return;
txtBut.SetText("B1");
common();
sequencer();

}
function btn2_OnTouch(){
seq=seq2.slice(0);
if(seq.length <1) return;
txtBut.SetText("B2");
common();
sequencer();
}
function btn3_OnTouch(){
seq=seq3.slice(0);
if(seq.length <1) return;
txtBut.SetText("B3");
common();
sequencer();
}
function btn4_OnTouch(){
seq=seq4.slice(0);
 if(seqinterval) clearInterval(seqinterval);
 if(seq.length <1) return;
txtBut.SetText("B4");
common();
sequencer();
}
function btn5_OnTouch(){
seq=seq5.slice(0);
if(seqinterval) clearInterval(seqinterval);
 if(seq.length <1) return;
txtBut.SetText("B5");
common();
sequencer();
}
function btn6_OnTouch(){
seq=seq6.slice(0);
if(seqinterval) clearInterval(seqinterval);
 if(seq.length <1) return;
txtBut.SetText("B6");
common();
sequencer();
}
function btn7_OnTouch(){
seq=seq7.slice(0);
if(seqinterval) clearInterval(seqinterval);
 if(seq.length <1) return;
txtBut.SetText("B7");
common();
sequencer();
}
function btn8_OnTouch(){
seq=seq8.slice(0);
if(seqinterval) clearInterval(seqinterval);
 if(seq.length <1) return;
txtBut.SetText("B8");
common();
sequencer();
}
function btn9_OnTouch(){
seq=seq9.slice(0);
if(seqinterval) clearInterval(seqinterval);
 if(seq.length <1) return;
txtBut.SetText("B9");
common();
sequencer();
}




function btn10_OnTouch(){
if(seqinterval) clearInterval(seqinterval);
 if(btn10.GetChecked()) 
{
    colorchase=true;
    txtBut.SetText("B10");

    bt.Write( "13," + 192 +"\n" );
    bt.Write( "33," + 192 +"\n" );
}
else
{
    txtBut.SetText("");

    bt.Write( "13," + 0 +"\n" );
    bt.Write( "33," + 0 +"\n" );
    bt.Write( "5," + 255 +"\n" );
    bt.Write( "25," + 255 +"\n" );
    bt.Write( "5," + 0 +"\n" );
    bt.Write( "25," + 0 +"\n" );
    colorchase=false;
}

}
/*
         step.Red=item.red;
         step.Grn = item.green;
         step.Blu = item.blue;
         step.Wht = item.white;
         step.LPan = item.panL;
         step.RPan = item.panR;
         step.LTilt = item.tiltL;
         step.RTilt = item.tiltR;
         step.Spd = item.speed;
         step.Dur = item.druation;
*/

function sequencer(){

  //  app.ShowPopup("index is now " + index);
  // SET SPEET FAST
   // app.ShowPopup(seq[index].LPan); 
 txtState.SetText((index+1) + " of "+ (maxindex+1));
 bt.Write( "5," + seq[index].Spd +"\n" );

  bt.Write( "1," + seq[index].LPan +"\n" );
  bt.Write( "3," + seq[index].LTilt +"\n" );
  bt.Write( "7," + seq[index].Red +"\n" );
  bt.Write( "8," + seq[index].Grn +"\n" );
  bt.Write( "9," + seq[index].Blu +"\n" );
  bt.Write( "10," + seq[index].Wht +"\n" );
 
 bt.Write( "25," + seq[index].Spd +"\n" );
  bt.Write( "21," + seq[index].RPan +"\n" );
  bt.Write( "23," + seq[index].RTilt +"\n" );
  bt.Write( "27," + seq[index].Red +"\n" );
  bt.Write( "28," + seq[index].Grn +"\n" );
  bt.Write( "29," + seq[index].Blu +"\n" );
  bt.Write( "30," + seq[index].Wht +"\n" );
 
  if(seqinterval) clearInterval(seqinterval);
  seqinterval = setInterval("sequencer()",seq[index].Dur);  
  if(index==maxindex)
  {
        if (btnRPT.GetChecked())
          index=0;
        else {
            clearInterval(seqinterval);
            txtState.SetText("");
        }
  }         
  else ++index;


  //app.ShowPopup("red is " + seq[index].Red);

 
}

//function to display all records 
function ReadTable()

{ 

index=0;
// for each of the 10 buttons
 for(var i=1; i<=10; ++i)
 {
    //Get all the table rows. 
//    if (i==10) app.ShowPopup("trying 10 ");
    db.ExecuteSql( "select * from table" + i + " ;", [], OnResult ); 
    
}
}

//Callback to show query results in debug.  
// this will be called for each of the 10 buttons
function OnResult( results )   
{  
    var s = "";  
    var len = results.rows.length;  
 
  ++index;// first button is index 1
//  if (index==6) app.ShowPopup("got "+ index);
  seq=[];
    for(var i = 0; i < len; i++ )   
    {  
// iterates for each event in the sequence   
        var item = results.rows.item(i)  
        s += item.id + ", " + item.red + ", " + item.green + "\n";   
   
         var step = new Object;
         step.Red = item.red;
         step.Grn = item.green;
         step.Blu = item.blue;
         step.Wht = item.white;
         step.LPan = item.panL;
         step.RPan = item.panR;
         step.LTilt = item.tiltL;
         step.RTilt = item.tiltR;
         step.Spd = item.speed;
         step.Dur = item.duration;
         seq.push(step);
    }  
    
 //  app.ShowPopup("i got " + seq.length + "items");
 switch(index){
     // button 1
       case 1:
           seq1 = seq.slice(0);
    
           break;
    // button 2 etc.
       case 2:
           seq2 = seq.slice(0);
           break;
       case 3:
           seq3 = seq.slice(0);
           break;
       case 4:
           seq4 = seq.slice(0);
           break;
       case 5:
           seq5 = seq.slice(0);
           break;
       case 6:
           seq6 = seq.slice(0);
           break;
       case 7:
           seq7 = seq.slice(0);
           break;
       case 8:
           seq8 = seq.slice(0);
           break;
       case 9:
           seq9 = seq.slice(0);
           break;
       case 10:
           seq10 = seq.slice(0);
           break;
   }
}

 function common()
 {
 bt.Write( "6," + master +"\n" );
 bt.Write( "26," + master +"\n" );
//app.ShowPopup(seq1[0].Red);
index=0;
maxindex=seq.length-1;
}
 