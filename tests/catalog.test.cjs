const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const context = vm.createContext({});
for (const file of ['data.js', 'catalog-extra.js', 'photos.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context);
}
const data = vm.runInContext('({ recipes, ingredients })', context);
assert.equal(data.recipes.length, 50);
assert.equal(new Set(data.recipes.map(r => r.en)).size, data.recipes.length);
for (const [id, recipe] of data.recipes.entries()) {
  assert.equal(recipe.id, id, 'IDs must remain stable for saved favorites');
  assert(recipe.en && recipe.fr);
  assert(recipe.steps[0].length >= 3 && recipe.steps[0].length === recipe.steps[1].length, recipe.en);
  assert(recipe.nutrition.every(Number.isFinite), recipe.en);
  for (const [key, quantity] of recipe.items) {
    assert(data.ingredients[key] && quantity > 0, `${recipe.en}: ${key}`);
  }
  assert(fs.existsSync(path.join(root, recipe.img)), `${recipe.en}: missing image`);
  assert(/^https:\/\//.test(recipe.photo.source), `${recipe.en}: missing credit`);
}
for (let meal = 1; meal <= 5; meal++) {
  for (let difficulty = 1; difficulty <= 3; difficulty++) {
    assert(data.recipes.some(r => r.meal === meal && r.difficulty === difficulty), `Meal ${meal} has no difficulty ${difficulty}`);
  }
}
console.log('50 bilingual recipes validated; every meal has all three difficulty levels.');
