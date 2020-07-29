var SeqNo=1;
var seq=[];
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
var count = 0;
var seqno=1;



//Called when application is started.  
function OnStart()  
{  
   layi = app.CreateLayout( "linear", "VCenter,FillXY" );  
   
    
    //Create a layout with objects vertically centered.  
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );  
   
    
    skb1 = app.CreateSeekBar( 0.8 );
//    skb1.SetOnTouch( skb_OnTouch2 );
    skb1.SetRange( 255 );
    skb1.SetValue( 0 );
    lay.AddChild( skb1 );
    	
   	skb2 = app.CreateSeekBar( 0.8 );
//    skb2.SetOnTouch( skb_OnTouch2 );
    skb2.SetRange( 255 );
    skb2.SetValue( 0 );
    lay.AddChild( skb2 );

    //Create an Add button.  
    btnAdd = app.CreateButton( "Next" );  
    btnAdd.SetOnTouch( btnAdd_OnTouch );  
    lay.AddChild( btnAdd );  
      
    //Create a Remove button.  
    btnRemove = app.CreateButton( "Remove from Database", 0.6, 0.1 );  
    btnRemove.SetOnTouch( btnRemove_OnTouch );  
    lay.AddChild( btnRemove );  
      
    //Create a Delete button.  
    btnDelete = app.CreateButton( "Delete Database", 0.6, 0.1 );  
    btnDelete.SetOnTouch( btnDelete_OnTouch );  
    lay.AddChild( btnDelete );  
     txt1=app.CreateText ("hi");
    lay.AddChild( txt1);  
     txt2=app.CreateText ("theree");
    lay.AddChild( txt2);  
     btnCheck = app.CreateButton("check");
     lay.AddChild(btnCheck);
     btnCheck.SetOnTouch(btnCheck_OnTouch);
     
    //Create text box to show results.  
    txt = app.CreateText( "", 0.9, 0.4, "multiline" );  
    txt.SetMargins( 0,0.1,0,0 );  
    txt.SetBackColor( "#ff222222" );  
    txt.SetTextSize( 18 );  
    lay.AddChild( txt );  
      
    //Add layout to app.      
    app.AddLayout( lay );  
      
    //Create or open a database called "MyData".  
    db = app.OpenDatabase( "MyData" );  
      
 for( seqno=1; seqno<=10; seqno++)
 {
    //Create a table (if it does not exist already).  
    var sql1="CREATE TABLE IF NOT EXISTS ";
    var sql2=" (id integer primary key, red integer, green integer, blue integer, white integer, " +
     "panL integer, panR integer, tiltL integer, tiltR integer, speed integer, duration integer  )";
    var sqlcmd = sql1 + "table" + seqno + sql2;

    db.ExecuteSql(sqlcmd);
 }    
    //Get all the table rows.      
    DisplayAllRows(); 
}  

//Called when user touches our Add button.  
function btnAdd_OnTouch()  
{  
     val1 = parseInt(skb1.GetValue());
     val2 = parseInt(skb2.GetValue());
     //Add some data (with error handler).  
    db.ExecuteSql( "INSERT INTO table1 (red , green)" +   
        " VALUES (?,?)", [val1, val2], null, OnError );  

    //Get all the table rows.      
    DisplayAllRows();  
    
   
    
}  

function btnCheck_OnTouch()
{
  //   txt1.SetText(  seq1[0].red); 
   txt2.SetText(  seq2[0].red); 
    
}

//Called when user touches our Remove button.  
function btnRemove_OnTouch()  
{      
    //Remove data.  
    db.ExecuteSql( "DELETE FROM table1 WHERE id >=1" );  

    //Get all the table rows.      
    DisplayAllRows();  
}  

//Called when user touches our Delete button.  
function btnDelete_OnTouch()  
{      
   //Delete this database.  
   db.Delete();  

   //Get all the table rows.  
   DisplayAllRows(); 
}  

//function to display all records 
function DisplayAllRows() 
{ 
    txt.SetText("");  
 
 
    SeqNo=1;
 /*   
    //Get all the table rows.  
    var result = db.ExecuteSql( "select * from table" + SeqNo + " ;", [], ); 
txt1.SetText(result.rows.length);
   
   for(var i=0; i<seq.length; i++)
     seq1[i] = seq[i];
     
     SeqNo=2;

   for(var i=0; i<seq.length; i++)
     seq2[i] = seq[i];
    
   
    //Get all the table rows.  
    db.ExecuteSql( "select * from table" + SeqNo + " ;", [], OnResult ); 
// txt2.SetText(seq.length);
   
 
    
//app.ShowPopup(  seq2[0].red);
   */ 
} 

//Callback to show query results in debug.  
function OnResult( results )   
{  
    var s = "";  
    var len = results.rows.length; 
 //   app.ShowPopup(len);
    for(var i = 0; i < len; i++ )   
    {  
   
        var item = results.rows.item(i)  
        s += item.id + ", " + item.red + ", " + item.green + "\n";   
   
         var step = new Object;
         step.red=item.red;
         step.grn = item.green;
         seq.push(step);
     
    }  
    txt.SetText( s );  
  //app.ShowPopup("i got " + seqs.length + "items");
 //txt1.SetText(seq.length);

}  

//Callback to show errors.  
function OnError( msg )   
{  
    app.Alert( "Error: " + msg );  
    console.log( "Error: " + msg );  
}  