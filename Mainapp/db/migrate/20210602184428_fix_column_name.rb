class FixColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :investments, :totatInvestment, :totalInvestment
  end
end
