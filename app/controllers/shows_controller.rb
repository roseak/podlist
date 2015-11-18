class ShowsController < ApplicationController
  def show
    @show = Rails.cache.fetch("show-#{params[:id]}-cache", expires_in: 24.hours) do
      OauthAudiosearch.new.show(params[:id])
    end
    @related = Rails.cache.fetch("related-shows-for-#{params[:id]}-cache", expires_in: 24.hours) do
      OauthAudiosearch.new.related(params[:id], {type: "shows",
                                                          size: 6,
                                                          from: 6})
    end
  end
end
