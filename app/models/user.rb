class User < ActiveRecord::Base
  has_many :playlists

  def self.from_omniauth(auth_info)
    user = find_or_create_by(uid: auth_info[:uid])

    user.update_attributes(
      uid:                auth_info.uid,
      name:               auth_info.extra.raw_info.name,
      screen_name:        auth_info.extra.raw_info.screen_name,
      profile_pic:        auth_info.extra.raw_info.profile_image_url,
      bio:                auth_info.extra.raw_info.description,
      location:           auth_info.extra.raw_info.location,
      oauth_token:        auth_info.credentials.token,
      oauth_token_secret: auth_info.credentials.secret
    )

    user
  end
end
