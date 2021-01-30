const DS = require("drawshield");
 
// Create a new Client instance
const client = new DS.Client({
  dir: "./shields",
  save: true
});
 
// Create a few blazons
client.drawShield("gules, a mullet of five Or");
client.drawShield("quarterly I. and IV. gules a castle or II. and III. argent a lion rampant purpure");
 
// Asynchronously return the image data from a blazon
(async function() {
  let result = await client.drawShield("per cross gules and argent");
  console.log(result);
  // SVG Info
})();
 
/* // Asynchronously return the data from a term lookup
(async function() {
  let result = await client.fetchTerm("pall", "parker", "exact");
  console.log(result);
})(); */