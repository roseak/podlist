class AddProfileImageUrlToUsers < ActiveRecord::Migration
  def change
    add_column :users, :profile_pic, :string
    add_column :users, :location, :string
    add_column :users, :bio, :string
  end
end
