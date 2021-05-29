class User < ApplicationRecord

  VALID_PAN_REGEX=/[A-Z]{5}[0-9]{4}[A-Z]{1}/
  validates :name,:email,:password,:phno,:state,:city,:dob,:pan, presence: true
  validates :email, :pan, uniqueness: true
  validates :name, length: {maximum: 50,minimum: 2}
  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :phno, length: {is: 10}
  validates :pan, format:{with: VALID_PAN_REGEX}

end
