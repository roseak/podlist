class SearchController < ApplicationController
  def index
    @search = params[:search]
    @episodes = episodes(@search)
  end

  private

  def episodes(query)
    OauthAudiosearch.new.search({q: query}, 'episodes').results
  end
end
