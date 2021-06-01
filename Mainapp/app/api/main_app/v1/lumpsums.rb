require_relative "./genHelpers.rb"

module MainApp
  module V1
    class Lumpsums < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resources :lumpsums do

        desc 'Create a new Lumpsum'
        params do
          requires :id, type: Integer
          requires :token, :role, type: String
          requires :data, type: Hash do
            requires :totalInvestment, :estReturnRate, type:Float
            requires :timePeriod, type: Integer
          end
        end
        post '/new' do
          if (!Helper.checkTokenValidity?(params[:id],params[:token]))
            status 401
            present ({success: false,message: "User is not logged in"})
          else
            user=User.find_by(id: params[:id])
            if (params[:role]=="visitor" && user.lumpsums.count>=2)
              status 401
              present ({success:false, message: "Please signUp for complete access and benifits"})
            else
              lumpsum_hash=Helper.generateLumpsumHash(params)
              user.lumpsums.create(lumpsum_hash)
              present ({success:true}) #-> can be altered
            end
          end
        end

        desc 'Fetch all lumpsums for a user'
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
            present user.lumpsums
          end
        end


      end #-> end of resources
    end
  end
end

