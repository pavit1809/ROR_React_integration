module MainApp
  class Base < Grape::API
    mount MainApp::V1::Users
    mount MainApp::V1::Investments
  end
end
