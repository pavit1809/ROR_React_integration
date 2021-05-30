class ChangeDateToBeStringInSips < ActiveRecord::Migration[6.1]
  def change
    change_column :sips, :dateOfApplication, :string
    change_column :sips, :dateOfMaturity, :string
  end
end
