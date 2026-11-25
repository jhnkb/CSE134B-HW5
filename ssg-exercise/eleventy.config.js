// exports a function that 11ty can load and execute when it starts
module.exports = function(eleventyConfig) {

    //copy the CSS files into the output folder without processing or changing them
    eleventyConfig.addPassthroughCopy("src/style");
    eleventyConfig.addPassthroughCopy("src/images");
    eleventyConfig.addPassthroughCopy("src/theme.js");

    return {
        dir: {
            // Where Eleventy looks for source files.
            input: "src",
            // Where Eleventy saves generated files.
            output: "_site",
            // Where Eleventy looks for reusable templates, relative to the input directory.
            includes: "_includes"
        }
    };
};