require 'rails_helper'

RSpec.describe User, type: :model do
  subject {
    User.new(
      name: "test",
      email: "hello5@gmail.com",
      password: "password",
      phno: "6877861627",
      state: "UP",
      city: "Lucknow",
      dob: "18-09-2001",
      pan: "ABCDE1234D"
    )
  }
  before {subject.save}

  it 'valid user should be accepted' do
    expect(subject).to be_valid
  end

  it 'name should be present' do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it 'invalid names should be rejected' do
    subject.name = 'a'
    expect(subject).to_not be_valid
    subject.name = 'a'*51
    expect(subject).to_not be_valid
  end

  it 'email should be present' do
    subject.email = nil
    expect(subject).to_not be_valid
  end

  it 'invalid emails should be rejected' do
    invalid_addresses = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
    invalid_addresses.each do |invalid_address|
      subject.email = invalid_address
      expect(subject).to_not be_valid
    end
  end

  it 'valid emails should be accepted' do
    valid_addresses = %w[user@example.com USER@foo.COM A_US-ER@foo.bar.org
    first.last@foo.jp alice+bob@baz.cn]
    valid_addresses.each do |valid_address|
      subject.email = valid_address
      expect(subject).to be_valid
    end
  end

  it 'valid phone numbers should be accepted' do
    subject.phno = "9458794221"
    expect(subject).to be_valid
  end

  it 'invalid phone numbers should be rejected' do
    subject.phno = nil
    expect(subject).to_not be_valid
  end

  it 'invalid PAN Cards should be rejected' do
    invalid_pans = %w[15653ABCE3 QWDQB13351]
    invalid_pans.each do |invalid_pan|
      subject.pan = invalid_pan
      expect(subject).to_not be_valid
    end
  end

  it 'valid PAN Cards should be accepted' do
    subject.pan = "ABCDE1234E"
    expect(subject).to be_valid
  end

  it 'phno should be present' do
    subject.phno = nil
    expect(subject).to_not be_valid
  end

  it 'state should be present' do
    subject.state = nil
    expect(subject).to_not be_valid
  end

  it 'city should be present' do
    subject.city = nil
    expect(subject).to_not be_valid
  end

  it 'dob should be present' do
    subject.dob = nil
    expect(subject).to_not be_valid
  end

  it 'pan should be present' do
    subject.pan = nil
    expect(subject).to_not be_valid
  end

end
