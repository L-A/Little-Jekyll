# -*- encoding: utf-8 -*-
# stub: jekyll 3.0.1 ruby lib

Gem::Specification.new do |s|
  s.name = "jekyll"
  s.version = "3.0.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib"]
  s.authors = ["Tom Preston-Werner"]
  s.date = "2015-11-18"
  s.description = "Jekyll is a simple, blog aware, static site generator."
  s.email = "tom@mojombo.com"
  s.executables = ["jekyll"]
  s.extra_rdoc_files = ["README.markdown", "LICENSE"]
  s.files = ["LICENSE", "README.markdown", "bin/jekyll"]
  s.homepage = "https://github.com/jekyll/jekyll"
  s.licenses = ["MIT"]
  s.rdoc_options = ["--charset=UTF-8"]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0.0")
  s.rubygems_version = "2.4.8"
  s.summary = "A simple, blog aware, static site generator."

  s.installed_by_version = "2.4.8" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 2

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<liquid>, ["~> 3.0"])
      s.add_runtime_dependency(%q<kramdown>, ["~> 1.3"])
      s.add_runtime_dependency(%q<mercenary>, ["~> 0.3.3"])
      s.add_runtime_dependency(%q<safe_yaml>, ["~> 1.0"])
      s.add_runtime_dependency(%q<colorator>, ["~> 0.1"])
      s.add_runtime_dependency(%q<rouge>, ["~> 1.7"])
      s.add_runtime_dependency(%q<jekyll-sass-converter>, ["~> 1.0"])
      s.add_runtime_dependency(%q<jekyll-watch>, ["~> 1.1"])
    else
      s.add_dependency(%q<liquid>, ["~> 3.0"])
      s.add_dependency(%q<kramdown>, ["~> 1.3"])
      s.add_dependency(%q<mercenary>, ["~> 0.3.3"])
      s.add_dependency(%q<safe_yaml>, ["~> 1.0"])
      s.add_dependency(%q<colorator>, ["~> 0.1"])
      s.add_dependency(%q<rouge>, ["~> 1.7"])
      s.add_dependency(%q<jekyll-sass-converter>, ["~> 1.0"])
      s.add_dependency(%q<jekyll-watch>, ["~> 1.1"])
    end
  else
    s.add_dependency(%q<liquid>, ["~> 3.0"])
    s.add_dependency(%q<kramdown>, ["~> 1.3"])
    s.add_dependency(%q<mercenary>, ["~> 0.3.3"])
    s.add_dependency(%q<safe_yaml>, ["~> 1.0"])
    s.add_dependency(%q<colorator>, ["~> 0.1"])
    s.add_dependency(%q<rouge>, ["~> 1.7"])
    s.add_dependency(%q<jekyll-sass-converter>, ["~> 1.0"])
    s.add_dependency(%q<jekyll-watch>, ["~> 1.1"])
  end
end
