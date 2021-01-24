const helpText = (prefix) => `
\`\`\`

[[cardname]]................Fetch a card. Defaults to the image.
[[cardname | image ]].......Fetched the image(s) of the card.
[[cardname | oracle]].......Fetch a card's oracle text.
[[cardname | price]]........Fetch a card's price.
[[cardname | legal]]........Fetch a card's legality.
[[cardname | flavor]].......Fetch a card's flavor text.
[[cardname | unique]].......Fetch a linked list of all printings for a card.
[[ cardname | set | num ]]..Fetch a card by its collector number and set code.

You can fetch a specific set of a card.
You may use any other mode with this, and can add additional modes.
[[cardname | ktk]]
[[cardname | ktk | oracle | rules]]

Other commands:
${prefix}help
    Shows this help text.
${prefix}ping
    Tests the bot's connection to Discord.
${prefix}prefix
    Sets the server's command prefix. Admins only.
    Admins may reset the prefix with the message 'resetprefix'.
${prefix}feedback
    Sends feedback to the maintainer of ${process.env.BOT_NAME}.
    Abuse of this will result in a ban.
\`\`\`
`;

const greeting = (guildname, prefix) => `
Hi! My name is ${process.env.BOT_NAME}, I'm the resident MTG bot for ${guildname}.
I'm here to fetch MTG cards for you. I will look for any cards that are formatted like [[cardname]]!
You can specify as many cards as you'd like and I'll try to fetch them as fast as I can. Please be mindful
not to spam the chat though!

To get my help text for all of my functions, just type ${prefix}help either here or in ${guildname}.
`;

const onJoin = (guildname, selfName) => `
Hi! My name is ${selfName}, I'm excited to be a part of ${guildname}!

My primary function is to provide all manners of MTG related functions. I can fetch any card if you type
[[Solemn Simulacrum]] in any chat. I have a variety of different things that I can get, including specific set editions.

You should also know that I have the ability to change my command prefix (i.e. the symbol used before any command \`?help\`).
To set your prefix use the \`?prefix\` command and choose your symbol. I would not reccommend using the \`/\` symbol, since
Discord uses that for built in commands and that could get confusing.

In the event that you forget what prefix you've set, simply type \`resetprefix\` into any chat and I'll reset it to default.
You should also know that the only people who can use these commands are anyone with the 'Manage Roles' permission. This functionality is not available to
users of any other role.

If you'd like to see more of what I can do, just type \`?help\` here. Have fun!
`;

module.exports = { helpText, greeting, onJoin };
