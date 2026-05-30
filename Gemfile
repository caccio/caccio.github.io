source "https://rubygems.org"

gem "bigdecimal", "~> 3.1.8"

# Jekyll 4 standalone (usato da GitHub Actions — non il bundle github-pages)
gem "jekyll", "~> 4.3"

# Plugin
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-archives"
end

# Dipendenze di sistema su Windows
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1", platforms: %i[mingw x64_mingw mswin]
gem "http_parser.rb", "~> 0.6.0", platforms: :jruby
