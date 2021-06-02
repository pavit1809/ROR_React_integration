class User < ApplicationRecord
  VALID_PAN_REGEX = /[A-Z]{5}[0-9]{4}[A-Z]/

  validates :email, :password, :role, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true

  with_options if: :user_is_paid? do |user|
    user.validates :name, :phno, :state, :city, :dob, :role, :pan, presence: true
    user.validates :pan, format: { with: VALID_PAN_REGEX }, uniqueness: true
    user.validates :name, length: { maximum: 50, minimum: 2 }
    user.validates :phno, length: { is: 10 }
  end

  def user_is_paid?
    role == 'user'
  end

end
