const helpText = (prefix) => `
\`\`\`

To ping a card, use the pattern [[cardname]].

Here is a list of patterns I look for:

[[cardname]] ............ Fetch a card as an image
[[cardname | oracle]] ... Fetch a card's oracle text
[[cardname | price]] .... Fetch a card's price
[[cardname | legal]] .... Fetch a card's legality
[[cardname | rules]] .... Fetch a card's rulings
[[cardname | flavor]] ... Fetch a card's flavor text
[[cardname | unique]] ... Fetch a linked list of all printings for a card
[[🎲]] .................. Fetch a random card

To get a card from a specific set, you can also use
the following syntax with any other mode
[[cardname | set:KTK]]
[[cardname | set:KTK | oracle]]
[[cardname | set:KTK | price]]

Other commands:
${prefix}help .................... Shows this help text
${prefix}ping .................... Tests the bot's connection to discord
${prefix}prefix .................. Used for setting this server's command prefix. Admins only.
resetprefix ..... Resets this server's command prefix to default. Admins only.
${prefix}feedback <msg> .......... Sends the maintainer of Sad Robot a DM with your issue.
                          Note that abuse/spam of this command will lead to an
                          account ban for this bot.
\`\`\`
`;

const greeting = (guildname) => { return `
Hi! My name is Sad Robot, I'm the resident MTG bot for ${guildname}.

I'm here to fetch MTG cards for you. I will look for any cards that are formatted like [[cardname]]!
You can specify as many cards as you'd like and I'll try to fetch them as fast as I can. Please be mindful
not to spam the chat though!

To get my help text for all of my functions, just type ?help either here or in ${guildname}.
`};

module.exports = { helpText, greeting }