module.exports = slugify;

function slugify(input) {
  if (!input)
    return;

  var slug = input.toLowerCase().trim();

  slug = slug.replace(/[^a-z0-9\s-]/g, ' ');

  slug = slug.replace(/[\s-]+/g, '-');

  return slug;
};