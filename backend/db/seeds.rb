require 'faker'

# Create accounts
50.times do
  created_at = Faker::Time.between(from: 2.years.ago, to: 1.month.ago)
  updated_at = Faker::Time.between(from: created_at, to: Time.zone.today)
  Account.create!(
    name: Faker::Company.name,
    slug: Faker::Internet.slug,
    subdomain: Faker::Internet.domain_word,
    created_at: created_at,
    updated_at: updated_at
  )
end

# Create users
100.times do
  created_at = Faker::Time.between(from: 2.years.ago, to: 1.month.ago)
  updated_at = Faker::Time.between(from: created_at, to: Time.zone.today)
  User.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    username: Faker::Internet.username,
    slug: Faker::Internet.slug,
    password: 'password',
    created_at: created_at,
    updated_at: updated_at
  )
end

# Create members
Account.find_each do |account|
  User.all.sample(10).each do |user|
    min_created_at = [account.created_at, user.created_at].max
    created_at = Faker::Time.between(from: min_created_at, to: Time.zone.today)
    updated_at = Faker::Time.between(from: created_at, to: Time.zone.today)
    Member.create!(
      account: account,
      user: user,
      created_at: created_at,
      updated_at: updated_at
    )
  end
end

# Create queries
Account.find_each do |account|
  50.times do
    created_at = Faker::Time.between(from: account.created_at, to: 1.month.ago)
    updated_at = Faker::Time.between(from: created_at, to: Time.zone.today)
    Query.create!(
      selector_regex: Faker::Lorem.word,
      title: Faker::Lorem.sentence,
      slug: Faker::Internet.slug,
      log_example: Faker::Lorem.paragraph,
      account: account,
      created_at: created_at,
      updated_at: updated_at
    )
  end
end

# Create triggers
Account.find_each do |account|
  Query.where(account: account).sample(10).each do |query|
    min_created_at = [account.created_at, query.created_at].max
    created_at = Faker::Time.between(from: min_created_at, to: 1.month.ago)
    updated_at = Faker::Time.between(from: created_at, to: Time.zone.today)
    Trigger.create!(
      extractor_regex: Faker::Lorem.word,
      title: Faker::Lorem.sentence,
      slug: Faker::Internet.slug,
      query_id: query.id,
      account: account,
      created_at: created_at,
      updated_at: updated_at
    )
  end
end

# Create logfiles
Account.find_each do |account|
  Dir[Rails.root.join('data/fake_logs/*.txt')].each do |file|
    created_at = Faker::Time.between(from: account.created_at, to: 1.month.ago)
    updated_at = Faker::Time.between(from: created_at, to: Time.zone.today)
    logfile = Logfile.create!(
      start_date: created_at,
      end_date: updated_at,
      name: file,
      account: account,
      created_at: created_at,
      updated_at: updated_at
    )
    raise unless logfile.file.attach(io: File.open(file), filename: File.basename(file))
  end
end

# Create matches
matches = Account.find_each.flat_map do |account|
  Query.where(account: account).find_each.flat_map do |query|
    rand(1000).times.map do
      min_created_at = [account.created_at, query.created_at].max
      created_at = Faker::Time.between(from: min_created_at, to: 1.month.ago)
      updated_at = Faker::Time.between(from: created_at, to: Time.zone.today)
      {
        query_id: query.id,
        account_id: account.id,
        log: Faker::Lorem.paragraph,
        created_at: created_at,
        updated_at: updated_at
      }
    end
  end
end

Match.upsert_all(matches)
