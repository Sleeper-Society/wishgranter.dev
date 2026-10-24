import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("_data/insults.json");
    eleventyConfig.addPassthroughCopy("docs/Developer-Q-&-A/*.png");
    eleventyConfig.addPassthroughCopy(
        "/node_modules/wishgranter/dist/reimplementations/code0Commenter.js",
    );
    eleventyConfig.addFilter("getRandom", function (items) {
        let selected = items[Math.floor(Math.random() * items.length)];
        return selected;
    });
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
}
