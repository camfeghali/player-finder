class RemoveAddressColumnFromCourtsTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :courts, :address
  end
end
