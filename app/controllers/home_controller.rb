class HomeController < ApplicationController
  def index
    @episodes = episodes(params[:search]) if params[:search].present?
  end

  private

  def episodes(query)
    OauthAudiosearch.new.search({q: query}, 'episodes')
  end
end
