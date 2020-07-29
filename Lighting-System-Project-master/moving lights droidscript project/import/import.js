
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
   
   
// for each of the 10 tables
for (var num = 1; num <=10; num++)
{
  var tablename = 'table' + num;
  //Create the tables
    db.ExecuteSql( "CREATE TABLE IF NOT EXISTS " + tablename +   
        "(id integer primary key, red integer , green integer , blue integer, white integer, panL integer, panR integer, tiltL integer, tiltR integer, speed integer, duration)" );  



  db.ExecuteSql( "DELETE FROM " + tablename + " WHERE id >=0" ); 

	var mytxt = app.ReadFile("/sdcard/" + tablename +".txt");
    
	var mylines = mytxt.split("\n");
    var numlines = mylines.length;
 //   app.ShowPopup(tablename);
    currentindex = 0;
    for(linenum = 0; linenum <  numlines; ++linenum)
    {
        var line = mylines[linenum];
        var items = line.split(",");
        var currentindex = parseInt(items[0]);
        var Red = parseInt(items[1]);
        var Grn = parseInt(items[2]);
        var Blu = parseInt(items[3]);
        var Wht = parseInt(items[4]);
        var LPan = parseInt(items[5]);
        var RPan = parseInt(items[6]);
        var LTilt = parseInt(items[7]);
        var RTilt = parseInt(items[8]);
        var Spd = parseInt(items[9]);
        var Dur = parseInt(items[10]);
    if (currentindex>0)   
    db.ExecuteSql( "INSERT INTO "+ tablename + " (id, red , green , blue, white, panL, panR, tiltL, tiltR, speed, duration )" +   
        " VALUES (?,?,?,?,?,?,?,?,?,?,?)", [currentindex, Red, Grn, Blu, Wht, LPan, RPan, LTilt, RTilt, Spd, Dur], null, OnError);    
	}
   
}// 10 tables
app.ShowPopup('importing data please wait');

}
//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg );  
    console.log( "Error: " + msg );  
}  