I used Eleventy and Nunjucks to generate two pages from my
portfolio (Home and About). Both pages use a shared footer
located in src/_includes/footer.njk.

To install dependencies:
cd ssg-exercise
npm install

To build:
npx @11ty/eleventy

To preview locally:
npx @11ty/eleventy --serve --port=8080

Home: http://localhost:8080/
About: http://localhost:8080/about.html

I tested the shared footer by changing its text and confirmed
that both pages showed the changes without having to edit
each page individually.