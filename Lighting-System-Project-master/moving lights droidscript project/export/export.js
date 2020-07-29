
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
var index=0;
//Called when application is started.
function OnStart()
{
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "linear", "VCenter,FillXY" );	

	//Create a text label and add it to layout.
	txt = app.CreateText( "Hello" );
	txt.SetTextSize( 32 );
	lay.AddChild( txt );
	
	//Add layout to app.	
	app.AddLayout( lay );

  db = app.OpenDatabase( "MyData" );  
   
index=0;

// for each of the 10 buttons
 for(var i=1; i<=10; ++i)
 {
    //Get all the table rows.  
    db.ExecuteSql( "select * from table" + i + " ;", [], OnResult ); 
    
}
//app.ShowPopup("done calling sql");
}


//Callback to show query results in debug.  
// this will be called for each of the 10 buttons
function OnResult( results )   
{  
    var s = "";  
    var len = results.rows.length;  
 
  ++index;// first button is index 1
  seq=[];
  
    for(var i = 0; i < len; i++ )   
    {  
// iterates for each event in the sequence   
        var item = results.rows.item(i)  
        s += item.id + ", " 
        + item.red + ", " 
        + item.green +","
        + item.blue +","
        + item.white +","
        + item.panL +","
        + item.panR +","
        + item.tiltL +","
        + item.tiltR +","
        + item.speed +","
        + item.duration + "\n";   
        
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
        app.WriteFile("/sdcard/table1.txt",s,"Write");
        seq1 = seq.slice(0);
    
           break;
    // button 2 etc.
       case 2:
              app.WriteFile("/sdcard/table2.txt",s,"Write");
           seq2 = seq.slice(0);
           break;
       case 3:
              app.WriteFile("/sdcard/table3.txt",s,"Write");
           seq3 = seq.slice(0);
           break;
       case 4:
              app.WriteFile("/sdcard/table4.txt",s,"Write");
           seq4 = seq.slice(0);
           break;
       case 5:
              app.WriteFile("/sdcard/table5.txt",s,"Write");
           seq5 = seq.slice(0);
           break;
       case 6:
              app.WriteFile("/sdcard/table6.txt",s,"Write");
           seq6 = seq.slice(0);
           break;
       case 7:
              app.WriteFile("/sdcard/table7.txt",s,"Write");
           seq7 = seq.slice(0);
           break;
       case 8:
              app.WriteFile("/sdcard/table8.txt",s,"Write");
           seq8 = seq.slice(0);
           break;
       case 9:
              app.WriteFile("/sdcard/table9.txt",s,"Write");
           seq9 = seq.slice(0);
           break;
       case 10:
             app.WriteFile("/sdcard/table10.txt",s,"Write");
           seq10 = seq.slice(0);
           break;
   }
   app.ShowPopup('exporting data please wait');
}
