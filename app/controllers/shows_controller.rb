class ShowsController < ApplicationController
  def show
    @show = OauthAudiosearch.new.show(params[:id])
    @episodes = @show.episode_ids.first(5).map { |episode| episode_info(episode)}
    @related = OauthAudiosearch.new.related(params[:id], {type: "shows", size:6, from: 6})
  end
end
