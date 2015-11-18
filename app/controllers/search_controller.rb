class SearchController < ApplicationController
  respond_to :json

  def index
    @episodes  = episodes(params["query"])
  end

  private

  def episodes(query)
    OauthAudiosearch.new.search({q: query}, 'episodes')
  end
end
