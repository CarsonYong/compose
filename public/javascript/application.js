$(document).ready(function() {
//var stopwords = []
  $("button").click(function(e) {
    e.preventDefault()
    var searchQuery = $("#search-input").val();
    // console.log(searchQuery)
    // alert(searchQuery);

   $.ajax({
    url: "https://api.spotify.com/v1/search?q="+searchQuery+"&type=artist,track,album&limit=1", 
     method:'get',
     dataType: 'json',
     success: function(html){
      var data = (html)
      var albums = (data.albums.items)
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
        var songArtist = song.artists[0].name;
        console.log("Song ID: " + songId + " -- Song Name: "+ songName+ " -- Artist: "+ songArtist)

      }  
      $('<iframe src="https://embed.spotify.com/?uri=spotify:track:'+songId+'" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>').appendTo(".navbar");
      //Make ajax call for musixmatch song id number
      $.ajax({
        url:"http://developer.echonest.com/api/v4/song/search?api_key=FZBHWASTWJKMBT0CU&artist="+songArtist+"&title="+songName+"&results=11&bucket=tracks&bucket=id:musixmatch-WW",
        method: 'get',
        dataType: 'json'
        }).success(function(html){
          var data = (html);
          console.log(data.response.songs[0])
          var musixmatchId = data.response.songs[0].foreign_ids[0].foreign_id;
          console.log(musixmatchId)
          id = musixmatchId.split("song:")
          id = parseInt(id[1])
          console.log(id)
          $.ajax({
            url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=c1652e120f3e1c24a918c09c65b219a9&track_id="+id+"&format=jsonp",
            method: 'get',
            dataType: 'jsonp'
          }).success(function(html){
            var data = (html);
            var lyrics = data.message.body.lyrics.lyrics_body;
            console.log(lyrics)
            $.ajax({
              url: "/stopwords",
              method: 'post',
              dataType: 'json',
              data: {lyrics:lyrics}
            }).success(function(data){
              console.log(data)
              $(".floated-img").empty();
              for(var i = 0; i < data.length; i ++) {
                var word = data[i];
                console.log('1',data[i])
                $.ajax({
                url: "https://api.instagram.com/v1/tags/"+data[i]+"/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
                method: "GET",
                dataType: 'jsonp'
              }).success(function(data){
                arr = data.data;
                console.log(JSON.stringify(arr[0].tags))
                for(var i = 0; i< arr.length; i ++) {
                  var img = arr[i];
                  var url = img.images.low_resolution.url;
                  console.log(url)
                  $("<div class='floated-img'><img src='"+url+"'></img></div>").appendTo(".background");
                }
              })
              }
              console.log('2')
          })
            })
            //lyrics = lyrics.replace(stopwords, "")
          //   var counts = lyrics.replace(/[^\w\s]/g, "").split(/\s+/).reduce(function(map, word){
          //     map[word] = (map[word]||0)+1;
          //     return map;
          //   }, Object.create(null))
          //   console.log(counts)
          // })

        // }).success(function(musixmatchId){
        //   console.log(musixmatchId)
        //   id = musixmatchId.response.songs[0].foreign_ids[0].foreign_id;
        //   id = id.split("song:")
        //   id = parseInt(id[1])
        //   console.log(id)
        })
     
      //console.log(songId)
    }
  })


    })
})





// $(document).ready(function() {
// var x = document.createElement('script');
// x.src = '/javascript/test.js';
// document.getElementsByTagName("head")[0].appendChild(x);
// })