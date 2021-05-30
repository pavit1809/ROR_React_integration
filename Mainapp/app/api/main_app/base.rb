module MainApp
  class Base < Grape::API
    mount MainApp::V1::Users
    mount MainApp::V1::Sips
    mount MainApp::V1::Lumpsums
  end
end
