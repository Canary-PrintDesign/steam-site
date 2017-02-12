ENV['WEBPACK_ENV'] ||= (build? ? 'build' : 'development')

configure :development do
  activate :livereload
end

activate :external_pipeline,
         name: :webpack,
         command: build? ?
           "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} npm run build" :
           "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} npm run watch",
         source: ".tmp/dist",
         latency: 1

set :css_dir,    'assets/styles'
ignore           '**/*.scss'
set :js_dir,     'assets/scripts'
ignore           'assets/scripts/*/*.js'
ignore           'assets/scripts/main.js'
set :images_dir, 'assets/images'

activate :directory_indexes

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = ENV['AWS_BUCKET']
  s3_sync.region                     = ENV['AWS_REGION']
  s3_sync.aws_access_key_id          = ENV['AWS_ACCESS_KEY_ID']
  s3_sync.aws_secret_access_key      = ENV['AWS_SECRET_ACCESS_KEY']
end
