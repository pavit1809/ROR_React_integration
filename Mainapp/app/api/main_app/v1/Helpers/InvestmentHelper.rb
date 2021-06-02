require_relative './UserHelper'
module InvestmentHelper

  def self.generate_response(success, status, message, response)
    {
      success: success,
      code: status,
      message: message,
      response: response
    }
  end

  def self.predicted_sip(investment, rate, time)
    first_factor = ((1 + ((rate / 100) / 12))**time) - 1
    second_factor = ((1 + ((rate / 100) / 12)) / ((rate / 100) / 12))
    ((investment * first_factor * second_factor).round - (investment * time))
  end

  def self.compare_inputs?(params)
    params[:data][:estimatedReturn] == predicted_sip(params[:data][:monthlyInvestment],
                                                     params[:data][:estReturnRate],
                                                     params[:data][:timePeriod] * 12)
  end

  def self.hash_helper(params)
    params[:monthlyInvestment] * params[:timePeriod] * 12
  end

  def self.generate_appropriate_hash(params, id)
    {
      totalInvestment: params[:mode] == 'sip' ? nil : params[:totalInvestment],
      monthlyInvestment: params[:mode] == 'sip' ? params[:monthlyInvestment] : nil,
      returnRate: params[:estReturnRate], timePeriod: params[:timePeriod] / 12,
      totalExpectedReturn: params[:estimatedReturn],
      totalInvestedAmount: params[:mode] != 'sip' ? params[:totalInvestment] : hash_helper(params),
      mode: params[:mode], user_id: id
    }
  end

  def self.validate_request?(params)
    return false unless UserHelper.check_token_validity?(params)

    current_user = User.find_by(id: params[:id])
    if current_user.role == 'visitor' && current_user.investments.where(mode: params[:data][:mode]).count >= 2
      return false
    end

    compare_inputs?(params)
  end

  def self.check_investment_validity(investment)

    validity_status = investment.valid?
    investment.save if validity_status
    generate_response(validity_status, validity_status == true ? 201 : 400,
                      validity_status == true ? 'Success' : 'Failure',
                      validity_status == true ? {} : investment.errors.messages)
  end

  def self.handle_investment_input(params)
    return generate_response(false, 400, 'Invalid Data', nil) unless validate_request?(params)

    investment_hash = generate_appropriate_hash(params[:data], params[:id])
    created_investment = Investment.new(investment_hash)
    check_investment_validity(created_investment)
  end

  def self.handle_get_investments(params)
    generate_response(false, 401, 'User not authenticated', nil) unless UserHelper.check_token_validity?(params)

    current_user = User.find_by(id: params[:id])
    current_user.investments.where(mode: params[:mode])
  end

end
