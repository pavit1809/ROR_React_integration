require_relative "./genHelpers.rb"

module MainApp
  module V1
    class Sips < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resources :sips do

        desc 'Create a new Sip'
        params do
          requires :id, type: Integer
          requires :token, :role, type: String
          requires :data, type: Hash do
            requires :monthlyInvestment, :estReturnRate, type:Float
            requires :timePeriod, type: Integer
          end
        end
        post '/new' do
          if (!Helper.checkTokenValidity?(params[:id],params[:token]))
            status 401
            present ({success: false,message: "User is not logged in"})
          else
            user=User.find_by(id: params[:id])
            if (params[:role]=="visitor" && user.sips.count>=2)
              status 401
              present ({success:false, message: "Please signUp for complete access and benifits"})
            else
              sip_hash=Helper.generateSipHash(params)
              user.sips.create(sip_hash)
              present ({success:true}) #-> can be altered
            end
          end
        end

        desc 'Fetch all sips for a user'
        params do
          requires :id, type: Integer
          requires :token, type: String
        end
        get '/all' do
          if (!Helper.checkTokenValidity?(params[:id],params[:token]))
            status 401
            present ({success: false,message: "User is not logged in"})
          else
            user=User.find_by(id: params[:id])
            present user.sips
          end
        end

      end #-> end of resources
    end
  end
end

