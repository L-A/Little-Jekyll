# -*- encoding: utf-8 -*-
# stub: liquid 3.0.3 ruby lib

Gem::Specification.new do |s|
  s.name = "liquid"
  s.version = "3.0.3"

  s.required_rubygems_version = Gem::Requirement.new(">= 1.3.7") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Tobias Luetke"]
  s.date = "2015-05-28"
  s.email = ["tobi@leetsoft.com"]
  s.extra_rdoc_files = ["History.md", "README.md"]
  s.files = ["History.md", "README.md"]
  s.homepage = "http://www.liquidmarkup.org"
  s.licenses = ["MIT"]
  s.rubygems_version = "2.4.8"
  s.summary = "A secure, non-evaling end user template engine with aesthetic markup."

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<rake>, [">= 0"])
      s.add_development_dependency(%q<minitest>, [">= 0"])
    else
      s.add_dependency(%q<rake>, [">= 0"])
      s.add_dependency(%q<minitest>, [">= 0"])
    end
  else
    s.add_dependency(%q<rake>, [">= 0"])
    s.add_dependency(%q<minitest>, [">= 0"])
  end
end
