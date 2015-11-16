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
    "<div class='episode' data-id='" + episode.id
    + "'><h6>Title "
    + episode.title
    + "</h6><p>"
    + episode.description
    + "</p></div>"
  )
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
      })
    }
  })
}
