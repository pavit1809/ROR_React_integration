class CreateInvestments < ActiveRecord::Migration[6.1]
  def change
    create_table :investments do |t|
      t.float :totatInvestment
      t.float :monthlyInvestment
      t.float :returnRate
      t.integer :timePeriod
      t.float :totalExpectedReturn
      t.float :totalInvestedAmount
      t.string :mode
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
