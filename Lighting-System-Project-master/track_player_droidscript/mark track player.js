var  lights = [
      {
    "Time":0.0,
        "Red":false,
        "Blue":false,
        "Yellow":false,
        "Green":false,
        "Strobe":false
}]
    // laySets first runs to allow chosing a set
// then lay runs.
//var path = "/sdcard/music"
var file = "pathfile";
var path = app.LoadText( "folder", "", file );
var prog   // the time in the song in seconds
var nextTime = 0.0
var lastIndex=0 // used for maintaining file highlighting
var gindex = 0 // global song index
var seqIndex = 0
var numSongs = 0  // number of songs in set
var lightFileFound = false



//Called when application is started.
function OnStart()
{
app.ShowPopup( path );
    //Create media player.
	player = app.CreateMediaPlayer()
	player.SetOnReady( player_OnReady )
	player.SetOnComplete( player_OnComplete )
    
    // setup respond to media player bt key
    app.SetOnKey(whatkey);
	
	app.SetOrientation("portrait");
  
	//Create two layout with objects vertically centered.
	laySets = app.CreateLayout( "Linear", "VCenter,FillXY" )
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )
    lay.SetVisibility("Hide");
	
	//Add layouts to app.	
	app.AddLayout( laySets )
    app.AddLayout( lay );
 
    // create the list for the sets files
    lstSets = app.AddList( laySets,"[No sets found]",0.5,0.75 );
    lstSets.SetSize( 0.75, -1 )
	lstSets.SetOnTouch( lstSet_OnTouch )
	laySets.AddChild( lstSets)
	
	arrSets = app.ListFolder(path,".set")
	lstSets.SetList(arrSets)
	lstSets.SetItemColorByIndex(0,"normal","Gray")
	
    lstSongs = app.AddList(lay,"[No Songs Found]",0.5,0.65)
    lstSongs.SetSize( 0.75, -1 )
	lstSongs.SetOnTouch( lstSong_OnTouch )
	lay.AddChild( lstSongs)
	
    

//Create Play button.
	btnPlay = app.CreateButton( "Play", 0.4, 0.08 )
	btnPlay.SetMargins( 0, 0.05, 0, 0 )
	btnPlay.SetOnTouch( btnPlay_OnTouch )
	lay.AddChild( btnPlay )


	//Create seek bar and add to layout.
	skb = app.CreateSeekBar( 0.8, -1 )
	skb.SetMargins( 0, 0.05, 0, 0 )
	skb.SetRange( 1.0 )
	skb.SetOnTouch( skb_OnTouch )
	lay.AddChild( skb )
	


	//Create Bluetooth serial object.
    bt = app.CreateBluetoothSerial();
    bt.SetOnConnect( bt_OnConnect )
 


    bt.Connect( "BT04-A" );
  
  
  
	
}
function whatkey(action,name,code,dunno)
{
    
  if (name == "MEDIA_PLAY_PAUSE" && action == "Up") btnPlay_OnTouch()
}

  //Called when we are connected.

function bt_OnConnect( ok )
{
    if( ok ) 
    { 
        app.ShowPopup( "Connected!" );
      
       

    bt.Write("a,b,c,d,s\n");





    }
    else app.ShowPopup( "Failed to connect!" );

}	
function lstSet_OnTouch(item,body,icon,index)
// a set has been chosen
{
    strSetFile = path + "/" + item
    lay.Animate( "SlideFromLeft" );
	laySets.SetVisibility( "Hide" );
	
    // load the list of songs from the set into the list
    strSongs = app.ReadFile(strSetFile)
    lstSongs.SetList(strSongs,"\n")
    numSongs = lstSongs.GetLength()
    
    app.ShowPopup("there are " + numSongs + " songs")
    
    // load the first file into player
    var item = lstSongs.GetItemByIndex(0).title
    gindex = 0
    player.SetFile( path + "/" + item)
    
	
	dur = null;
	lstSongs.SetItemColorByIndex( 0, "Normal","Gray" )    
    btnPlay.SetText("Play")

// load light control file if it exists for first song
	load_lights(item)
	
	//Start timer to update 100 ms period
	setInterval( "Update()", 100 )
}

