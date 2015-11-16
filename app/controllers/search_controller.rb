class SearchController < ApplicationController
  respond_to :json

  def index
    @episodes = episodes(params["query"]).to_json
    respond_with @episodes
  end

  private

  def episodes(query)
    OauthAudiosearch.new.search({q: query}, 'episodes')
  end
end
