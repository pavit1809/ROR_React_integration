module MainApp
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resources :users do
        desc 'Create new User'
        params do
          requires :users, type: Hash do
            requires :age, type: Hash do
              requires :month, type:String
              requires :year, type:String
            end
          end
        end
        post '/new' do
          present({message: params})
        end
      end #-> end of resources
    end #-> end of calss
  end #-> end of module v1
end #-> end of module TicketBooking
