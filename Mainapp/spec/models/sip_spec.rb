require 'rails_helper'

RSpec.describe Sip, type: :model do
  @user = User.create(
    name: "test",
    email: "hello1@gmail.com",
    password: "password",
    phno: "6877861627",
    state: "UP",
    city: "Lucknow",
    dob: "18-09-2001",
    pan: "ABCDE1234C"
  )

  it 'valid sip should be accepted' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to be_truthy
  end

  it 'monthlyInvestment should be present' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: nil,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to_not be_valid
  end

  it 'estReturnRate should be present' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 10000,
    estReturnRate: nil,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to_not be_valid
  end

  it 'timePeriod should be present' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: nil,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to_not be_valid
  end

  it 'dateOfApplication should be present' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: nil,
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to_not be_valid
  end

  it 'dateOfMaturity should be present' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: nil
    )
    expect(@sip).to_not be_valid
  end

  it 'time Period should be valid' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 10000,
    estReturnRate: 10.5,
    timePeriod: 10.3,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to_not be_valid
    @sip.timePeriod=0
    expect(@sip).to_not be_valid
    @sip.timePeriod=31
    expect(@sip).to_not be_valid
  end

  it 'monthlyInvestment should be valid' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 0,
    estReturnRate: 10.5,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to_not be_valid
  end

  it 'estReturnRate should be valid' do
    @sip = Sip.new(
    user: @user,
    monthlyInvestment: 10000,
    estReturnRate: 0,
    timePeriod: 10,
    dateOfApplication: Time.now.strftime("%m/%d/%Y"),
    dateOfMaturity: (Time.now+10.years).strftime("%m/%d/%Y")
    )
    expect(@sip).to_not be_valid
  end
end
