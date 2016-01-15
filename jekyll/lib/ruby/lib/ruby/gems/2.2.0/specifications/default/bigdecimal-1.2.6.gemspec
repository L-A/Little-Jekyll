# -*- encoding: utf-8 -*-
# stub: bigdecimal 1.2.6 ruby .
# stub: extconf.rb

Gem::Specification.new do |s|
  s.name = "bigdecimal"
  s.version = "1.2.6"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.require_paths = ["."]
  s.authors = ["Kenta Murata", "Zachary Scott", "Shigeo Kobayashi"]
  s.date = "2014-12-19"
  s.description = "This library provides arbitrary-precision decimal floating-point number class."
  s.email = "mrkn@mrkn.jp"
  s.extensions = ["extconf.rb"]
  s.files = ["bigdecimal/jacobian.rb", "bigdecimal/ludcmp.rb", "bigdecimal/math.rb", "bigdecimal/newton.rb", "bigdecimal/util.rb", "extconf.rb"]
  s.homepage = "http://www.ruby-lang.org"
  s.rubygems_version = "2.4.5"
  s.summary = "Arbitrary-precision decimal floating-point number library."
end
