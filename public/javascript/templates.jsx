var SearchResultView = React.createClass({
  pickSong: function() {
    state.updateSong(this.props.result)
  },
  render: function() {
    return (
      <div onClick={this.pickSong}>{this.props.result.name}</div>
    )
  }
})

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
        <input type="text" placeholder="Search" onChange={this.updateQuery} value={state.searchQuery}/>
        <button onClick={state.getSearchResults}>Search</button>
        {albumResultViews}
        {songResultViews}
        {artistResultViews}
      </div>
      )
  }

})


var PlayerView = React.createClass({
  render: function() {
    console.log(state.instaArr.length)
      return  (

      <div>
        <div>
          <iframe src={"https://embed.spotify.com/?uri=spotify:track:"+state.songId} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
        </div>


        <div>

          <img src={state.instaArr}/>


          
        </div>
      </div>
      )

  }
});

var HomeView = React.createClass({
  render: function () {
    var greeting = ""

    if(state.searchQuery) {
      greeting = "Hello "+state.searchQuery+"!"
    } else {
      greeting = "Hello Nobody. :("
    }

    return (
      <div>
        <header id="header">
          {greeting}
        </header>

        <SearchView />  
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
