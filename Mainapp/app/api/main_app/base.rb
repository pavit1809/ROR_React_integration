module MainApp
  class Base < Grape::API
    mount MainApp::V1::Users
  end
end
