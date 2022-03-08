require 'sassc'
require 'slim'
require 'tilt'
require 'colorize'
require 'pry'

def build(from:, to:, extension_name:, render: -> file_path { Tilt.new(file_path).render } )
  Dir.glob("#{from}/*").each do |file_path|
    filename = File.basename(file_path).gsub(/#{File.extname(file_path)}\z/, "")
    new_filename = "#{filename}.#{extension_name}"

    File.open("#{to}/#{new_filename}", 'w+') do |f|
      f.write(render.call(file_path))
      puts "#{new_filename} created".green
    end
  end
end

directory "dist/styles"
desc "Build styles"
task build_styles: ["dist/styles"] do
  build(from: "src/styles", to: "dist/styles", extension_name: 'css')
end

directory "dist/pages"
desc "Build pages"
task build_pages: ["dist/pages"] do
  build(from: "src/pages", to: "dist/pages", extension_name: 'html')
end

directory "dist/scripts"
desc "Build scripts"
task build_scripts: ["dist/scripts"] do
  require 'ruby2js'
  require 'ruby2js/filter/functions'
  require 'ruby2js/filter/camelCase'
  require 'ruby2js/filter/underscore'

  render_lambda = -> file_path { Ruby2JS.convert(File.read(file_path)) }

  build(from: "src/scripts", to: "dist/scripts", extension_name: 'js', render: render_lambda)
end

task build_assets: %i[build_styles build_pages build_scripts]
