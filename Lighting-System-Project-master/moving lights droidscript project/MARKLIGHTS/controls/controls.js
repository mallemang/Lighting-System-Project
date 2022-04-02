/*
This is the CONTROLS app for programming the sequences
Nov 16/ 2017
jan, 2019 - fixed the sequence numbering

*/

var SeqNo;
var numentries=0;
var currentindex=1;
var seq=[];
var val;
var genInterval=0;
tablename="table" + SeqNo;

// will need to setup seq no before calling

function OnStart()
{
    app.SetOrientation("landscape");
  
  layMain = app.CreateLayout("Linear","VCenter,FillXY");
  txtSeq=app.CreateTextEdit("10");
  btnGo=app.CreateButton("Enter Button No to Program");
  btnGo.SetOnTouch(btnGo_OnTouch);
  
  layMain.AddChild(txtSeq);
  layMain.AddChild(btnGo);
  txtButtons = app.CreateText("");
  layMain.AddChild(txtButtons);
  listfreebuttons();
  
  
  
  layControls = app.CreateLayout( "Linear", "Vertical,FillXY" );
  layControls.SetVisibility("Hide");
  
  layR1 = app.CreateLayout( "Linear", "Horizontal" );
  layR1.SetMargins(0,0.02,0,0);
  tr=app.CreateText('R');
  layR1.AddChild(tr);
  skbRed = app.CreateSeekBar( 0.4 );
  skbRed.SetOnTouch( skbRed_OnTouch );
  skbRed.SetMaxRate( 100 )
  skbRed.SetRange( 255 );
  skbRed.SetValue( 0 );
  layR1.AddChild( skbRed );
  
   tg=app.CreateText('G');
  layR1.AddChild(tg);
  skbGrn = app.CreateSeekBar( 0.4 );
  skbGrn.SetOnTouch( skbGrn_OnTouch );
  skbGrn.SetMaxRate( 100 )
  skbGrn.SetRange( 255 );
  skbGrn.SetValue( 0 );
  layR1.AddChild( skbGrn );
 
 
 
   layControls.AddChild(layR1);
  
  layR2 = app.CreateLayout( "Linear", "Horizontal" );
  layR2.SetMargins(0,0.03,0,0);
  
  
   tb=app.CreateText('B');
  layR2.AddChild(tb);
  skbBlu = app.CreateSeekBar( 0.4 );
  skbBlu.SetOnTouch( skbBlu_OnTouch );
  skbBlu.SetMaxRate( 100 )
  skbBlu.SetRange( 255 );
  skbBlu.SetValue( 0 );
  layR2.AddChild( skbBlu );
  
    tw=app.CreateText('W');
  layR2.AddChild(tw);
  skbWht = app.CreateSeekBar( 0.4 );
  skbWht.SetOnTouch( skbWht_OnTouch );
  skbWht.SetMaxRate( 100 )
  skbWht.SetRange( 255 );
  skbWht.SetValue( 0 );
  layR2.AddChild( skbWht );
  
  layControls.AddChild(layR2);
  
  layR3 = app.CreateLayout( "Linear", "Horizontal" );
  
  layR3.SetMargins(0,0.03,0,0);
  tp=app.CreateText('Pn');
  layR3.AddChild(tp);
  skbLPan = app.CreateSeekBar( 0.4 );
  skbLPan.SetOnTouch( skbLPan_OnTouch );
  skbLPan.SetRange( 255 );
  skbLPan.SetValue( 0 );
  skbLPan.SetMaxRate( 100 )
  layR3.AddChild( skbLPan );
  
  btnPANSYNC = app.CreateToggle( "SYNC"  );
  layR3.AddChild( btnPANSYNC );
  btnPANSYNC.SetChecked(true);


  skbRPan = app.CreateSeekBar( 0.4 );
  skbRPan.SetOnTouch( skbRPan_OnTouch );
  skbRPan.SetRange( 255 );
  skbRPan.SetValue( 0 );
  layR3.AddChild( skbRPan );
  
   layControls.AddChild(layR3);
  
  layR4 = app.CreateLayout( "Linear", "Horizontal" );
  layR4.SetMargins(0,0.03,0,0);
  
  
   tt=app.CreateText('Tlt');
  layR4.AddChild(tt);
  skbLTilt = app.CreateSeekBar( 0.4 );
  skbLTilt.SetOnTouch( skbLTilt_OnTouch );
  skbLTilt.SetRange( 255 );
  skbLTilt.SetValue( 0 );
  skbLTilt.SetMaxRate( 100 )
  layR4.AddChild( skbLTilt );

  btnTILTSYNC = app.CreateToggle( "SYNC"  );
  layR4.AddChild( btnTILTSYNC );
  btnTILTSYNC.SetChecked(true);

  
  skbRTilt = app.CreateSeekBar( 0.4 );
  skbRTilt.SetOnTouch( skbRTilt_OnTouch );
 skbRTilt.SetRange( 255 );
  skbRTilt.SetValue( 0 );
  layR4.AddChild( skbRTilt );
 
 
  layControls.AddChild(layR4);
  
  
  layR5 = app.CreateLayout( "Linear", "Horizontal" );
  td=app.CreateText('Dur');
  layR5.AddChild(td);
  skbDur = app.CreateSeekBar( 0.4 );
  skbDur.SetOnTouch( skbDUR_OnTouch );
  skbDur.SetRange( 5000 );
  skbDur.SetValue( 1000);
  layR5.AddChild( skbDur );
 
  txtDUR = app.CreateText( "1000" );
  txtDUR.SetTextSize( 32 );
  layR5.AddChild( txtDUR );  
 
  ts=app.CreateText('Spd');
  layR5.AddChild(ts);
   skbSpd = app.CreateSeekBar( 0.35 );
   skbSpd.SetOnTouch( skbSpd_OnTouch );
  skbSpd.SetMaxRate( 100 )
  skbSpd.SetRange( 255 );
  skbSpd.SetValue( 0);
  layR5.AddChild( skbSpd );
 
  layControls.AddChild(layR5);
   
  layR6 = app.CreateLayout( "Linear", "Horizontal" );
 
  txt0=app.CreateText("Step:");
  txt1=app.CreateText("of:");
  layR6.AddChild(txt0);

  txtSTEP=app.CreateText("00");
  txtSTEP.SetTextSize( 32 );
  layR6.AddChild( txtSTEP );  
  layR6.AddChild(txt1);
  txtSTEPS=app.CreateText("00");
  txtSTEPS.SetTextSize( 32 );
  layR6.AddChild( txtSTEPS );  
  

  
   btnNEXT = app.CreateButton( "NEXT",.3 );
  layR6.AddChild( btnNEXT );
  btnNEXT.SetOnTouch(btn_NEXT);
  
  
   btnDELETE = app.CreateButton( "DELETE", .3 );
  layR6.AddChild( btnDELETE );
   btnDELETE.SetOnTouch(btn_DELETE);

  
  
  layControls.AddChild(layR6);
  
 
 
  app.AddLayout( layControls );
  app.AddLayout(layMain);
  
 
    //Create Bluetooth serial object.
    bt = app.CreateBluetoothSerial();
    bt.SetOnConnect( bt_OnConnect )
 


    bt.Connect( "HC-06" );
  
     //Get all the table rows.  
  for(val = 1; val <=10; val++)
  
//Create the tables
    db.ExecuteSql( "CREATE TABLE IF NOT EXISTS table"+val +   
        "(id integer primary key, red integer , green integer , blue integer, white integer, panL integer, panR integer, tiltL integer, tiltR integer, speed integer, duration)" );  



}

