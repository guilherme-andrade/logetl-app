# frozen_string_literal: true

require 'dry/matcher/result_matcher'

module Users
  class Authenticate
    include Dry::Monads[:result]
    include Dry::Matcher.for(:call, with: Dry::Matcher::ResultMatcher)

    def call(params)
      user = User.find_by(email: params[:email])

      if user&.authenticate(params[:password])
        token_generator = JWTGenerator.new
        token = token_generator.encode(user_id: user.id)

        Success({ user: user, token: token })
      else
        Failure(:invalid_credentials)
      end
    end
  end
end
