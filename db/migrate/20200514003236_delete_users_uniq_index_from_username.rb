class DeleteUsersUniqIndexFromUsername < ActiveRecord::Migration[5.2]
  def self.down
    remove_index :users, :username
  end
end
