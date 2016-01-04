class HomeController < ApplicationController
  def index
    @home_shows = { "ted.jpg" => "355",
                    "radio-lab.jpg" => "13",
                    "reply-all.jpg" => "42",
                    "serial.jpg" => "15",
                    "this-american.jpg" => "27",
                    "freakonomics.jpg" => "353",
                    "startup.jpg" => "22",
                    "moth.jpg" => "58",
                    "invisibilia.jpg" => "359",
                    "onbeing.jpg" => "339",
                    "kcrw.jpg" => "50",
                    "deathsex.jpg" => "385" }
  end
end
