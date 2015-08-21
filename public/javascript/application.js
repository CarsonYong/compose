$(document).ready(function() {
  $(".floated-img").empty();
  $.ajax({
    url: "https://api.instagram.com/v1/tags/lovemusic/media/recent?client_id=",
    method: "GET",
    dataType: 'jsonp'
  }).success(function(data){
    arr = data.data;
    for(var i = 0; i< arr.length; i ++) {
      var img = arr[i];
      var url = img.images.low_resolution.url;
      $("<div class='floated-img'><img src='"+url+"'></img></div>").appendTo(".background");
    }
  })


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
     error: function (xhr, ajaxOptions, thrownError) {
      console.log(thrownError)
      },
     success: function(html){
      var data = (html)
      console.log(data)
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
        $("<li>"+artistName+"</li>").appendTo("#artist");
        console.log("Artist ID: " + artistId + " -- Artist Name: "+ artistName);
      }
      var songs = (data.tracks.items)
      for(var i = 0; i < songs.length; i++ ) {
        var song = songs[i];
        var songId = song.id;
        var songName = song.name;
        var songArtist = song.artists[0].name;
        $("<li/>", {
          id:songId,
          songname:songName,
          songartist:songArtist,
          text:songName}).appendTo("#songs");
        $("<li id="+songId+" songName="+songName+" songArtist="+songArtist+">"+songArtist+"</li>").appendTo("#songs");
         //console.log("Song ID: " + songId + " -- Song Name: "+ songName+ " -- Artist: "+ songArtist)

      }

      $("#"+songId).click(function(e){


        var songId = ($(this).attr('id'));
        console.log(songId)
        var songName = encodeURIComponent($(this).attr('songName'));
        var songArtist = encodeURIComponent($(this).attr('songArtist'));
        console.log(songId)
        console.log(songName)
        console.log(songArtist)



      $('<iframe src="https://embed.spotify.com/?uri=spotify:track:'+songId+'" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>').appendTo(".navbar");
      //Make ajax call for musixmatch song id number
      $.ajax({
        url:"http://developer.echonest.com/api/v4/song/search?api_key=&artist="+songArtist+"&title="+songName+"&results=11&bucket=tracks&bucket=id:musixmatch-WW",
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
          // Start Lyrics
          $.ajax({
            url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=&track_id="+id+"&format=jsonp",
            method: 'get',
            dataType: 'jsonp'
          }).success(function(html){
            console.log(html)
            var data = (html);
            var lyrics = data.message.body.lyrics.lyrics_body;
            console.log(lyrics)
            $.ajax({
              url: "/stopwords",
              method: 'post',
              dataType: 'json',
              data: {lyrics:lyrics}
            }).success(function(data){
              $(".floated-img").empty();
              for(var i = 0; i < data.length; i ++) {
                var word = data[i];
                $.ajax({
                  url: "https://api.instagram.com/v1/tags/"+data[i]+"/media/recent?client_id=",
                  method: "GET",
                  dataType: 'jsonp'
                }).success(function(data){
                  arr = data.data;
                  for(var i = 0; i< arr.length; i ++) {
                    var img = arr[i];
                    var url = img.images.low_resolution.url;
                    $("<div class='floated-img'><img src='"+url+"'></img></div>").appendTo(".background");
                  }
                })
              }
            })
          }) // End Lyrics
        })
       })
      }
    })
  })
})
