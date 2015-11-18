require "test_helper"

class UserLogsInWithTwitterTest < ActionDispatch::IntegrationTest
  include Capybara::DSL

  def setup
    Capybara.app = Podlist::Application
    stub_omniauth
  end

  test "logging in" do
    visit "/"
    assert_equal 200, page.status_code

    click_link "LOGIN"

    assert_equal "/home", current_path
    assert page.has_content?("Rosie")
    assert page.has_link?("Logout")
  end

  def stub_omniauth
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
      provider: "twitter",
      extra: {
        raw_info: {
          uid: "1234",
          name: "Rosie",
          screen_name: "kohniva",
          profile_image_url: "https://photo.com.jpg",
          description: "words",
          location: "Denver"
        }
      },
      credentials: {
        token: ENV["TWITTER_KEY"],
        secret: ENV["TWITTER_SECRET"]
      }
    })
  end
end
