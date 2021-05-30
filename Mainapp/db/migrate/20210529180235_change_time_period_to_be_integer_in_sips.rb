class ChangeTimePeriodToBeIntegerInSips < ActiveRecord::Migration[6.1]
  def change
    change_column :sips, :timePeriod, :Integer
  end
end
