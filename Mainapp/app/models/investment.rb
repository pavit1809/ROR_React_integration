class Investment < ApplicationRecord
  belongs_to :user

  validates :returnRate, :totalExpectedReturn, :totalInvestedAmount, presence: true
  validates :timePeriod, presence: true, numericality: {only_integer: true}
  with_options if: :mode_is_sip? do |investment|
    investment.validates :monthlyInvestment, presence: true
  end

  with_options if: :mode_is_not_sip? do |investment|
    investment.validates :totalInvestment, presence: true
  end

  def mode_is_sip?
    mode == 'sip'
  end

  def mode_is_not_sip?
    mode != 'sip'
  end

end
