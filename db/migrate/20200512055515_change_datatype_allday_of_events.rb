class ChangeDatatypeAlldayOfEvents < ActiveRecord::Migration[5.2]
  def change
    change_column :events, :allday, :integer
  end
end
