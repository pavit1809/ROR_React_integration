module MainApp
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resources :users do
        desc 'Create new User'
        params do
          requires :name, type:String
          requires :email, type:String
          requires :password, type:String
          requires :phno, type:String
          requires :state, type:String
          requires :city, type:String
          requires :dob, type:String
          requires :pan, type:String
        end
        post '/new' do
          user=User.new(
            name: params[:name],
            email: params[:email],
            password: BCrypt::Password.create(params[:password]),
            phno: params[:phno],
            state: params[:state],
            city: params[:city],
            dob: params[:dob],
            pan: params[:pan]
          )
          if (user.valid?)
            status 201
            user.save
            present({success: true})
          else
            puts user.errors.messages
            status 400
            present ({message: "Invalid input"})
          end

        end
      end #-> end of resources
    end #-> end of calss
  end #-> end of module v1
end #-> end of module TicketBooking



# This type of nesting is required in nested req.body params check
# requires :users, type: Hash do
#   requires :age, type: Hash do
#     requires :month, type:String
#       requires :year, type:String
