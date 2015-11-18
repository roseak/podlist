require "test_helper"

class UserCanAddToPlaylistTest < ActionDispatch::IntegrationTest
  def setup
    Capybara.app = Podlist::Application
    stub_omniauth
  end

  test "user can add an episode to a playlist", js: true do
    visit "/"
    click_link "LOGIN"

    within("#search") do
      fill_in "search", with: "viki"
      click_button "Search"
    end

    within()

    assert_equal "/playlists/1", current_path
    assert page.has_content?(Resources)

  end
end
