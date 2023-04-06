module Users
  class VerifyToken
    include Dry::Monads[:result]

    def call(token:)
      token_generator = JWTGenerator.new
      payload = token_generator.decode(token)
      user = User.find(payload['user_id'])

      Success(user)
    rescue JWT::DecodeError
      Failure(:invalid_token)
    end
  end
end
