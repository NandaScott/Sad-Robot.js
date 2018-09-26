const helpText = `
\`\`\`
Hi! Sad Robot here.

To ping a card, use the pattern [[cardname]].

Here is a list of patterns I look for:

[[cardname]] ............ Fetch a card as an image
[[cardname | oracle]] ... Fetch a card's oracle text
[[cardname | price]] .... Fetch a card's price
[[cardname | set:<code>]] Fetch a card printing as an image
[[cardname | legal]] .... Fetch a card's legality
[[cardname | rules]] .... Fetch a card's rulings
[[cardname | flavor]] ... Fetch a card's flavor text
[[cardname | unique]] ... Fetch a linked list of all printings for a card
[[🎲]] .................. Fetch a random card

Other commands:
help .................... Shows this help text
ping .................... Tests the bot's connection to discord
feedback ................ Sends the maintainer of Sad Robot a DM with your issue.
                          Note that abuse/spam of this command will lead to an
                          account ban for this bot.
\`\`\`
`;

module.exports = { helpText }