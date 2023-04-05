Rails.application.config.middleware.insert_before 0, Rack::Cors, :debug => !Rails.env.production?, :logger => (-> { Rails.logger }) do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :post, :patch, :delete, :options]
  end
end
