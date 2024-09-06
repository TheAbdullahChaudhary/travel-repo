# frozen_string_literal: true

if Rails.env.development? && ENV.fetch('BYEBUG_SERVER', '').downcase == 'true'
  begin
    require 'byebug/core'
    port = ENV.fetch('BYEBUG_PORT', 1048)
    # assuming this is delayed job
    Rails.logger.info "\n\n\nRemote Byebug debugger listening on port #{port}\n\n\n"
    Byebug.wait_connection = false
    Byebug.start_server '0.0.0.0', port.to_i
  rescue Errno::EADDRINUSE => e
    Rails.logger.info "Rescuing #{e}"
  end
end
