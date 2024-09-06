# frozen_string_literal: true

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'http://localhost:4000', 'http://0.0.0.0:4000'
    resource '/api/*',
             headers: :any,
             methods: %i[get post put patch delete options head],
             credentials: true
  end
end
