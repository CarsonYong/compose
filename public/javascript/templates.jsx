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

var array = []

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
    
      
    var arr = []
    var imageArray = state.instaArr

    for(i =0; i < imageArray.length; i++){
      arr.push(<img src={imageArray[i]}/>)
    }

      return  (

      <div>
        <div>
          <iframe src={"https://embed.spotify.com/?uri=spotify:track:"+state.songId} width="300" height="80" frameborder="0" allowtransparency="true"></iframe>
        </div>

     
          <div>
            {arr}
           </div> 
        
          
      </div>
      )

  }
});

var HomeView = React.createClass({
  render: function () {
    
  $.ajax({
    url: "https://api.instagram.com/v1/tags/music/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
    method: "GET",
    dataType: 'jsonp'
  }).success(function(data){
    arr = data.data;
    for(var i = 0; i< arr.length; i ++) {
      var img = arr[i];
      var url = img.images.low_resolution.url;
      console.log(url)
      array.push(url) 
    }
      for(i =0; i < array.length; i++){
      state.homeArray.push(<img src={array[i]}/>)
    }

 



  })
   var greeting = ""

    if(state.searchQuery) {
      greeting = "Hello "+state.searchQuery+"!"
    } else {
      greeting = "Hello Nobody. :("
    }

    console.log(state.homeArray)

    return (
      <div>
        <header id="header">
          {greeting}
        </header>

        <SearchView />
         <div>
            {state.homeArray}
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
