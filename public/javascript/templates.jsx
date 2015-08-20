var Navbar = React.createClass({
  render: function(){
    return (
      <nav id="navbar-player" className="navbar">
      <a id="navbar-brand" href="/">Compose</a>
      <iframe src={"https://embed.spotify.com/?uri=spotify:track:"+state.songId} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
       <ul>
         <li><form id="search-player">
           <label for="search-input-player" id="search-input-player-label"><img id="search-icon" src="/images/ic_search_white_48dp.png" alt="search image"></img></label>
           <input type="text" name="search-input-player" className="arrow_box" id="search-input-player" placeholder="Search for more music"/>
         </form></li>
         <li>SIGN UP</li>
         <li>LOGIN</li>
         <li>LOGOUT</li>
       </ul>
      </nav>
    )
  }
});

var SearchResultView = React.createClass({
  pickSong: function() {
    state.updateSong(this.props.result)
  },
  render: function() {
    return (
      <div onClick={this.pickSong}>{this.props.result.name}</div>
    )
  }
});

var SearchView = React.createClass({
  updateQuery: function(event) {
    state.updateQuery(event.target.value);
  },
  render: function(){
    var albumResultViews = null
    var songResultViews = null
    var artistResultViews = null
    if(state.searchResults) {
      albumResultViews = state.searchResults.albums.map(function(result){
        return <SearchResultView result={result}/>
      })
      songResultViews = state.searchResults.tracks.map(function(result){
        return <SearchResultView result={result}/>
      })
      artistResultViews = state.searchResults.artists.map(function(result){
        return <SearchResultView result={result}/>
      })
    }

    return (

      <div>
        <input type="text"  name="search" id="search-input" value="" placeholder="Search Spotify for an artist, song or album" onChange={this.updateQuery} value={state.searchQuery}/>
        <button onClick={state.getSearchResults}>Search</button>
        {albumResultViews}
        {songResultViews}
        {artistResultViews}
      </div>
    )
  }

});


var PlayerView = React.createClass({
  render: function() {
    var arr = []
    var imageArray = state.instaArr

    for(i =0; i < imageArray.length; i++){
      arr.push(<img src={imageArray[i]}/>)
    }

      return (
        <div>
          {Navbar}
          <div className="player-wrapper">
            <div className="player-floated-img">
              {arr}
            </div>
          </div>
        </div>
      )
  }
});

var HomeView = React.createClass({
  render: function () {

    return (
      <div>
        <header id="header">
          <Navbar/>
        </header>

        <div className="background-wrapper">

          <div className="page-content">

            <div className="landing-page">

              <h1>Visualise your favourite songs with Compose</h1>

              <div id="search-form">
                <form>
                  <SearchView />
                </form>
              </div>

            </div>

          </div>

        </div>

      </div>
      )
  }
});

var AppView = React.createClass({

  render: function() {
    var view;
    if(state.songId) {
      view = <PlayerView />
    } else {
      view = <HomeView />
    }
    return (
      <div>{view}</div>
      )
  }
});
