# -*- encoding: utf-8 -*-
# stub: rb-fsevent 0.9.7 ruby lib

Gem::Specification.new do |s|
  s.name = "rb-fsevent"
  s.version = "0.9.7"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Thibaud Guillaume-Gentil", "Travis Tilley"]
  s.date = "2015-12-29"
  s.description = "FSEvents API with Signals catching (without RubyCocoa)"
  s.email = ["thibaud@thibaud.gg", "ttilley@gmail.com"]
  s.homepage = "http://rubygems.org/gems/rb-fsevent"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.6"
  s.summary = "Very simple & usable FSEvents API"

  s.installed_by_version = "2.4.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>, ["~> 1.0"])
      s.add_development_dependency(%q<rspec>, ["~> 2.11"])
      s.add_development_dependency(%q<guard-rspec>, ["~> 4.2"])
    else
      s.add_dependency(%q<bundler>, ["~> 1.0"])
      s.add_dependency(%q<rspec>, ["~> 2.11"])
      s.add_dependency(%q<guard-rspec>, ["~> 4.2"])
    end
  else
    s.add_dependency(%q<bundler>, ["~> 1.0"])
    s.add_dependency(%q<rspec>, ["~> 2.11"])
    s.add_dependency(%q<guard-rspec>, ["~> 4.2"])
  end
end
