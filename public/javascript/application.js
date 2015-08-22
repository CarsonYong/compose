$(document).ready(function() {

  $('#player').each(function(){
    var songId = $(this).attr('songId')
    var songName = $(this).attr('songName');
    var songArtist = $(this).attr('songArtist')
    console.log(songId)
    console.log(songName)
    console.log(songArtist)

  $('<iframe src="https://embed.spotify.com/?uri=spotify:track:'+songId+'" width="300" height="80" frameborder="0" allowtransparency="true"></iframe>').appendTo(".navbar");
        //Make ajax call for musixmatch song id number
        $.ajax({
          url:"http://developer.echonest.com/api/v4/song/search?api_key=FZBHWASTWJKMBT0CU&artist="+songArtist+"&title="+songName+"&results=11&bucket=tracks&bucket=id:musixmatch-WW&limit=true",
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
              url: "http://api.musixmatch.com/ws/1.1/track.lyrics.get?apikey=c1652e120f3e1c24a918c09c65b219a9&track&track_id="+id+"&format=jsonp",
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
                $(".player-floated-img").empty();
                for(var i = 0; i < data.length; i ++) {
                  var word = data[i];
                  $.ajax({
                    url: "https://api.instagram.com/v1/tags/"+data[i]+"/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
                    method: "GET",
                    dataType: 'jsonp'
                  }).success((function(num){

                  return(
                  function(data){
                    arr = data.data;
                    for(var j = 0; j < arr.length; j++) {
                      var img = arr[j];
                      var url = img.images.low_resolution.url;
                      console.log(num)
                      $(".player-floated-img").eq(num).append($("<img src='"+url+"'></img>"));
                    }
                  })
                })(i)

                  )
                }
              })
            }) // End Lyrics
          })

  })

  $('.background-wrapper').each(function(){

    $(".floated-img").empty();
    $.ajax({
      url: "https://api.instagram.com/v1/tags/lovemusic/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
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

    $.ajax({
      url: "https://api.instagram.com/v1/tags/lovemusic/media/recent?client_id=6b57da6cc49c4e2ca5af262214decb93",
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
  $('#player').each(function(){
    var songId = $(this).attr('songId');
    console.log(songId)
  })

  $("button").click(function(e) {
    e.preventDefault()
    $("#songs").empty();
    $("#artist").empty();
    $("#search-results").toggleClass("active");
    $(".landing-page").toggleClass("active");
    $(".landing-page #homepage-heading").remove();
    var searchQuery = $("#search-input").val();

     $.ajax({
      url: "https://api.spotify.com/v1/search?q="+searchQuery+"&type=artist,track,album&limit=3",
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
        for(var i = 0; i < songs.length; i++ ) { //Beginning song
          var song = songs[i];
          var songId = song.id;
          var songName = song.name;
          var songArtist = song.artists[0].name;

        $('#songs').append(
          $('<li/>')
            .attr('id', songId)
            .attr('songname', songName)
            .attr('songartist', songArtist)
            .append(
              $('<span class="bold"/><br>')
                .text(songName))
            .append(
              $('<span/>')
                .text(songArtist)));


        $("#"+songId).click(function(e){


          var songId = ($(this).attr('id'));
          console.log(songId)
          var songName = encodeURIComponent($(this).attr('songName'));
          var songArtist = encodeURIComponent($(this).attr('songArtist'));
          console.log(songId)
          console.log(songName)
          console.log(songArtist)




          window.location="/player?songId="+songId+"&songName="+songName+"&songArtist="+songArtist;

         }) //End of for loop from song results
        }
        }
      })
    })
  })
})
