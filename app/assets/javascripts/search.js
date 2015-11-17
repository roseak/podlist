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
  $('#search-query').keyup(function(event){
    if(event.keyCode == 13){
      $('#button-fetch').click()
    }
  })
}

function renderEpisodes(episode) {
  $('#episode-search-results').append(
    "<li class='episode' data-id='" + episode.id
    + "'><div class='collapsible-header'><div class='row' id='row-head'>"
    + "<div class='col m1'>"
    + episodeImages(episode)
    + "</div><div class='col m10'><div class='show-title truncate'>"
    + episode.title
    + "</div><div id='show-network'>"
    + episode.show_title
    + "</div><div id='episode-timing'>"
    + episode.date_created
    + " | "
    + episode.duration
    + "</div></div><div class='col m1'>"
    + "<div id='add-to-playlist'><a class='modal-trigger' href='#modal-"
    + episode.id
    + "'><i class='material-icons'>playlist_add</i></a></div>"
    + "</div></div></div><div class='collapsible-body'><p>"
    + episode.description
    + "</p></div></li>"
  )
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
    url: '/episodes/search?query=' + query,
    success: function(episodes){
      $.each(episodes.results, function(index, episode){
        if (isNaN(newestEpisodeID) || episode.id > newestEpisodeID) {
          renderEpisodes(episode)
        }
        attachCollapsible()
        attachModal()
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
