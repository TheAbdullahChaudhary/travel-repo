/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/helpers/**/*.rb",
    "./app/javascript/**/*.js",
    "./app/views/**/*.{erb,haml,html,slim}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  purge: ['./app/views/**/*.*html.erb', './app/helpers/**/*.rb', './app/assets/stylesheets/**/*.css', './app/javascript/**/*.js'],
}