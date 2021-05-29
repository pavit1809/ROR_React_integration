# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
require 'bcrypt'

1.times do |n|
  User.create!(
    name: Faker::Name.name,
    email: Faker::Internet.email,
    password: BCrypt::Password.create("password"),
    phno: "8796612372",
    state: "Uttar Pradesh",
    city: "Lucknow",
    dob: "2001-09-18",
    pan: "ABCDE1234F"
  )
end

