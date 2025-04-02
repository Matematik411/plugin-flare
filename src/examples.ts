import { ActionExample } from "@elizaos/core";

export const getNetworkStatsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `What are the stats of the Flare network like?`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `You are requesting the stats of a network. Selected network is Flare. Please confirm this.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, it's correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Thank you for confirming. Fetching their stats.`,
                action: "GET_NETWORK_STATS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Tell me the stats of coston2 network`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you're making a query about the stats of the coston2 network.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `I'm confirming the request.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `These are the stats.`,
                action: "GET_NETWORK_STATS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Can you tell me the stats of the network?`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Sure thing. Which of the networks are you interested in?`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Coston`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before making the action, please confirm that you want to get the stats for the coston 
                network.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `That's correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Here are the stats.`,
                action: "GET_NETWORK_STATS",
            },
        },
    ],
]

export const getTransferExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like to make a native token transfer. Send 100 SGB on the songbird network to the address
                0x0123456789012345678901234567890123456789.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm, that I understood all the parameters correctly. You wish to do a native token 
                transfer to the address 0x0123...6789 with the amount of 100 on the songbird network.`,
                action: "NONE"
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `That's exactly correct. Make the transfer.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Thank you for confirming. I am sending the tokens now.`,
                action: "NATIVE_TRANSFER"
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Send 0.123 of coston2 tokens to the address 0x0123456789012345678901234567890123456789 please.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before I can send the tokens, I require your confirmation, that the request is exactly the 
                following. You wish to send 0.123 C2FLR tokens on the coston2 network to the address of 0x0123...6789.`,
                action: "NONE"
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `That's right.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Making a transaction now.`,
                action: "NATIVE_TRANSFER"
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: { text: `Please send 10 native tokens!` },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I need more information about that request. Please provide a valid transfer recipient address and 
                a network to make the transfer on.`,
                action: "NONE"
            },
        },
        {
            user: "{{user1}}",
            content: { text: `Do it on Flare.` },
        },
        {
            user: "{{agent}}",
            content: {
                text: `You have provided the network, please also provide the recipient address.`,
                action: "NONE"
            },
        },
        {
            user: "{{user1}}",
            content: { text: `Send them to 0x0123456789012345678901234567890123456789.` },
        },
        {
            user: "{{agent}}",
            content: {
                text: `To avoid mistakes, please confirm that you requested a transfer of 10 FLR on the flare network
                to the address of 0x0123...6789.`,
                action: "NONE"
            },
        },
        {
            user: "{{user1}}",
            content: { text: `Yes.` },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Making the transfer.`,
                action: "NATIVE_TRANSFER"
            },
        },
    ],
]

export const getReadFeedExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `What is the value of Bitcoin on the Flare's FTSO?`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you want to read the BTC feed value from Flare network's FTSO.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, that's correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Reading the value of the BTC feed now.`,
                action: "READ_FEED",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Can you read XRP's (Ripple) feed on Flare FTSO?`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before proceeding, please confirm you want me to read the XRP feed value from Flare network's FTSO.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Confirmed.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Reading the XRP feed now.`,
                action: "READ_FEED",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Tell me the FLR feed value.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Yes I will, please tell me on which network do you want me to read it.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Use Songbird's FTSO.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you want the FLR feed value from Songbird network's FTSO.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, that's what I want.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `The value of the FLR feed is the following.`,
                action: "READ_FEED",
            },
        },
    ],
]

export const getWrapTokensExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Wrap 10 C2FLR.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you want to wrap 10 C2FLR tokens on the Coston2 network.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `That's correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Wrapping your tokens.`,
                action: "WRAP_TOKENS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Please wrap 100 of my coston2 tokens.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before proceeding, please confirm you want to wrap 100 C2FLR tokens on the Coston2 network.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, proceed.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Sure thing, I'll wrap your coston2 tokens.`,
                action: "WRAP_TOKENS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Wrap 0.123 of my tokens.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I can wrap the requested tokens, only after you tell on which network do you want to wrap them.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `On songbird.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you wish to wrap your songbird tokens. The amount to be wrapped is 0.123.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Confirmed.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I will now wrap the requested amount of tokens.`,
                action: "WRAP_TOKENS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Withdraw 1000 of my wrapped Songbird tokens.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you want to withdraw (unwrap) 1000 WSGB tokens on the Songbird network.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, that's right.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I will withdraw your Songbird tokens.`,
                action: "WRAP_TOKENS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I wish to withdraw 250 of my wrapped tokens on the Flare network.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before withdrawing your tokens please confirm that the amount of 250 and the network Flare are
                correctly understood.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `They're correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Alright, I will do it right now.`,
                action: "WRAP_TOKENS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Unwrap 200 of my tokens.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `On which network?`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Unwrap 200 of my CFLR tokens on coston network.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I need you to confirm the accuracy of the understood request. You want to unwrap (withdraw) 200
                WCFLR on the coston network. Please confirm this.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Confirming.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I will unwrap the requested tokens.`,
                action: "WRAP_TOKENS",
            },
        },
    ],
]

export const getDelegateTokensExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like you to delegate 1000 bips of my wrapped tokens on the Songbird network to the 
                address of 0x0123456789012345678901234567890123456789.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you want to delegate 1000 bips (10%) of your WSGB tokens on Songbird network to 
                address 0x0123...6789.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, that's correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Alright, I'll delegate them now.`,
                action: "DELEGATE_TOKENS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Delegate 10 bips to 0x0123456789012345678901234567890123456789 on Flare.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before making the action, please confirm you wish to delegate 10 bips (0.1%) of your WFLR tokens
                to the address of 0x0123...6789.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Confirming the request.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Delegating now.`,
                action: "DELEGATE_TOKENS",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I want to delegate my wrapped tokens to the address 0x0123456789012345678901234567890123456789, 
                2500 bips of value.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I can do that for you. Please provide the network you want to do the delegating on.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `On songbird.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I require confirmation of your request. The request is for a delegation of 2500 bips (25%) to the
                address 0x0123...6789 on the songbird network.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Confirming.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I am delegating the requested amount.`,
                action: "DELEGATE_TOKENS",
            },
        },
    ],
]

export const getSignMessageExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Sign the message "This message.".`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before signing, please confirm you want to sign the exact message: "This message."`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Confirmed.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Giving you the signature for it.`,
                action: "SIGN_MESSAGE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Generate the signature for the following message "Click for free tokens!".`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm that the message you wish to sign is "Click for free tokens!".`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `That's correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `This is the signature for the given message.`,
                action: "SIGN_MESSAGE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Give me the Ethereum signature of the message.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `What is the message you want to sign?.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Oh, the message is "I did this!".`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Confirm, if I understood the request correctly. You wish to sign a message "I did this!".`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `You understood correctly. Please generate the signature.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I am signing the given message with your address.`,
                action: "SIGN_MESSAGE",
            },
        },
    ],
]

