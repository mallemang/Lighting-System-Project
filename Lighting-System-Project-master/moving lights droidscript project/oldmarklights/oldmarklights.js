var master=134;
//master = 134
var wpa=[];
var wpb=[];
var wpc=[];
var index=0;
var maxindex=0;
var running = 0;
var seqinterval=0;
var colorchase=false;
//Called when application is started.
//1=pan 3=tilt,789 rgb,10=w, 6=134(shutter) 
wpa[0] = {
 R:255,G:0,B:0,W:0,posxL:84,posxR:84,posy:0,dur:2000
} ;  

wpa[1] = {
 R:0,G:0,B:0,W:255,posxL:84,posxR:84,posy:128,dur:2000
} ;  
wpa[2] = {
 R:0,G:0,B:0,W:0,posxL:84,posxR:84,posy:128,dur:200
};   

    wpb[0]={
    R:0,G:0,B:0,W:255,posxL:126,posxR:42,posy:0,dur:1000
};
    wpb[1]={
    R:0,G:0,B:0,W:255,posxL:126,posxR:42,posy:255,dur:1000
};
    wpb[2]={
    R:0,G:0,B:0,W:255,posxL:126,posxR:42,posy:0,dur:1000
};
    wpb[3]={
    R:0,G:0,B:0,W:255,posxL:126,posxR:42,posy:255,dur:1000
};

    wpc[0]={
    R:0,G:0,B:0,W:255,posxL:84,posxR:84,posy:0,dur:1000
};
    wpc[1]={
    R:0,G:0,B:0,W:255,posxL:20,posxR:146,posy:60,dur:1000
};
 

//Called when application is started.
function OnStart()
{
   
    layVert = app.CreateLayout( "Linear", "Vertical,FillXY" );
  layHoriz1 = app.CreateLayout( "Linear", "Horizontal" );
  layVert.AddChild( layHoriz1 );
  layHoriz2 = app.CreateLayout( "Linear", "Horizontal" );
  layVert.AddChild( layHoriz2 );
 
  btnA = app.CreateButton( "A", 0.3, 0.5 );
  layHoriz1.AddChild( btnA );
  btnB = app.CreateButton( "B", 0.3, 0.5 );
  layHoriz1.AddChild( btnB );
  btnC = app.CreateButton( "C", 0.3, 0.5 );
  layHoriz1.AddChild( btnC );

  btnD = app.CreateButton( "D", 0.3, 0.5 );
  layHoriz2.AddChild( btnD );
  btnE = app.CreateButton( "E", 0.3, 0.5 );
  layHoriz2.AddChild( btnE );
  btnF = app.CreateButton( "COLOR CHASE", 0.3, 0.5 );
  layHoriz2.AddChild( btnF );

	//Set function to call when button pressed.
	btnA.SetOnTouch( btnA_OnTouch );
	btnB.SetOnTouch( btnB_OnTouch );
	btnC.SetOnTouch( btnC_OnTouch );
	btnF.SetOnTouch( btnF_OnTouch );



 app.AddLayout( layVert );
   
  
    //Create Bluetooth serial object.
    bt = app.CreateBluetoothSerial();
    bt.SetOnConnect( bt_OnConnect )
 


    bt.Connect( "HC-06" );

}

//Called when we are connected.
function bt_OnConnect( ok )
{
    if( ok ) 
    { 
        bt.Write( "digitalWrite(LED1,1);\n" );
        app.ShowPopup( "Connected!" );
    }
    else app.ShowPopup( "Failed to connect!" );
}

function btnA_OnTouch(){
    
bt.Write( "6," + master +"\n" );
bt.Write( "26," + master +"\n" );

seq=wpa;
index=0;
maxindex=seq.length-1;
//app.ShowPopup("indexmax is " + maxindex);
sequencer();
}
function btnB_OnTouch(){
bt.Write( "6," + master +"\n" );
bt.Write( "26," + master +"\n" );

seq=wpb;
index=0;
maxindex=seq.length-1;
sequencer();
}
function btnC_OnTouch(){
bt.Write( "6," + master +"\n" );
bt.Write( "26," + master +"\n" );

seq=wpc;
index=0;
maxindex=seq.length-1;
sequencer();
}

function btnF_OnTouch(){
if(colorchase) 
{
    bt.Write( "13," + 0 +"\n" );
    bt.Write( "33," + 0 +"\n" );
    bt.Write( "5," + 255 +"\n" );
    bt.Write( "25," + 255 +"\n" );
    bt.Write( "5," + 0 +"\n" );
    bt.Write( "25," + 0 +"\n" );
    colorchase=false;
}
else
{
    colorchase=true;
    bt.Write( "13," + 255 +"\n" );
    bt.Write( "33," + 255 +"\n" );
}

}


function sequencer(){

  //  app.ShowPopup("index is now " + index);
  // SET SPEET FAST
    
  bt.Write( "1," + seq[index].posxL +"\n" );
  bt.Write( "3," + seq[index].posy +"\n" );
  bt.Write( "7," + seq[index].R +"\n" );
  bt.Write( "8," + seq[index].G +"\n" );
  bt.Write( "9," + seq[index].B +"\n" );
  bt.Write( "10," + seq[index].W +"\n" );


  bt.Write( "21," + seq[index].posxR +"\n" );
  bt.Write( "23," + seq[index].posy +"\n" );
  bt.Write( "27," + seq[index].R +"\n" );
  bt.Write( "28," + seq[index].G +"\n" );
  bt.Write( "29," + seq[index].B +"\n" );
  bt.Write( "30," + seq[index].W +"\n" );
 
  

  ++index;
    if(index>maxindex) {
   //     alert("clearing interval");
        clearInterval(seqinterval);

    }
    else {
        if(seqinterval) clearInterval(seqinterval);
        seqinterval = setInterval("sequencer()",seq[index-1].dur);  
    }        




}
