var render = function() {
  React.render(
    <AppView/>,
    document.getElementById('app')
  )
}

var state = {
  songId: null,
  searchQuery: null,
  searchResults: null,
  songImages: null,

  updateQuery: function(text) {
    state.searchQuery = text
    render()
  },
  updateSearchResults: function(results) {
    state.searchResults = results;
    render()
  },

  updateSong: function(id) {
    state.songId = id;
    console.log("id", state.songId)
    render()

  },

  getSearchResults: function() {
    //state.updateSearchResults([{name: "bar", id: "zzzz"}, {name: "foo", id: "abc"}]);
    $.ajax({
      url: "https://api.spotify.com/v1/search?q="+state.searchQuery+"&type=artist,track,album&limit=3", 
      method:'get',
      dataType: 'json',
      //data: state.searchQuery
    }).success(function(data){
      console.log(data)
      /*
      var albums = data.albums.items
      for(var i = 0; i < albums.length; i++) {
        var album = albums[i];
        var albumID = album.id
        var albumName = album.name
        console.log("Album ID: " + albumID + " -- Album Name: "+ albumName );
      }
      var artists = (data.artists.items)
      for(var i = 0; i < artists.length; i++) {
        var artist = artists[i];
        var artistId = artist.id;
        var artistName = artist.name;
        console.log("Artist ID: " + artistId + " -- Artist Name: "+ artistName);
      }
      var songs = (data.tracks.items)
      for(var i = 0; i < songs.length; i++ ) {
        var song = songs[i];
        var songId = song.id;
        var songName = song.name;
        console.log(song.artists)
        var songArtist = song.artists[0].name;
        console.log("Song ID: " + songId + " -- Song Name: "+ songName+ " -- Artist: "+ songArtist)
      }  */      
      state.updateSearchResults({albums: data.albums.items, artists: data.artists.items, tracks:data.tracks.items });
      //state.updateSearchResults([{name: +song, id: "zzzz"}, {name: "foo", id: "abc"}]);
      //state.updateSearchResults([{name: "bar", id: "zzzz"}, {name: "foo", id: "abc"}]);
    })
  }
}



render()