//Callback to show query results in debug.
//***************onresult

function OnResult( results )   
{  
    var s = "";  
    var len = results.rows.length;  

    numentries = len;
    
    txtSTEPS.SetText(numentries);
    txtSTEP.SetText(currentindex);
    
    seq=[];
    for(var i=0; i<len; i++) 
        {
        var item = results.rows.item(i)  
  
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
   
    if(seq.length > 0)
      {// set values for initial step
        skbRed.SetValue(seq[0].Red);
        skbGrn.SetValue(seq[0].Grn);
        skbBlu.SetValue(seq[0].Blu);
        skbWht.SetValue(seq[0].Wht);
        skbLPan.SetValue(seq[0].LPan);
        skbRPan.SetValue(seq[0].RPan);
        skbLTilt.SetValue(seq[0].LTilt);
        skbRTilt.SetValue(seq[0].RTilt);
        skbSpd.SetValue(seq[0].Spd);
        skbDUR.SetValue(seq[0].Dur);
        txtDUR.SetValue(seq[0].Dur);
             
        
      }
  

 
}

function btnGo_OnTouch()
{

layControls.Animate( "SlideFromLeft" );

//	btnBack.SetEnabled(false);
	layMain.SetVisibility( "Hide" );

SeqNo = txtSeq.GetText();
if(SeqNo < 1) app.Exit();
if(SeqNo >10) app.Exit();

tablename="table" + SeqNo;
db = app.OpenDatabase( "MyData" ); 



db.ExecuteSql( "select * from table" + SeqNo + " ;", [], OnResult ); 
genInterval = setInterval("moveheads()",500);    
 
}

//Called when we are connected.
function bt_OnConnect( ok )
{
    if( ok ) 
    { 
        app.ShowPopup( "Connected!" );
      
       
 for(var chan = 1; chan <= 14; ++chan)
  bt.Write( chan + ",0"+ "\n" );
 
 for(var chan = 21; chan <= 34; ++chan)
  bt.Write( chan + ",0"+ "\n" );
bt.Write("26,134\n");
bt.Write("6,134\n");





    }
    else app.ShowPopup( "Failed to connect!" );
}

    

function btn_DELETE()
{
    db.ExecuteSql( "DELETE FROM " + tablename + " WHERE id >=0" );  
    numentries =0;
    currentindex=1;
    txtSTEP.SetText(currentindex);
  txtSTEPS.SetText(numentries);
   
}
 function btn_NEXT()
 {
     // get values from sliders
     // update database
     
      
     var Red = parseInt(skbRed.GetValue());
     var Grn = parseInt(skbGrn.GetValue());
     var Blu = parseInt(skbBlu.GetValue());
     var Wht = parseInt(skbWht.GetValue());
     var LPan = parseInt(skbLPan.GetValue());
     var RPan = parseInt(skbRPan.GetValue());
     var LTilt = parseInt(skbLTilt.GetValue());
     var RTilt = parseInt(skbRTilt.GetValue());
     var Spd = parseInt(skbSpd.GetValue());
     var Dur = parseInt(txtDUR.GetText());
     
           // red green blue white panL  panR  tiltL  tiltR  speed,  duration 
   if(currentindex==numentries+1)  // means we are at the end
   {
   
   db.ExecuteSql( "INSERT INTO "+ tablename + " (id, red , green , blue, white, panL, panR, tiltL, tiltR, speed, duration )" +   
        " VALUES (?,?,?,?,?,?,?,?,?,?,?)", [currentindex, Red, Grn, Blu, Wht, LPan, RPan, LTilt, RTilt, Spd, Dur], null, OnError);    
   ++currentindex; ++ numentries; 
   }
   else
   {
       // update
     
          db.ExecuteSql( "UPDATE " + tablename +
    " SET red = ? , green = ? , blue = ? , white = ? , "+
    "panL = ? , panR = ? , tiltL = ? , tiltR = ? , speed = ? , duration = ? " +
    "WHERE  id = ?   ; "  , 
    [Red, Grn, Blu, Wht, LPan, RPan, LTilt, RTilt, Spd, Dur , currentindex ] , null , OnError ) ;   
   ++currentindex;
    
   }
   
  // if there are still more from the DB, then set the sliders
  // for next seq
  if(currentindex<= numentries)
  {
      
        skbRed.SetValue(seq[currentindex-1].Red);
        skbGrn.SetValue(seq[currentindex-1].Grn);
        skbBlu.SetValue(seq[currentindex-1].Blu);
        skbWht.SetValue(seq[currentindex-1].Wht);
        skbLPan.SetValue(seq[currentindex-1].LPan);
        skbRPan.SetValue(seq[currentindex-1].RPan);
        skbLTilt.SetValue(seq[currentindex-1].LTilt);
        skbRTilt.SetValue(seq[currentindex-1].RTilt);
        skbSpd.SetValue(seq[currentindex-1].Spd);
        skbDur.SetValue(seq[currentindex-1].Dur);
        txtDUR.SetText(seq[currentindex-1].Dur);
        moveheads();
  //  app.ShowPopup(entries);

  }
    
  txtSTEP.SetText(currentindex);
  txtSTEPS.SetText(numentries);
  
 }
 
   
function skbDUR_OnTouch(val)
{
 val = parseInt(val);
 txtDUR.SetText(val);
}
function skbRed_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
 bt.Write( "7," + val + "\n");
 bt.Write( "27," + val + "\n");

}
function skbGrn_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
 bt.Write( "8," + val + "\n");
 bt.Write( "28," + val + "\n");

}
function skbBlu_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
 bt.Write( "9," + val + "\n");
 bt.Write( "29," + val + "\n");

}
function skbWht_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
 bt.Write( "10," + val + "\n");
 bt.Write( "30," + val + "\n");

}
function skbSpd_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
 bt.Write( "5," + val + "\n");
 bt.Write( "25," + val + "\n");

}


 

