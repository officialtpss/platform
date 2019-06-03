// Slugify helper function
// From https://gist.github.com/mathewbyrne/1280286
// Mofified for filename (we want to keep the file extensions)
const slugify = text => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-\.]+/g, '')     // Remove all non-word chars (excluding .)
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
};

export default slugify;
