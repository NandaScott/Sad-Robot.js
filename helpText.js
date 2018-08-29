const helpText = `
\`\`\`
Hi! Sad Robot here.

To ping a card, use the pattern [[cardname]].

Here is a list of patterns I look for:

[[cardname]] ............ Fetch a card as an image
[[cardname | oracle]] ... Fetch a card's oracle text
[[cardname | price]] .... Fetch a card's price
[[cardname | set:<code>]] Fetch a card printing as an image
\`\`\`
`;

module.exports = { helpText }