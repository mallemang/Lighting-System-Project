var file = "pathfile";

function OnStart()
{
    lay = app.CreateLayout( "linear", "VCenter,FillXY" );

   
    btnSw = app.CreateButton( "SpydersWeb", 0.5, 0.1 );
    btnSw.SetOnTouch( btnSw_OnTouch );
    lay.AddChild( btnSw );

    btnAbbaSoo = app.CreateButton( "AbbaSoo", 0.5, 0.1 );
    btnAbbaSoo.SetOnTouch( btnAbbaSoo_OnTouch );
    lay.AddChild( btnAbbaSoo );

    btn2Plus2 = app.CreateButton( "2Plus2", 0.5, 0.1 );
    btn2Plus2.SetOnTouch( btn2Plus2_OnTouch );
    lay.AddChild( btn2Plus2 );

    app.AddLayout( lay );
}

function btnSw_OnTouch()
{
    app.SaveText( "folder", "/sdcard/swmusic", file );
    app.ShowPopup( "System Set to SpydersWeb" );
}

function btnAbbaSoo_OnTouch()
{
    app.SaveText( "folder", "/sdcard/music", file );
    app.ShowPopup( "System Set to AbbaSoo" );
}

function btn2Plus2_OnTouch()
{
    app.SaveText( "folder", "/sdcard/2plus2music", file );
    app.ShowPopup( "System Set to 2Plus2" );
}