export const getCheckSignatureExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Check the signature 0x0123... for the message "Wow!" from
                0x0123456789012345678901234567890123456789.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you want to verify signature 0x0123... for message "Wow!" from address 
                0x0123...6789.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, verify it.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I'll check the validity of the message for you now.`,
                action: "CHECK_SIGNATURE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Please verify that the signature 0x0123... for the message "Some awesome saying" from the address
                0x0123456789012345678901234567890123456789 is correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before verifying the signature, I am required to check with you, if all the parameters were 
                understood correctly. The given signature is 0x0123..., the signer's address is 0x0123...6789 and the 
                original message is "Some awesome saying".`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Everything was understood correctly.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Checking the validity now.`,
                action: "CHECK_SIGNATURE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I received a message "free tokens" and its signature 0x0123... Please verify the signature.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Sure thing. I'm just going to need the address that claims to have signed the message.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Of course, the sender's address is "0x0123456789012345678901234567890123456789".`
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `You are requesting a signature verification for the message "free tokens" with the signature of
                0x0123... from the address 0x0123...6789. Please confirm this.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Confirming.`
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Great, I am checking the signature now.`,
                action: "CHECK_SIGNATURE",
            },
        },
    ],
]

export const getSignAuthorizationExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like to make an authorized token transfer with a signature. Let the transfer have the 
                following properties: recipient=0x0123456789012345678901234567890123456789, amount=15, nonce=1.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm you want to authorize a transfer of 15 tokens to address 0x0123...6789 with nonce 
                of 1.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `That's correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I will do that now.`,
                action: "SIGN_AUTHORIZATION",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I want to make an authorized token transfer of 100 tokens to the address of 
                0x0123456789012345678901234567890123456789. Set the nonce to 23.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Before making a transaction, please confirm that you made a request for an authorized token 
                transfer to the address 0x0123...6789 of 100 tokens with the nonce 23.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `I'm confirming.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Alright, doing that now.`,
                action: "SIGN_AUTHORIZATION",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Please do an authorized token transfer to the address 0x0123456789012345678901234567890123456789 
                with the amount of 123.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I can do that, but you first need to tell me the nonce you want to use for this authorized 
                transfer.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Of course, I forgot to write it. Let the nonce be 11.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `To avoid mistakes, I require a confirmation of correct parameters. Please tell me if any of the
                following values are wrong. You requested an authorized token transfer to the address of 0x0123...6789
                with the amount of 123 tokens and nonce of 11.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `All the values are correct. Make the transaction.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I'll sign the given transfer now.`,
                action: "SIGN_AUTHORIZATION",
            },
        },
    ],
]

export const getSignIntermediaryExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like a signature for the following token transfer request through an intermediary: 
                recipient=0x0123456789012345678901234567890123456789, amount=15, fee=0.0000000015, duration=1 hour, 
                nonce=1.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Please confirm the details for the generation of signatures for an intermediary: recipient 
                0x0123...6789, amount 15, fee 0.0000000015, duration 1 hour, nonce 1.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes, all details are correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `The signatures are the following.`,
                action: "SIGN_INTERMEDIARY",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Can you generate signatures for the intermediary about a token transfer to the address of 
                0x0123456789012345678901234567890123456789, with amount of 99 and nonce 111. I have to pay the fee of 
                0.0000000212. Let the signatures be valid for 1 day.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I require your confirmation, that all the following values are accurate. Target address is 
                0x0123...6789, amount is 99, nonce is 111, duration of signature validity is 1 day and the fee is 
                0.0000000212.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `All the values are correct.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Thank you, generating the signatures now.`,
                action: "SIGN_INTERMEDIARY",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Give me a signature for a token transfer to the address 
                0x0123456789012345678901234567890123456789 with amount of 123 and nonce 22.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `To generate the signatures I still need the fee you'd like to pay to the intermediary and the 
                duration of the signatures' validity.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes of course, let the signatures be valid for 12 hours. The fee for the intermediary is 
                0.000000000001`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `You are requesting the intermediary signatures for the transfer to 0x0123...6789 with the amount
                of 123 and nonce 22. The duration is 12 hours and the fee is 0.000000000001. Please confirm everything
                is as you requested, to avoid making any mistakes.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `All the values are as requested.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Thank you. I will generate the signatures for you now.`,
                action: "SIGN_INTERMEDIARY",
            },
        },
    ],
]
