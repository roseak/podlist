# require "test_helper"
#
# class UserCanAddToPlaylistTest < ActionDispatch::IntegrationTest
#   def setup
#     Capybara.app = Podlist::Application
#     stub_omniauth
#   end
#
#   test "user can add an episode to a playlist" do
#     visit home_path
#
#     within("#search-form") do
#       fill_in "search-query", with: "viki"
#       click_on "Search"
#     end
#   end
# end
