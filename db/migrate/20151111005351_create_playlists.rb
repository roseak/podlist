class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :name
      t.integer :episodes, array: true, default: []
      t.references :user, null: false

      t.timestamps null: false
    end
  end
end
