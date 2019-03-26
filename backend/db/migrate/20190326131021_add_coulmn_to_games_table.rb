class AddCoulmnToGamesTable < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :capacity, :integer
  end
end