function skbLPan_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
 bt.Write( "1," + val +"\n" );
 if(btnPANSYNC.GetChecked()) 
 {
     skbRPan.SetValue(val);
     bt.Write( "21," + val + "\n");
 }
}
function skbRPan_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
     bt.Write( "21," + val + "\n");
 }

function skbLTilt_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
 bt.Write( "3," + val +"\n" );
if(btnTILTSYNC.GetChecked()) 
{
     skbRTilt.SetValue(val); 
     bt.Write( "23," + val + "\n");
}
}

function skbRTilt_OnTouch(val)
{
 val = parseInt(val);
 if(val<6) val=0;
     bt.Write( "23," + val + "\n");

}

//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg );  
    console.log( "Error: " + msg );  
}  
function listfreebuttons()
{
db = app.OpenDatabase( "MyData" );  
var freebuttons = "free buttons: ";
var freecount=0;
for(var intTable=1; intTable <=10; intTable++)
{
    tablename = "table" + intTable;
    
  //Get all the table rows.  
    db.ExecuteSql( "select * from " + tablename + " ; ", [], function (results )
    {
       ++freecount;
       if(results.rows.length <1)
         freebuttons += freecount + ",";
       if (freecount == 10) txtButtons.SetText(freebuttons);
        });
        
  } 


}
function moveheads()
{
 
if(genInterval) clearInterval(genInterval);
bt.Write("26,134\n");
bt.Write("6,134\n");

val = skbRed.GetValue();
val = parseInt(val);
 bt.Write( "7," + val + "\n");
 bt.Write( "27," + val + "\n");
 val = skbGrn.GetValue();
val = parseInt(val);
 bt.Write( "8," + val + "\n");
 bt.Write( "28," + val + "\n");

val = skbBlu.GetValue();
val = parseInt(val);
 bt.Write( "9," + val + "\n");
 bt.Write( "29," + val + "\n");

val = skbWht.GetValue();
val = parseInt(val);
bt.Write( "10," + val + "\n");
 bt.Write( "30," + val + "\n");

val = skbSpd.GetValue();
val = parseInt(val);
 bt.Write( "5," + val + "\n");
 bt.Write( "25," + val + "\n");

val = skbLPan.GetValue();
val = parseInt(val);
 bt.Write( "1," + val +"\n" );

val = skbRPan.GetValue();
val = parseInt(val);
 bt.Write( "21," + val + "\n");

val = skbLTilt.GetValue();
val = parseInt(val);
 bt.Write( "3," + val +"\n" );

val = skbRTilt.GetValue();
val = parseInt(val);
bt.Write( "23," + val + "\n");
}
