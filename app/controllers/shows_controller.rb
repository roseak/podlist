class ShowsController < ApplicationController
  def show
    @show = OauthAudiosearch.new.show(params[:id])
    @related = OauthAudiosearch.new.related(params[:id], {type: "shows",
                                                          size: 6,
                                                          from: 6})
  end
end
