const helpText = (prefix) => `
\`\`\`

[[cardname]]
    Fetch a card. Defaults to the image.
[[cardname | oracle]]
    Fetch a card's oracle text.
[[cardname | price]]
    Fetch a card's price.
[[cardname | legal]]
    Fetch a card's legality.
[[cardname | rules]]
    Fetch a card's rulings.
[[cardname | flavor]]
    Fetch a card's flavor text.
[[cardname | unique]]
    Fetch a linked list of all printings for a card.
[[🎲]]
    Fetches a random card.

You may fetch a specific set of a card with the following pattern.
You may use any other mode with this.
[[cardname | set:KTK]]
[[cardname | set:KTK | oracle]]

Other commands:
${prefix}help
    Shows this help text.
${prefix}ping
    Tests the bot's connection to Discord.
${prefix}prefix
    Sets the server's command prefix. Admins only.
    Admins may reset the prefix with the message 'resetprefix'.
${prefix}feedback
    Sends feedback to the maintainer of Sad Robot.
    Abuse of this will result in a ban.
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