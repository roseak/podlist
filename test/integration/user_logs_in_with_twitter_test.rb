require "test_helper"

class UserLogsInWithTwitterTest < ActionDispatch::IntegrationTest
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
end
