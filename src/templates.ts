export const transferTemplate = `
Extract the following details for processing a transfer:
- **recipient** (string): An address receiving the funds.
- **amount** (number): The amount to transfer.
- **network** (string): The blockchain network to use. Allowed values are:
    static networks: {
        readonly flare: "flare";
        readonly coston2: "coston2";
        readonly songbird: "songbird";
        readonly coston: "coston";
    };

Provide the details in the following JSON format:
\`\`\`json
{
    "recipient": "<recipient>",
    "amount": <amount>,
    "network": "<network>"
}
\`\`\`

Example response for the transfer of 10 FLR tokens on Flare to the address 0x0123456789012345678901234567890123456789:
\`\`\`json
{
    "recipient": "0x0123456789012345678901234567890123456789",
    "amount": 10,
    "network": "Flare"
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the qeury:
{{recentMessages}}
`;



export const delegateTokensTemplate = `
Extract the following details for processing a delegation of tokens:
- **delegated** (string): An address receiving the delegation.
- **bips** (number): The amount of bips to delegate.
- **network** (string): The blockchain network to use. Allowed values are:
    static networks: {
        readonly flare: "flare";
        readonly coston2: "coston2";
        readonly songbird: "songbird";
        readonly coston: "coston";
    };

Provide the details in the following JSON format:
\`\`\`json
{
    "delegated": "<delegated>",
    "bips": <bips>,
    "network": "<network>"
}
\`\`\`

Example response for the delegation of 100 bips on Songbird to the address 0x0123456789012345678901234567890123456789:
\`\`\`json
{
    "delegated": "0x0123456789012345678901234567890123456789",
    "bips": 100,
    "network": "Songbird"
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the query:
{{recentMessages}}
`;

export const getStatsTemplate = `
Extract the following details for processing a query for stats of a network:
- **network** (string): The blockchain network to use. Allowed values are:
    static networks: {
        readonly flare: "flare";
        readonly coston2: "coston2";
        readonly songbird: "songbird";
        readonly coston: "coston";
    };

Provide the details in the following JSON format:
\`\`\`json
{
    "network": "<network>"
}
\`\`\`

Example response for the query about the stats of flare:
\`\`\`json
{
    "network": "flare"
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the query:
{{recentMessages}}
`;

export const wrapTokensTemplate = `
Extract the following details for processing a request for wrapping tokens:
- **amount** (number): The amount of tokens to wrap.
- **action** (string): The action for tokens to be done. Allowed values are:
    static actions: {
        readonly wrap: "wrap";
        readonly withdraw "withdraw";
    };
- **network** (string): The blockchain network to use. Allowed values are:
    static networks: {
        readonly flare: "flare";
        readonly coston2: "coston2";
        readonly songbird: "songbird";
        readonly coston: "coston";
    };

Provide the details in the following JSON format:
\`\`\`json
{
    "amount": <amount>,
    "action": "<action>",
    "network": "<network>"
}
\`\`\`

Example response for the request for wrapping 1000 FLR tokens:
\`\`\`json
{
    "amount": 1000,
    "action": "wrap",
    "network": "Flare"
}
\`\`\`

Example response for the request for unwrapping 100 Songbird tokens:
\`\`\`json
{
    "amount": 100,
    "action": "unwrap",
    "network": "Songbird"
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the query:
{{recentMessages}}
`;

export const readFeedTemplate = `
Extract the following details for processing a query for a token feed on the ftso:
- **feed** (string): The asset ID for the token the query is about (e.g., BTC, FLR, ETH).
- **network** (string): The blockchain network to use. Allowed values are:
    static networks: {
        readonly flare: "flare";
        readonly coston2: "coston2";
        readonly songbird: "songbird";
        readonly coston: "coston";
    };

Provide the details in the following JSON format:
\`\`\`json
{
    "feed": "<feed>",
    "network": "<network>"
}
\`\`\`

Example response for the query for the Bitcoin feed on Flare's FTSO:
\`\`\`json
{
    "feed": "BTC",
    "network": "Flare"
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the query:
{{recentMessages}}
`;

export const signMessageTemplate = `
Extract the following details for processing a signing of a message:
- **message** (string): The message that is to be signed.
- **network** (string): The blockchain network to use. Allowed values are:
    static networks: {
        readonly flare: "flare";
        readonly coston2: "coston2";
        readonly songbird: "songbird";
        readonly coston: "coston";
    };

Provide the details in the following JSON format:
\`\`\`json
{
    "network": "<network>",
    "message": "<message>"
}
\`\`\`

Example response for the request for signing the message "Hey, it's me!" on coston:
\`\`\`json
{
    "network": "coston",
    "message": "Hey, it's me!"
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the query:
{{recentMessages}}
`;

export const checkSignatureTemplate = `
Extract the following details for processing a request to check the message signature:
- **message** (string): The message that is to be signed.
- **signature** (string): The signature of the message that confirms the authenticity.
- **signerAddress** (string): The address of the account that signed the message.
- **network** (string): The blockchain network to use. Allowed values are:
    static networks: {
        readonly flare: "flare";
        readonly coston2: "coston2";
        readonly songbird: "songbird";
        readonly coston: "coston";
    };

Provide the details in the following JSON format:
\`\`\`json
{
    "network": "<network>",
    "message": "<message>",
    "signature": "<signature>",
    "signerAddress": "<signerAddress>"
}
\`\`\`

Example response for the request for checking the signature "0x0123..."
for the message "Hey!" from 0x0123456789012345678901234567890123456789 on Flare:
\`\`\`json
{
    "network": "Flare",
    "message": "Hey!",
    "signature": "0x0123...",
    "signerAddress": "0x0123456789012345678901234567890123456789"
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the query:
{{recentMessages}}
`;

export const signTokenTransferTemplate = `
Extract the following details for processing a request to sign a token transfer:
- **amount** (number): The amount of tokens to be sent.
- **recipient** (string): An address receiving the funds.
- **duration** (number): The length of time the signature will be valid. The given time
    is changed into duration in seconds. (e.g. "1 hour" is changed to duration=3600)

Provide the details in the following JSON format:
\`\`\`json
{
    "amount": <amount>,
    "recipient": "<recipient>",
    "duration": <duration>,
}
\`\`\`

Example response for the request for signing token transfer for an amount of 100 with 
the duration of 1 hour to the address 0x1234...:
\`\`\`json
{
    "amount": 100,
    "recipient": "0x1234...",
    "duration: 3600,
}
\`\`\`

Here are the recent user messages for context, only use the older user commands if the latest does 
not provide all the details of the query:
{{recentMessages}}
`;