export const transferTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about a native transfer, only after they
have been confirmed, extract the following details.
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
{
    "recipient": "<recipient>",
    "amount": <amount>,
    "network": "<network>"
}
    
Example response for the transfer of 10 FLR tokens on Flare to the address 0x01234...:
{
    "recipient": "0x01234...",
    "amount": 10,
    "network": "Flare"
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const delegateTokensTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about a wrapped token delegation, only 
after they have been confirmed, extract the following details.
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
{
    "delegated": "<delegated>",
    "bips": <bips>,
    "network": "<network>"
}

Example response for the delegation of 100 bips on Songbird to the address 0x01234...:
{
    "delegated": "0x01234...",
    "bips": 100,
    "network": "Songbird"
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const getStatsTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about a reading network stats, only after 
they have been confirmed, extract the following details.
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
{
    "network": "<network>"
}

Example response for the query about the stats of flare:
{
    "network": "flare"
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const wrapTokensTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about wrapping tokens, only after they
have been confirmed, extract the following details.
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
{
    "amount": <amount>,
    "action": "<action>",
    "network": "<network>"
}

Example response for the request for wrapping 1000 FLR tokens:
{
    "amount": 1000,
    "action": "wrap",
    "network": "Flare"
}

Example response for the request for unwrapping 100 Songbird tokens:
{
    "amount": 100,
    "action": "withdraw",
    "network": "Songbird"
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const readFeedTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about reading a FTSO feed, only after 
they have been confirmed, extract the following details.
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
{
    "feed": "<feed>",
    "network": "<network>"
}

Example response for the query for the Bitcoin feed on Flare's FTSO:
{
    "feed": "BTC",
    "network": "Flare"
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const signMessageTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about signing a text message, only after 
they have been confirmed, extract the following details.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **message** (string): The message that is to be signed. The user will point it
    out and it will be specifically marked in quotation marks, after a colon, in 
    brackets or in some other way.

Provide the details in the following JSON format:
{
    "message": "<message>"
}

Example response for the request for signing the message "Hey, it's me!":
{
    "message": "Hey, it's me!"
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const checkSignatureTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about checking a text message signature, 
only after they have been confirmed, extract the following details.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **message** (string): The message of which the signature is to be checked.
- **signature** (string): The signature of the message that confirms the authenticity.
    It starts with "0x" and has the length of 132.
- **signerAddress** (string): The address of the account that signed the message.
    This is an Ethereum address that starts with "0x" and has the length of 42.

Provide the details in the following JSON format:
{
    "message": "<message>",
    "signature": "<signature>",
    "signerAddress": "<signerAddress>"
}

Example response for the request for checking the signature "0x9876..."
for the message "Hey!" from 0x01234...:
{
    "message": "Hey!",
    "signature": "0x9876...",
    "signerAddress": "0x01234..."
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const signAuthorizationTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about signing an authorized transfer, 
only after they have been confirmed, extract the following details.
Do not take example values, they are required to be given from the user, use null 
for any values that cannot be determined. DO NOT use values from already completed 
actions UNLESS the user specifically asks to read them.
- **amount** (number): The amount of tokens to be sent. This has to be larger than 0.
- **recipient** (string): An address receiving the funds. This is an Ethereum address
    that starts with "0x" and has the length of 42.
- **nonce** (number): The number that is used as a nonce for the transfer. 

Provide the details in the following JSON format:
{
    "amount": <amount>,
    "recipient": "<recipient>",
    "nonce": <nonce>,
}

Example response for the request for signing an authorized token transfer to the address 0x1234...
for an amount of 12 tokens. Let the nonce be 11:
{
    "amount": 12,
    "recipient": "0x1234...",
    "nonce": 11,
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;

export const signIntermediaryTemplate = `
{{recentMessages}}

Reading the messages of the last exchange about a generating signatures for an intermediary, 
only after they have been confirmed, extract the following details.
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
{
    "amount": <amount>,
    "recipient": "<recipient>",
    "duration": <duration>,
    "nonce": <nonce>,
    "fee": "<fee>",
}

Example response for the request for a signature of a token transfer to the address 0x1234...
for an amount of 5 and the fee of 0.000000001. The signature has the duration of 1 hour and nonce of 42:
{
    "amount": 5,
    "recipient": "0x1234...",
    "duration: 3600,
    "nonce": 42,
    "fee": "0.000000001",
}

Before executing the action, ask for the confirmation from the user, about the
correctness of the understood values. If they are not confirmed, do not proceed 
with this action and disregard the request.
Provide the response ONLY as pure JSON without any Markdown formatting or additional text.
`;
