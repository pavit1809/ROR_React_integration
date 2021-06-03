require_relative './Helpers/UserHelper'

module MainApp
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resources :users do

        desc 'Create new User'
        params do
          requires :role, :email
          requires :password, allow_blank: false
          given role: ->(val) { val == 'user' } do
            requires :pan, :dob, :city, :state, :phno, :name
          end
        end
        post '/new' do
          present UserHelper.handle_user_signup(params)
        end

        desc 'Login User'
        params do
          requires :email, :password
        end
        post '/login' do
          present UserHelper.handle_user_login(params)
        end

        desc 'Basic Details'
        params do
          requires :id, type: Integer
          requires :token, :role
        end
        get '/details' do
          present UserHelper.handle_user_details(params)
        end

        desc 'Logout User'
        params do
          requires :id, type: Integer
          requires :token, :role
        end
        post '/logout' do
          present UserHelper.handle_user_logout(params)
        end
      end
    end
  end
end
