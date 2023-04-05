class CreateExtensions < ActiveRecord::Migration[7.0]
  def change
    enable_extension "pgcrypto"
    enable_extension "plpgsql"
    enable_extension "uuid-ossp"
    enable_extension "postgis"
  end
end
