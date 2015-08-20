var render = function() {
  React.render(
    <AppView/>,
    document.getElementById('app')
  )
}
var arrayWords = [];
var state = {
  songId: null,
  songName: null,
  songArtist: null,
  songLyrics: null,
  searchQuery: null,
  searchResults: null,
  songImages: null,
  instaArr: [],

  updateQuery: function(text) {
    state.searchQuery = text
    render()
  },
  updateSearchResults: function(results) {
    state.searchResults = results;
    render()
  },
  updateSong: function(result) {
    state.songId = result.id;
    state.songArtist = result.artists[0].name;
    state.songName = result.name;
    state.getLyrics();
    render()
  },
  updateImgURL: function(url){
    render()
  },
  getSearchResults: function() {
    $.ajax({
      url: "https://api.spotify.com/v1/search?q="+state.searchQuery+"&type=artist,track,album&limit=3",
      method:'get',
      dataType: 'json',
    }).success(function(data){
      state.updateSearchResults({albums: data.albums.items, artists: data.artists.items, tracks:data.tracks.items });
    })
  },
  getLyrics: function() {
    var getImages = function(words){
      if(words.length){
        var word = words.pop();
        $.ajax({
          url: "https://api.instagram.com/v1/tags/"+word+"/media/recent?client_id=aca67fb22e014089978d27ff7b7dc09b",
          method: "GET",
          dataType: 'jsonp'
        }).success(function(data){
          arr = data.data;
          for(var i = 0; i< arr.length; i ++) {
            var img = arr[i];
            var url = img.images.low_resolution.url;
            state.instaArr.push(url)
          }
          getImages(words)
        })
      } else {
          state.updateImgURL(state.instaArr)
      }

    }
    $.ajax({
        url:"http://developer.echonest.com/api/v4/song/search?api_key=IMAYEMDMYKLRNRLUT&artist="+state.songArtist+"&title="+state.songName+"&results=11&bucket=tracks&bucket=id:musixmatch-WW",
        method: 'get',
        dataType: 'json'
        }).success(function(data){
          console.log(data.response.songs[0])
          var musixmatchId = data.response.songs[0].foreign_ids[0].foreign_id;
          console.log(musixmatchId)
          id = musixmatchId.split("song:")
          id = parseInt(id[1])
          $.ajax({
            url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=79872c3e3755258397333acc60d0244f&track_id="+id+"&format=jsonp",
            method: 'get',
            dataType: 'jsonp'
          }).success(function(data){
            var lyrics = data.message.body.lyrics.lyrics_body;
            $.ajax({
              url: "/stopwords",
              method: 'post',
              dataType: 'json',
              data: {lyrics:lyrics}
            }).success(function(data){
              arrayWords = data
              $(".floated-img").empty();
              getImages(arrayWords)
          })
        })
      })// ends first success
} // Ends getLyrics
} // Ends variable state
render()
