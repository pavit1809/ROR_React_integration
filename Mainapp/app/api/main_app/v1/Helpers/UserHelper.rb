module Helper

  def self.generate_response(success, status, message, response)
    {
      success: success,
      code: status,
      message: message,
      response: response
    }
  end

  def self.generate_valid_user_object(token, user_details)
    {
      id: user_details.id,
      role: user_details.role,
      token: token
    }
  end

  def self.generate_user_details(user)
    {
      name: user.name,
      email: user.email,
      pan: user.pan
    }
  end

  def self.generate_user_hash(params)
    {
      name: params[:name], email: params[:email],
      password: BCrypt::Password.create(params[:password]),
      phno: params[:phno], state: params[:state],
      city: params[:city], dob: params[:dob],
      pan: params[:pan], role: params[:role]
    }
  end

  def self.check_user_validity(user)
    validity_status = user.valid?
    user.save if validity_status
    generate_response(validity_status, validity_status == true ? 201 : 400,
                      validity_status == true ? 'Success' : 'Failure',
                      validity_status == true ? {} : user.errors.messages)
  end

  def self.check_for_existing_user?(params)
    fetched_user = User.find_by(email: params[:email])
    !fetched_user.nil?
  end

  def self.check_login_credentials(params)
    fetched_user = User.find_by(email: params[:email])
    check_hash = BCrypt::Password.new(fetched_user.password)
    check_hash == params[:password]
  end

  def self.generate_login_token(params)
    fetched_user = User.find_by(email: params[:email])
    payload = { user_id: fetched_user.id }
    login_token = JWT.encode(payload, 'secret')
    fetched_user.token = login_token
    fetched_user.save
    generate_response(true, 200, 'Logged In Successfully', generate_valid_user_object(login_token, fetched_user))
  end

  def self.handle_user_login(params)
    return generate_login_token(params) if check_for_existing_user?(params) && check_login_credentials(params)

    generate_response(false, 400, 'Login Failed', nil)
  end

  def self.handle_user_signup(params)
    return handle_user_login(params) if check_for_existing_user?(params)

    user_hash = generate_user_hash(params)
    created_user = User.new(user_hash)
    check_user_validity(created_user)
  end

  def self.check_token_util(token)
    JWT.decode(token, 'secret', true, algorithm: 'HS256')
  rescue JWT::DecodeError
    nil
  end

  def self.check_payload?(decoded_payload, token, id)
    current_user_id = decoded_payload[0]['user_id']
    current_user = User.find_by(id: id)
    if !current_user.nil? && !current_user.token.nil? && current_user.token == token && current_user_id == id
      return true
    end

    false
  end

  def self.check_token_validity?(params)
    decoded_payload = check_token_util(params[:token])
    return false if decoded_payload.nil?

    check_payload?(decoded_payload, params[:token], params[:id])
  end

  def self.handle_user_logout(params)
    return generate_response(false, 401, 'User not authenticated', nil) unless check_token_validity?(params)

    current_user = User.find_by(id: params[:id])
    current_user.update_attribute(:token, nil)
    generate_response(true, 200, 'Logged out successfully', nil)
  end

  def self.handle_user_details(params)
    return generate_response(false, 401, 'User not authenticated', nil) unless check_token_validity?(params)

    user = User.find_by(id: params[:id])
    generate_user_details(user)
  end

end
