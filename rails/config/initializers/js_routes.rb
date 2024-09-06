# frozen_string_literal: true

JsRoutes.setup do |config|
  config.module_type = 'ESM'
  config.file = Rails.root.join('tmp/routes.js')
  config.camel_case = true
  config.default_url_options = { format: 'json' }
end
