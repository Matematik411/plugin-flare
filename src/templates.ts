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

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
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

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
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

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
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

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
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

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
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

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
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

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
`;

export const signAuthorizationTemplate = `
Extract the following details for processing a request for getting a signature of an
authorized token transfer:
- **amount** (number): The amount of tokens to be sent.
- **recipient** (string): An address receiving the funds.
- **nonce** (number): The number that is used as a nonce for the transfer. 

Provide the details in the following JSON format:
\`\`\`json
{
    "amount": <amount>,
    "recipient": "<recipient>",
    "nonce": <nonce>,
}
\`\`\`

Example response for the request for signing an authorized token transfer to the address 0x1234...
for an amount of 12 tokens. Let the nonce be 11:
\`\`\`json
{
    "amount": 12,
    "recipient": "0x1234...",
    "nonce": 11,
}
\`\`\`

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
`;

export const signIntermediaryTemplate = `
Extract the following details for processing a request for getting a signature of typed
data for an intermediary:
- **amount** (number): The amount of tokens to be sent.
- **recipient** (string): An address receiving the funds.
- **duration** (number): The length of time the signature will be valid. The given time
    is changed into duration in seconds. (e.g. "1 hour" is changed to duration=3600)
- **nonce** (number): The number that is used as a nonce for the transfer. 
- **fee** (string): The number that the user is paying the token transfer executioner.
    This must be a number smaller than *amount* and is usually very small. It is saved
    in decimal format as a string type.

Provide the details in the following JSON format:
\`\`\`json
{
    "amount": <amount>,
    "recipient": "<recipient>",
    "duration": <duration>,
    "nonce": <nonce>,
    "fee": "<fee>",
}
\`\`\`

Example response for the request for a signature of a token transfer to the address 0x1234
for an amount of 5 and the fee of 0.000000001. The signature has the duration of 1 hour and nonce of 42:
\`\`\`json
{
    "amount": 5,
    "recipient": "0x1234...",
    "duration: 3600,
    "nonce": 42,
    "fee": "0.000000001",
}
\`\`\`

{{recentMessages}}
Use only the last recent message to extract the needed information.
If not all parameters are given, ask for them.
Only use older messages if the uses specifically asks to read information from them.
`;
// Here are the recent user messages for context. Do not use them unless the user
// asks to use previously given information.
// {{recentMessages}}