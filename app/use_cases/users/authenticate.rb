# frozen_string_literal: true

module Users
  class Authenticate
    include Dry::Monads[:result]

    def call(email:, password:)
      user = User.find_by(email: email)

      if user&.authenticate(password)
        token_generator = JWTGenerator.new
        token = token_generator.encode(user_id: user.id)

        Success(user: user, token: token)
      else
        Failure(:invalid_credentials)
      end
    end
  end
end
