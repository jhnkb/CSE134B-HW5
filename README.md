ssg-exercise/
index.html
about.html

From the root of the repository:

To install dependencies:
cd ssg-exercise
npm install

To build:
npx @11ty/eleventy

To preview locally:
npx @11ty/eleventy --serve --port=8080

Home: http://localhost:8080/
About: http://localhost:8080/about.html

Design Note

I created a Dog Spotlight component on my Meet June page so visitors can discover different dog breeds.

When the visitor clicks the button (Surprise me with a dog), a request is sent to
the Dog CEO API. While waiting, the button is disabled and a loading message is shown.

If the request is successful, the dog image, alt text, and breed name are updated in the DOM. If it fails, an
error message is shown and the previous dog remains. In both cases, the button is enabled again so the visitor
can request another dog.

The visitor can also collpase the web component if they deem it to big for their screen. 

