class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :password
      t.string :token
      t.string :state
      t.string :city
      t.string :dob
      t.string :pan

      t.timestamps
    end
  end
end