function lstSong_OnTouch(item,body,icon,index)
{
    // song has been chosen
   player.SetFile(path + "/" + item)
   lstSongs.SetItemColorByIndex(lastIndex,"normal","Black")
   lstSongs.SetItemColorByIndex(index,"normal","Gray")
   lastIndex = index
    gindex = index
   btnPlay.SetText("Play")
    load_lights(item)
} 


//******************************************

function load_lights(item)
{
// initialize for new song
  lights_off()
  lights = [
      {
    "Time":0.0,
        "Red":false,
        "Blue":false,
        "Yellow":false,
        "Green":false,
        "Strobe":false
}]

   seqIndex = 0 // start at beginning of sequence
   nextTime = 0.00 // default

   // load a light control file if it exists
   var f=item.slice(0,-4)
   f=path+"/"+f+".json"
   if (app.FileExists(f))
   {
//        app.Alert("light control file found")
        fileContents = app.ReadFile(f)
        lights = JSON.parse(fileContents)
        seqIndex = 0 // start at beginning of sequence
        if (lights.length > 1)
            nextTime = lights[1].Time ;
   
    }
    else app.ShowPopup("no light control file")		
}
//Called when file is ready to play.
function player_OnReady()
{
	//Get file duration.
	dur = player.GetDuration()
//	app.ShowPopup( "Ready" )
	
}

function loadSet()
{
   
}


function btnPlay_OnTouch() 
{
    if (player.IsPlaying()) 
    {
        player.Pause()
        btnPlay.SetText("Play")
    }
    else
    {
        player.Play()
        btnPlay.SetText("Pause")
    }
    
}

function player_OnComplete()
{
app.ShowPopup( "Finished" )
// choose next song

if (numSongs > gindex + 1)
{
    app.ShowPopup("advancing to next song")
    ++ gindex
    var item = lstSongs.GetItemByIndex(gindex).title
    player.SetFile( path + "/" + item)

   lstSongs.SetItemColorByIndex(lastIndex,"normal","Black")
   lstSongs.SetItemColorByIndex(gindex,"normal","Gray")
   lastIndex = gindex
   btnPlay.SetText("Play")
    load_lights(item)
}



}

//Update light control
function Update()
{
	prog = player.GetPosition()
	if( dur ) skb.SetValue( prog / dur )
	
		
	
//	txt.SetText(prog)
	if (player.IsPlaying()) 
	{
	    if (nextTime>0) // we are awaiting a time
	    {
	        if( prog >= nextTime) ///we've hit the time
	        {
	           send_bt()
                app.ShowPopup( "set lights at " + prog )
	            // is there another step in seq?
	            if (lights.length > seqIndex+1)
	            {
	                
	                seqIndex += 1
	                nextTime = lights[seqIndex].Time
	               
	            }
	            else nextTime = -1  // no more light commands
	        }
	    }
    }
}
function send_bt(){
    var s=""
    
    if (lights[seqIndex].Red)  s+="A,"
    else s+="a,"
    if (lights[seqIndex].Blue)  s+="B,"
    else s+="b,"
    if (lights[seqIndex].Yellow)  s+="C,"
    else s+="c,"
    if (lights[seqIndex].Green)  s+="D,"
    else s+="d,"
    if (lights[seqIndex].Strobe)  s+="S,"
    else s+="s,"
    s+="\n"
    bt.Write(s)
    
    

}
function lights_off(){
 var s="a,b,c,d,s,\n";
bt.Write(s); 
    
}


//Called when user touches the seek bar.
function skb_OnTouch( value )
{  
	player.SeekTo( dur * value )
}


