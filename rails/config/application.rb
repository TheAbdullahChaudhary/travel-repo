# frozen_string_literal: true

require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Upstart
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.1

    # Please, add to the `ignore` list any other `lib` subdirectories that do
    # not contain `.rb` files, or that should not be reloaded or eager loaded.
    # Common ones are `templates`, `generators`, or `middleware`, for example.
    config.autoload_lib(ignore: %w[assets tasks])

    # Configuration for the application, engines, and railties goes here.
    #
    # These settings can be overridden in specific environments using the files
    # in config/environments, which are processed later.
    #
    # config.time_zone = "Central Time (US & Canada)"
    # config.eager_load_paths << Rails.root.join("extras")
    #
    # # Automatically update js-routes file
    # when routes.rb is changed
    config.log_level    = :debug
    config.logger       = ActiveSupport::Logger.new($stdout)
    config.logger.level = :debug

    config.active_record.default_timezone = :utc
    config.encoding                       = 'utf-8'
    config.filter_parameters += [:password]
    config.assets.enabled = true

    config.middleware.use(JsRoutes::Middleware)

    # Allow the container name as a host name so that the frontend app can talk directly to the backend app
    config.hosts << 'localhost:4000'
    config.hosts << 'localhost:3000'
    config.hosts << 'dev_web'
    config.hosts << 'prod_web'
    config.hosts << '0.0.0.0'
  end
end
