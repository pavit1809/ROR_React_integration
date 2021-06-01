# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_05_31_185750) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "lumpsums", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.float "totalInvestment"
    t.float "estReturnRate"
    t.integer "timePeriod"
    t.string "dateOfApplication"
    t.string "dateOfMaturity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_lumpsums_on_user_id"
  end

  create_table "sips", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.float "monthlyInvestment"
    t.float "estReturnRate"
    t.integer "timePeriod"
    t.string "dateOfApplication"
    t.string "dateOfMaturity"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_sips_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password"
    t.string "token"
    t.string "state"
    t.string "city"
    t.string "dob"
    t.string "pan"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "phno"
    t.string "role"
  end

  add_foreign_key "lumpsums", "users"
  add_foreign_key "sips", "users"
end
