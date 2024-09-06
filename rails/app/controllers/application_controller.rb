# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :authenticate_user!
  after_action :set_xsrf_token_cookie

  protected

  def set_xsrf_token_cookie
    cookies['XSRF-TOKEN'] = { value: form_authenticity_token, secure: true, same_site: :strict }
  end

  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end
end
