class AddPhnoToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :phno, :string
  end
end
