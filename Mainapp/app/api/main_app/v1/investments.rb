require_relative './Helpers/InvestmentHelper'

module MainApp
  module V1
    class Investments < Grape::API
      version 'v1', using: :path
      format :json
      prefix :api

      resources :investments do

        desc 'Create a new Investment'
        params do
          requires :data, type: Hash do
            requires :estReturnRate, :estimatedReturn, type: Float
            requires :timePeriod, type: Integer
            requires :mode, type: String
            given mode: ->(val) { val == 'sip' } do
              requires :monthlyInvestment, type: Float
            end
            given mode: ->(val) { val != 'sip' } do
              requires :totalInvestment, type: Float
            end
          end
          requires :role, :token, type: String
          requires :id, type: Integer
        end
        post '/new' do
          InvestmentHelper.handle_investment_input(params)
        end

        desc 'Get all investments'
        params do
          requires :role, :token, :mode, type: String
          requires :id, type: Integer
        end
        get '/all' do
          InvestmentHelper.handle_get_investments(params)
        end

      end
    end
  end
end
