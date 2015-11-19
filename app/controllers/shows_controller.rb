class ShowsController < ApplicationController
  def show
    if Rails.cache.read("show:#{params[:id]}")
      @show = Rails.cache.read("show:#{params[:id]}")
      @episodes = Rails.cache.read("show:#{params[:id]}:episodes")
      @related = Rails.cache.read("show:#{params[:id]}:related")
    else
      @show = OauthAudiosearch.new.show(params[:id])
      @episodes = @show.episode_ids.first(5).map { |episode| episode_info(episode)}
      @related = OauthAudiosearch.new.related(params[:id], {type: "shows", size: 6, from: 6})
      Rails.cache.write("show:#{params[:id]}", @show)
      Rails.cache.write("show:#{params[:id]}:episodes", @episodes)
      Rails.cache.write("show:#{params[:id]}:related", @related)
    end
  end
end
