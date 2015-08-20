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

    var callbck = function(data){
      console.log(arrayWords)
      if(i < arrayWords.length){
        i++
        console.log(data)
      var word = arrayWords[i];

      $.ajax({
        url: "https://api.instagram.com/v1/tags/"+word+"/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
        method: "GET",
        dataType: 'jsonp'
      }).success(callbck)
    } else {
      arr = data.data;
      console.log(arr)
      for(var i = 0; i< arr.length; i ++) {
        var img = arr[i];
        var url = img.images.low_resolution.url;
        state.instaArr.push(url)
        
      }
      console.log(state.instaArr.length)
      state.updateImgURL(state.instaArr)
    }
      
    }

    $.ajax({
        url:"http://developer.echonest.com/api/v4/song/search?api_key=FZBHWASTWJKMBT0CU&artist="+state.songArtist+"&title="+state.songName+"&results=11&bucket=tracks&bucket=id:musixmatch-WW",
        method: 'get',
        dataType: 'json'
        }).success(function(data){
          console.log(data.response.songs[0])
          var musixmatchId = data.response.songs[0].foreign_ids[0].foreign_id;
          console.log(musixmatchId)
          id = musixmatchId.split("song:")
          id = parseInt(id[1])
          $.ajax({
            url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=c1652e120f3e1c24a918c09c65b219a9&track_id="+id+"&format=jsonp",
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
              arrayWords.push(data)
              $(".floated-img").empty();
              var word = data[0];
              console.log(word)
              $.ajax({
                url: "https://api.instagram.com/v1/tags/"+word+"/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
                method: "GET",
                dataType: 'jsonp'
              }).done(callbck)
              
              


              
          console.log("finish")
       
              //state.updateImgURL(array)
              // state.updateImgURL(state.instaArr)
              // console.log(state.updateImgURL)
          })
        })

      })// ends first success

} // Ends getLyrics

} // Ends variable state



render()