class ChangeDatatypeColorOfEvent < ActiveRecord::Migration[5.2]
  def up
    change_column :events, :color, :string
  end

  def down
    change_column :events, :color, :integer
  end
end
