module Helper

  def Helper.generateUserHash(params)
    #addition password validation check can be added to save of the cost of using BCrypt
    if (params[:password].length<8)
      return nil
    end
    uh={
      name: params[:name],
      email: params[:email],
      password: BCrypt::Password.create(params[:password]),
      phno: params[:phno],
      state: params[:state],
      city: params[:city],
      dob: params[:dob],
      pan: params[:pan],
      role: params[:role]
    }
    return uh
  end

  def Helper.generateVisitorHash(params)
    if (params[:password].length<8)
      return nil
    end
    vh={
      email: params[:email],
      password: BCrypt::Password.create(params[:password]),
      role: params[:role]
    }
    return vh
  end

  #method for checking if the login credentials are valid and generation token on successful validation
  def Helper.checkLoginCredentials(email,password)
    current_user=User.find_by(email: email)
    if (current_user==nil)
      return nil
    else
      check_hash=BCrypt::Password.new(current_user.password)
      if (check_hash!=password)
        return nil
      else
        payload={user_id: current_user.id}
        new_token=JWT.encode(payload,'s3cr3t')
        current_user.token=new_token
        current_user.save
        return {ret_token:new_token,ret_user: current_user}
      end
    end
  end

  #method to generate a proper user object to send to the frontend(CAN BE USED LATER)
  # def Helper.generateUserHashPostLogin(current_user)
  #   user={
  #     id: current_user.id,
  #     name: current_user.name,
  #     email: current_user.email,
  #     city: current_user.city,
  #     state: current_user.state
  #   }
  #   return user
  # end

  #method to check token validity only
  def Helper.checkTokenUtil(token)
    begin
      JWT.decode(token,'s3cr3t',true,algorithm: 'HS256')
    rescue JWT::DecodeError
      nil
    end
  end

  #method to check if the token is valid and belongs to the current user
  def Helper.checkTokenValidity?(id,token)
    ret=checkTokenUtil(token)
    if (ret==nil)
      return false
    end
    currrentUserId=ret[0]["user_id"]
    current_user=User.find_by(id: currrentUserId)
    if (current_user.token!=nil && current_user.token==token)
      return true
    else
      return false
    end
  end

  #method to generate a sip hash
  def Helper.generateSipHash(params)
    sh={
      monthlyInvestment: params[:data][:monthlyInvestment],
      estReturnRate: params[:data][:estReturnRate],
      timePeriod: params[:data][:timePeriod],
      dateOfApplication: Time.now.strftime("%m/%d/%Y"),
      dateOfMaturity: (Time.now+params[:data][:timePeriod].years).strftime("%m/%d/%Y")
    }
    return sh
  end

  def Helper.generateLumpsumHash(params)
    lh={
      totalInvestment: params[:data][:totalInvestment],
      estReturnRate: params[:data][:estReturnRate],
      timePeriod: params[:data][:timePeriod],
      dateOfApplication: Time.now.strftime("%m/%d/%Y"),
      dateOfMaturity: (Time.now+params[:data][:timePeriod].years).strftime("%m/%d/%Y")
    }
    return lh
  end


end
