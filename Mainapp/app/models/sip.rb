class Sip < ApplicationRecord
  belongs_to :user
  validates :monthlyInvestment,:estReturnRate,:timePeriod,:dateOfApplication,:dateOfMaturity, presence: true
  validates :timePeriod, numericality: {only_integers: true,greater_than:0, less_than: 31}
  validates :monthlyInvestment,:estReturnRate, numericality: {greater_than:0}
end
