const helpText = `
\`\`\`
Hi! Sad Robot here.

To ping a card, use the pattern [[cardname]].

Here is a list of patterns I look for:

[[cardname]] ............ Fetch a card as an image
[[cardname | oracle]] ... Fetch a card's oracle text
[[cardname | price]] .... Fetch a card's price

Keep in mind that there cannot be spaces in these spots
[[ cardname | price ]]
  ^                ^
Otherwise I won't catch the card you're looking for.
\`\`\`
`;

module.exports = { helpText }