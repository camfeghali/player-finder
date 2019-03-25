class AddAddressColumnToGamesTable < ActiveRecord::Migration[5.2]
  def change
    add_column :games, :address, :string
  end
end
