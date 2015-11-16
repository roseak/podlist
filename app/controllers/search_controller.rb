class SearchController < ApplicationController
  def index
    @episodes = episodes(params["query"]).to_json
    render :json
  end

  private

  def episodes(query)
    OauthAudiosearch.new.search({q: query}, 'episodes')
  end
end
