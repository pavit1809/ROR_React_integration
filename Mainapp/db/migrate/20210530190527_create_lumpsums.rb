class CreateLumpsums < ActiveRecord::Migration[6.1]
  def change
    create_table :lumpsums do |t|
      t.references :user, null: false, foreign_key: true
      t.float :totalInvestment
      t.float :estReturnRate
      t.integer :timePeriod
      t.string :dateOfApplication
      t.string :dateOfMaturity

      t.timestamps
    end
  end
end
