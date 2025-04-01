export const transferTemplate = `
{{recentMessages}}

Reading ONLY THE LAST message, extract the following details for processing a native transfer.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **recipient** (string): An address receiving the funds. This is an Ethereum address
    that starts with "0x" and has the length of 42.
- **amount** (number): The amount to transfer. This has to be larger than 0.
- **network** (string): The blockchain network to use. Receive it from the user
    or deduce it from the currency symbol (FLR is flare, C2FLR is coston2, SGB is
    songbird and CFLR is coston). Allowed values are:
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
    
Example response for the transfer of 10 FLR tokens on Flare to the address 0x01234...:
\`\`\`json
{
    "recipient": "0x01234...",
    "amount": 10,
    "network": "Flare"
}
\`\`\`
`;

export const delegateTokensTemplate = `
{{recentMessages}}

Reading ONLY THE LAST message, extract the following details for a delegation of tokens.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **delegated** (string): An address receiving the delegation. This is an Ethereum
    address that starts with "0x" and has the length of 42.
- **bips** (number): The amount of bips to delegate. This has to be larger than 0.
- **network** (string): The blockchain network to use. Receive it from the user
    or deduce it from the currency symbol (FLR is flare, C2FLR is coston2, SGB is
    songbird and CFLR is coston). Allowed values are:
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

Example response for the delegation of 100 bips on Songbird to the address 0x01234...:
\`\`\`json
{
    "delegated": "0x01234...",
    "bips": 100,
    "network": "Songbird"
}
\`\`\`
`;

export const getStatsTemplate = `
{{recentMessages}}

Read ONLY THE LAST message, extract the following details for processing a 
query for stats of a network.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
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
`;

export const wrapTokensTemplate = `
{{recentMessages}}

Reading ONLY THE LAST message, extract the following details for processing 
a request for wrapping tokens or withdrawing wrapped tokens.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **amount** (number): The amount of tokens to wrap. This has to be larger than 0.
- **action** (string): The action for tokens to be done. Allowed values are:
    static actions: {
        readonly wrap: "wrap";
        readonly withdraw: "withdraw";
    };
- **network** (string): The blockchain network to use. Receive it from the user
    or deduce it from the currency symbol (FLR is flare, C2FLR is coston2, SGB is
    songbird and CFLR is coston). Allowed values are:
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
    "action": "withdraw",
    "network": "Songbird"
}
\`\`\`
`;

export const readFeedTemplate = `
{{recentMessages}}

Reading ONLY THE LAST message, extract the following details for processing 
a query for a token feed on the ftso.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
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
`;

export const signMessageTemplate = `
{{recentMessages}}

Read ONLY THE LAST message, extract the following details for processing a signing of a message.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **message** (string): The message that is to be signed.

Provide the details in the following JSON format:
\`\`\`json
{
    "message": "<message>"
}
\`\`\`

Example response for the request for signing the message "Hey, it's me!":
\`\`\`json
{
    "message": "Hey, it's me!"
}
\`\`\`

`;

export const checkSignatureTemplate = `
{{recentMessages}}

Reading ONLY THE LAST message, extract the following details for processing a 
request to check the message signature.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **message** (string): The message of which the signature is to be checked.
- **signature** (string): The signature of the message that confirms the authenticity.
    It starts with "0x" and has the length of 132.
- **signerAddress** (string): The address of the account that signed the message.
    This is an Ethereum address that starts with "0x" and has the length of 42.

Provide the details in the following JSON format:
\`\`\`json
{
    "message": "<message>",
    "signature": "<signature>",
    "signerAddress": "<signerAddress>"
}
\`\`\`

Example response for the request for checking the signature "0x9876..."
for the message "Hey!" from 0x01234...:
\`\`\`json
{
    "message": "Hey!",
    "signature": "0x9876...",
    "signerAddress": "0x01234..."
}
\`\`\`
`;

export const signAuthorizationTemplate = `
{{recentMessages}}

Reading ONLY THE LAST message, extract the following details for processing 
a request for getting a signature of an authorized token transfer
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **amount** (number): The amount of tokens to be sent. This has to be larger than 0.
- **recipient** (string): An address receiving the funds. This is an Ethereum address
    that starts with "0x" and has the length of 42.
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
`;

export const signIntermediaryTemplate = `
{{recentMessages}}

Reading ONLY THE LAST message, extract the following details for processing 
a request for getting a signature for an intermediary of a token transfer.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **amount** (number): The amount of tokens to be sent. This has to be larger than 0.
- **recipient** (string): An address receiving the funds. This is an Ethereum address
    that starts with "0x" and has the length of 42.
- **duration** (number): The length of time the signature will be valid. The given time
    is changed into duration in seconds. (e.g. "1 hour" is changed to duration=3600)
- **nonce** (number): The number that is used as a nonce for the transfer. 
- **fee** (string): The number that the user is paying the token transfer executor.
    This must be a number smaller than *amount* and is usually very small. It is saved
    in decimal format as a string type. This has to be larger than 0.

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

Example response for the request for a signature of a token transfer to the address 0x1234...
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
`;
