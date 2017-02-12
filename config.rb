ENV['WEBPACK_ENV'] ||= (build? ? 'build' : 'development')

configure :development do
  activate :livereload
end

activate :external_pipeline,
         name: :webpack,
         command: build? ?
           "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} ./node_modules/webpack/bin/webpack.js --bail -p" :
           "WEBPACK_ENV=#{ENV.fetch('WEBPACK_ENV')} ./node_modules/webpack/bin/webpack.js --watch -d --progress --color",
         source: ".tmp/dist",
         latency: 1

set :css_dir,    'assets/styles'
ignore           '**/*.scss'
set :js_dir,     'assets/scripts'
ignore           'assets/scripts/*/*.js'
ignore           'assets/scripts/main.js'
set :images_dir, 'assets/images'

activate :directory_indexes
