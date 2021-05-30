class CreateSips < ActiveRecord::Migration[6.1]
  def change
    create_table :sips do |t|
      t.references :user, null: false, foreign_key: true
      t.float :monthlyInvestment
      t.float :estReturnRate
      t.float :timePeriod
      t.float :totalInvestmentAmount
      t.float :totalEstReturn
      t.float :dateOfApplication
      t.float :dateOfMaturity

      t.timestamps
    end
  end
end
