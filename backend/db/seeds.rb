# frozen_string_literal: true

acme = Account.create!(name: 'Acme Corp', slug: 'acme-corp', subdomain: 'acme')

# Users
user = User.create!(first_name: 'John', last_name: 'Doe', email: 'johndoe@example.com', username: 'johndoe',
                    slug: 'johndoe', password: 'password')

# Role.create!(name: "admin", resource_type: "Member", resource_id: user)

Query.create!(selector_regex: '.*', title: 'All', slug: 'all', account: acme, log_example: 'example log')

Trigger.create!(extractor_regex: '.*', title: 'All', slug: 'all', query_id: Query.first.id, account: acme)

Dir[Rails.root.join('data/fake_logs/*.txt')].each do |file|
  logfile = Logfile.create!(start_date: 1.day.ago.beginning_of_day, end_date: Time.zone.today, name: file,
                            account: acme)
  raise unless logfile.file.attach(io: File.open(file), filename: File.basename(file))
end
