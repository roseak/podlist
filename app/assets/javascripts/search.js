$(document).ready(function(){
  fetchEpisodesButton()
  fetchEpisodesEnter()
})

function fetchEpisodesButton() {
  $('#button-fetch').on('click', function(){
    var query = $('#search-query').val()
    $('#episode-search-results').empty()
    fetchEpisodes(query)
  })
}

function fetchEpisodesEnter() {
  $('#search').keyup(function(event){
    if(event.keyCode == 13){
      $('#button-fetch').click()
    }
  })
}

function renderEpisodes(episode, current_user) {
  $('#episode-search-results').append(
    "<li class='episode' data-id='" + episode.id
    + "'><div class='collapsible-header'><div class='row' id='row-head'>"
    + "<div class='col m1'>"
    + episodeImages(episode)
    + "</div><div class='col m10'><div class='show-title truncate'>"
    + episode.title
    + "</div><div id='show-network'>"
    + "<a href='/shows/"
    + episode.show_id
    + "'>"
    + episode.show_title
    + "</a>"
    + showNetwork(episode)
    + "</div><div id='episode-timing'>"
    + episode.date_created
    + " | "
    + episode.duration
    + "</div></div><div class='col m1'>"
    + "<div id='add-to-playlist'><a class='modal-trigger' href='#modal-"
    + episode.id
    + "'><i class='material-icons'>playlist_add</i></a><div id='modal-"
    + episode.id
    + "' class='modal'><div class='modal-content'>"
    + "<div id='add-to-playlist-title'>Add to a Playlist</div>"
    + "<div id='episode-title-modal' class='truncate'>"
    + episode.title
    + "</div><div class='col m8 offset-m2 new-playlists'>"
    + userPlaylists(current_user.playlists, episode.id)
    + "<form action='/playlists' id='new-playlist' method='post'>"
    + "<div class='input-field col m12' id='new-playlist-name'>"
    + "<input id='name' name='name' type='text' />"
    + "<label for='name'>Playlist Name</label>"
    + "<input id='episode_id' name='episode_id' type='hidden' value='"
    + episode.id
    + "' /></div></form></div></div></div>"
    + "</div></div></div></div><div class='collapsible-body'><p>"
    + episode.description
    + "</p></div></li>"
  )
}

function userPlaylists(playlists, episode_id){
  var arranged_playlists = [];
  for (var i = 0; i < playlists.length; i++) {
    arranged_playlists.push(playlistButtons(playlists[i], episode_id));
  }
  return arranged_playlists.join("");
}

function playlistButtons(playlist, episode_id){
  return "<form action='/playlists/"
  + playlist.id
  + "' id='update-playlist' method='post'>"
  + "<div class='input-field col m10 offset-m1' id='playlist-name-btn'>"
  + "<div><input name='_method' type='hidden' value='patch' />"
  + "<input id='episode_id' name='episode_id' type='hidden' value='"
  + episode_id
  + "' /><input id='playlist_name' name='id' type='hidden' value='"
  + playlist.id
  + "' /><input type='submit' value='"
  + playlist.name
  + "' class='waves-effect waves-light btn playlist-name-btn'>"
  + "</div></div></form>"
}

function showNetwork(episode){
  if (!!episode.network) {
    return " from "
    + episode.network
  }
}

function episodeImages(episode){
  if (!!episode.image_urls) {
    return "<img src='" + episode.image_urls.thumb + "', alt='', id='episode-photo'>"
  } else {
    return "<i class='material-icons red' id='episode-photo'>radio</i>"
  }
}

function fetchEpisodes(query){
  var newestEpisodeID = parseInt($('.episode').last().attr('data-id'))
  $.ajax({
    type: 'GET',
    url: '/episodes/search.json?query=' + query,
    success: function(response){
      var episodes     = response.episodes.results
      var current_user = response.current_user

      $.each(episodes, function(index, episode){
        if (isNaN(newestEpisodeID) || episode.id > newestEpisodeID) {
          renderEpisodes(episode, current_user)
        }
        attachModal()
        attachCollapsible()
      })
    }
  })

  function attachCollapsible(){
    $('.collapsible').collapsible({
      accordion : false
    })
  }

  function attachModal(){
    $('.modal-trigger').leanModal()
  }

}
