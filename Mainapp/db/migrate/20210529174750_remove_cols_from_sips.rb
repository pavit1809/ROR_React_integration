class RemoveColsFromSips < ActiveRecord::Migration[6.1]
  def change
    remove_column :sips, :totalInvestmentAmount, :float
    remove_column :sips, :totalEstReturn, :float
  end
end
