  lights = [
      {
    "Time":0.0,
        "Red":false,
        "Blue":false,
        "Yellow":false,
        "Green":false,
        "Strobe":false
        
}]
var prog =0   // the time in seconds
//var path = "/sdcard/music/ab"
//var path = "/sdcard/music"
var file = "pathfile";
var path = app.LoadText( "folder", "", file );var lastIndex=0 // used for managing file highlighting
var overWrite = false  // user wants to create a new sequence
var nextTime = 0.00  // (seqIndex+1 is used if the record exists).
var seqIndex = 0 // playback - need current (light status) next record (next time to fire).
var dur = null

//Called when application is started.
function OnStart()
{
  
    app.SetOrientation("landscape")
app.ShowPopup( path );
    layLights =  app.CreateLayout( "Linear", "VCenter,FillXY" )
    layHoriz1 = app.CreateLayout( "Linear", "Horizontal" )
    layHoriz2 = app.CreateLayout( "Linear", "Horizontal" )
    layHoriz3 = app.CreateLayout( "Linear", "Horizontal" )
    layLights.AddChild(layHoriz1)
    layLights.AddChild(layHoriz2)
    layLights.AddChild(layHoriz3)

	//Add layout to app.	
	app.AddLayout( layLights )


    btnRed = app.CreateButton("Red",.24,.3)
    layHoriz1.AddChild(btnRed)
    btnBlue = app.CreateButton("Blue",.24,.3)
    layHoriz1.AddChild(btnBlue)
    btnYellow = app.CreateButton("Yellow",.24,.3)
    layHoriz1.AddChild(btnYellow)
    btnGreen = app.CreateButton("Green",.24,.3)
    layHoriz1.AddChild(btnGreen)
    
    tglRed = app.CreateToggle("Red",.24,.3)
    layHoriz2.AddChild(tglRed)
    tglBlue = app.CreateToggle("Blue",.24,.3)
    layHoriz2.AddChild(tglBlue)
    tglYellow = app.CreateToggle("Yellow",.24,.3)
    layHoriz2.AddChild(tglYellow)
    tglGreen = app.CreateToggle("Green",.24,.3)
    layHoriz2.AddChild(tglGreen)

	//Create a text label and add it to layout.
	btnLoadSong = app.CreateButton( "Load Song" )
	layHoriz3.AddChild( btnLoadSong )
	btnLoadSong.SetOnTouch(btnLoadSong_onTouch)
	
		//Create Play button.
	btnPlay = app.CreateButton( "Play",.2)
	btnPlay.SetOnTouch( btnPlay_OnTouch )
	layHoriz3.AddChild( btnPlay ) 
	
	
	txt=app.CreateText("0.00",0.15)
	layHoriz3.AddChild(txt)
	
	btnSave = app.CreateButton("Save")
	layHoriz3.AddChild( btnSave ) 
	btnSave.SetOnTouch(btnSave_onTouch)
	
	tglStrobe = app.CreateToggle("Strobe",.15)
	layHoriz3.AddChild( tglStrobe ) 
	tglStrobe.SetOnTouch(tglStrobe_onTouch)
	
	
    btnRed.SetOnTouch(btnRed_onTouch)
    btnBlue.SetOnTouch(btnBlue_onTouch)
    btnYellow.SetOnTouch(btnYellow_onTouch)
    btnGreen.SetOnTouch(btnGreen_onTouch)

    tglRed.SetOnTouch(tglRed_onTouch)
    tglBlue.SetOnTouch(tglBlue_onTouch)
    tglYellow.SetOnTouch(tglYellow_onTouch)
    tglGreen.SetOnTouch(tglGreen_onTouch)

	//Start timer to update time  every 100 mili second.
	setInterval( "Update()", 100 )
	
	
// **********************initialize music part

	layMusic = app.CreateLayout( "Linear", "FillXY,VCenter" )
    layMusic.SetVisibility("Hide");	
	//Add main layout to app.
	app.AddLayout( layMusic )

	//Create music list.
//	spin = app.CreateSpinner( "[No tracks found]" )
    spin = app.AddList( layMusic,"[No tracks found]",0.5,0.75 );
	spin.SetSize( 0.75, -1 )
	spin.SetOnTouch( spn_OnTouch )
	layMusic.AddChild( spin )
	
	//Create seek bar and add to layout.
	skb = app.CreateSeekBar( 0.8, -1 )
	skb.SetMargins( 0, 0.05, 0, 0 )
	skb.SetRange( 1.0 )
	skb.SetOnTouch( skb_OnTouch )
	layLights.AddChild( skb )
	
	
	//Create media player.
	player = app.CreateMediaPlayer()
	player.SetOnReady( player_OnReady )
	player.SetOnComplete( player_OnComplete )
	
	//Find mp3 files on internal sdcard .
	// mp3List is an array
	mp3List = app.ListFolder( path, ".mp3" )
	mp3List.sort()
	spin.SetList( mp3List )
	spin.SetBackColor("Black")
	
	//Load the first file found.
    player.SetFile( path + "/" + spin.GetItemByIndex(0).title);
	dur = null;
	spin.SetItemColorByIndex( 0, "Normal","Gray" )

 //Create Bluetooth serial object.
    bt = app.CreateBluetoothSerial();
    bt.SetOnConnect( bt_OnConnect )
 


    bt.Connect( "BT04-A" );
  
  
  
	
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

    

function btnRed_onTouch(){
    clearToggles()
    tglRed.SetChecked(true)
    getLights()
}

function btnBlue_onTouch(){
   clearToggles()
   tglBlue.SetChecked(true)
    getLights()
    
}


function btnYellow_onTouch(){
   clearToggles()
   tglYellow.SetChecked(true)
    getLights()
    
}


function btnGreen_onTouch(){
   clearToggles()
   tglGreen.SetChecked(true)
    getLights()
    

}


function tglRed_onTouch(){
    getLights()

}

function tglBlue_onTouch(){
    getLights()

}

function tglYellow_onTouch(){
    getLights()

}

function tglGreen_onTouch(){
    getLights()

}

function clearToggles(){
tglRed.SetChecked(false)
tglBlue.SetChecked(false)
tglYellow.SetChecked(false)
tglGreen.SetChecked(false)

}

function btnLoadSong_onTouch(){
  
  layMusic.SetVisibility("Show");	 
  layLights.SetVisibility("Hide");	 
 // initialize the structures
  lights = [
      {
    "Time":0.0,
        "Red":false,
        "Blue":false,
        "Yellow":false,
        "Green":false,
        "Strobe":false
        
}]
 nextTime = 0.00  // (seqIndex+1 is used if the record exists).
 seqIndex = 0 // playback - need current (light status) next record (next time to fire).

 
  
}

// this function adds a new record to the light sequence.
// its called whenever a light button is pushed

function getLights()
{
    if (overWrite && player.IsPlaying()) // user has hit button and we are building sequence
    {
        lights.push(
        {
             "Time":prog,
                "Red":tglRed.GetChecked(),
                "Blue":tglBlue.GetChecked(),
                "Yellow":tglYellow.GetChecked(),
                "Green":tglGreen.GetChecked(),
                "Strobe":tglStrobe.GetChecked(),
        });
          app.ShowPopup(lights.length)      
        

    }
    send_bt()
    
  
 
}
//Handle Play button.
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




//Called when file is ready to play.
function player_OnReady()
{
	//Get file duration.
	dur = player.GetDuration()
//	app.ShowPopup( "Ready" )
}

//Called when playback has finished.
function player_OnComplete()
{
	app.ShowPopup( "Finished" )
	clearToggles()
	send_bt()
	// if we are programming lights...save the data
	if (overWrite)btnSave_onTouch()
	
	
}

//Handle file select.
//******************************************************************************
// here is the music song selection  part
//Demo of a simple media player.
//Note: This example expects some mp3 files to exist
//in the /sdcard/music folder

function spn_OnTouch( item,body,icon,index )
{
	player.SetFile( path + "/"	 + item )
    
	spin.SetItemColorByIndex( lastIndex, "Normal","Black" )	
	spin.SetItemColorByIndex( index, "Normal","Gray" )

    clearToggles() 
// see if a song.json file exists
// get name of the file less the .mp3
    f=item.slice(0,-4)
    f=path + "/" + f + ".json"
    overWrite = true  // default
    if (app.FileExists(f))
    {
        
        ans=prompt("a file exists for lights, do you want to overwrite it?")
        if (ans == null)  // no
        {
            overWrite = false // gonna do playback rather than record new seq
            fileContents = app.ReadFile(f)
            lights = JSON.parse(fileContents)
            seqIndex = 0 // start at beginning of sequence
            if (lights.length > 1)
                nextTime = lights[1].Time ;
            else nextTime = 0.00
            
            
            app.Alert("next time is " + nextTime)
        }
        else  // gonna record sequence
        {
            
            
            // setup new lights array
            lights = [
                  {
                "Time":0.0,
                    "Red":false,
                    "Blue":false,
                    "Yellow":false,
                    "Green":false,
                    "Strobe":false
            }];
            
        }
    }
    
	
	
	lastIndex = index  // song index
	btnPlay.SetText("Play")
	layMusic.SetVisibility("Hide");	 
    layLights.SetVisibility("Show");
    
    
}
function btnSave_onTouch(){
 app.Alert("you have " + lights.length + " lighting events")
  var jsonString = JSON.stringify(lights)
    
    app.WriteFile(f,jsonString)
    app.Alert("saved")
    
}

function tglStrobe_onTouch(){
 getLights()

}


//Called when user touches the seek bar.
function skb_OnTouch( value )
{  
	player.SeekTo( dur * value )
}

//Update seek bar.
function Update()
{
	prog = player.GetPosition()
	if( dur ) skb.SetValue( prog / dur )
	txt.SetText(prog)

// the remainder is only if we are playing back a light track
    if (overWrite == false)
    {
    	if (player.IsPlaying()) 
    	{
    	    if (nextTime>0) // we are awaiting a time
    	    {
    	        if( prog >= nextTime) ///we've hit the time
    	        {
    	            tglRed.SetChecked(lights[seqIndex].Red)
    	            tglBlue.SetChecked(lights[seqIndex].Blue)
    	            tglYellow.SetChecked(lights[seqIndex].Yellow)
    	            tglGreen.SetChecked(lights[seqIndex].Green)
    	            tglStrobe.SetChecked(lights[seqIndex].Strobe)
    	            send_bt()
    	            app.ShowPopup("set lights at " + prog)
    	            // is there another step in seq?
    	            if (lights.length > seqIndex+1)
    	            {
    	                seqIndex += 1
    	                nextTime = lights[seqIndex].Time
    	            }
    	            else nextTime = -1
    	        }
    	    }
	    }
    }
}

// called whenever light status changes
function send_bt(){
    var s=""
    
    if (tglRed.GetChecked())  s+="A,"
    else s+="a,"
    if (tglBlue.GetChecked())  s+="B,"
    else s+="b,"
    if (tglYellow.GetChecked())  s+="C,"
    else s+="c,"
    if (tglGreen.GetChecked())  s+="D,"
    else s+="d,"
    if (tglStrobe.GetChecked())  s+="S,"
    else s+="s"
    s+="\n"
    bt.Write(s)
    
    

}


