class AddLatLngColumnsToGamesTable < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :lat, :float
    add_column :games, :lng, :float

  end
end
