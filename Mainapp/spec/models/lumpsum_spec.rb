require 'rails_helper'

RSpec.describe Lumpsum, type: :model do
  @user = User.create(
    name: "test",
    email: "hello2@gmail.com",
    password: "password",
    phno: "6877861627",
    state: "UP",
    city: "Lucknow",
    dob: "18-09-2001",
    pan: "ABCDE1234B"
  )

  it 'valid sip should be accepted' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to be_truthy
  end

  it 'totalInvestment should be present' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: nil,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to_not be_valid
  end

  it 'estReturnRate should be present' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 10000,
    estReturnRate: nil,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to_not be_valid
  end

  it 'timePeriod should be present' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: nil,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to_not be_valid
  end

  it 'dateOfApplication should be present' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: nil,
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to_not be_valid
  end

  it 'dateOfMaturity should be present' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: nil
    )
    expect(@lumpsum).to_not be_valid
  end

  it 'time Period should be valid' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10.3,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to_not be_valid
    @lumpsum.timePeriod=0
    expect(@lumpsum).to_not be_valid
    @lumpsum.timePeriod=31
    expect(@lumpsum).to_not be_valid
  end

  it 'totalInvestment should be valid' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 0,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to_not be_valid
  end

  it 'estReturnRate should be valid' do
    @lumpsum = Lumpsum.new(
    user: @user,
    totalInvestment: 10000,
    estReturnRate: 0,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@lumpsum).to_not be_valid
  end
end
