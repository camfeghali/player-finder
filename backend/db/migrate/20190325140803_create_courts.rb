class CreateCourts < ActiveRecord::Migration[5.2]
  def change
    create_table :courts do |t|
      t.belongs_to :player, foreign_key: true
      t.belongs_to :game, foreign_key: true
      t.string :address

      t.timestamps
    end
  end
end
