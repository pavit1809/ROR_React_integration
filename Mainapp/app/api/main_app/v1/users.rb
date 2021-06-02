require_relative "./genHelpers.rb"

module MainApp
  module V1
    class Users < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resources :users do

        desc 'Create new User'
        params do
          requires :pan,:dob,:city,:state,:phno,:name, :email,:password,:role
          #string is default
        end
        post '/new' do
          user_hash=Helper.generateUserHash(params)
          user=User.new(user_hash)
          if (user.valid?)
            status 201
            user.save
            present({success: true})
          else
            status 400
            present ({success: false,message: user.errors.messages})
          end
        end

        desc 'Basic Details'
        params do
          requires :id, type: Integer
          requires :token
        end
        get '/details' do
          if (!Helper.checkTokenValidity?(params[:id],params[:token]))
            status 401
            present ({success: false})
          else
            user=User.find_by(id: params[:id])
            present({name:user.name,email: user.email,pan:user.pan})
          end
        end

        desc 'Visitor Entry'
        params do
          requires :email,:password,:role
        end
        post '/visitor' do
          visitor=User.find_by(email: params[:email],role: params[:role])
          if (visitor == nil)
            #new visitor
            visitor_hash=Helper.generateVisitorHash(params)
            visitor=User.new(visitor_hash)
            if (visitor.valid?)
              visitor.save
              #use login function here
              ret=Helper.checkLoginCredentials(params[:email],params[:password])
              if (ret == nil)
                status 401
                present ({success: false})
              else
                status 201
                present({token: ret[:ret_token],id: ret[:ret_user].id},role: ret[:ret_user].role)
              end
            else
              #ill-format request
              status 400
              present ({success: false,message: visitor.errors.messages})
            end
          else
            #use login function
            ret=Helper.checkLoginCredentials(params[:email],params[:password])
            if (ret == nil)
              status 401
              present ({success: false})
            else
              status 200
              present({token: ret[:ret_token],id: ret[:ret_user].id},role: ret[:ret_user].role)
            end
          end
        end

        desc 'Login User'
        params do
          requires :email,:password
          #string is default
        end
        post '/login' do
          ret=Helper.checkLoginCredentials(params[:email],params[:password])
          if (ret==nil)
            status 401
            present ({success: false})
          else
            present({token: ret[:ret_token],id: ret[:ret_user].id},role: ret[:ret_user].role)
          end
        end

        desc 'Logout User'
        params do
          requires :id, type:Integer
          requires :token, type:String
        end
        post '/logout' do
          if (!Helper.checkTokenValidity?(params[:id],params[:token]))
            status 401
            present ({success: false})
          else
            user=User.find_by(id: params[:id])
            user.update_attribute(:token,nil)
            present({success:true})
          end
        end

      end #-> end of resources
    end
  end
end
