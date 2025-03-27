import { ActionExample } from "@elizaos/core";

export const getNetworkStatsExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What are the stats of the Flare network like?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Let me fetch their stats.",
                action: "GET_NETWORK_STATS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Can you tell me the stats of the network?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sure thing. Which of the networks are you interested in?",
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Coston",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Here are the stats.",
                action: "GET_NETWORK_STATS",
            },
        }
    ],
]

export const getTransferExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Send 0.123 of coston2 to the address 0x0123456789012345678901234567890123456789",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Making a transaction now.",
                action: "NATIVE_TRANSFER"
            }
        }
    ],
    [
        {
            user: "{{user1}}",
            content: { text: "Please send 10 tokens!" }
        },
        {
            user: "{{agent}}",
            content: {
                text: "I need more information about that request. Please provide a valid address and a network to make the transaction on.",
                action: "NONE"
            }
        },
        {
            user: "{{user1}}",
            content: { text: "Do it on Flare." }
        },
        {
            user: "{{agent}}",
            content: {
                text: "You have provided the network, please also provide the recipient address.",
                action: "NONE"
            }
        },
        {
            user: "{{user1}}",
            content: { text: "Send them to 0x0123456789012345678901234567890123456789." }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Making the transaction.",
                action: "NATIVE_TRANSFER"
            }
        }
    ]
]

export const getReadFeedExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What is the value of BTC on the Flare's FTSO?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Reading the value of the Bitcoin feed now.",
                action: "READ_FEED",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Tell me the FLR feed value.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Yes I will, please tell me on which network's FTSO do 
                you want me to read it.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Use Songbird's FTSO.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The value of the Flare feed is the following.",
                action: "READ_FEED",
            },
        },
    ]
]

export const getWrapTokensExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Wrap 10 C2FLR.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sending your tokens.",
                action: "WRAP_TOKENS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Wrap 0.123 of my tokens.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I can wrap the requested tokens, after you tell on 
                which networks do you want to wrap them.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "On songbird.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will now wrap the requested amount of tokens.",
                action: "WRAP_TOKENS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Withdraw 1000 of my wrapped Songbird tokens.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will withdraw your Songbird tokens.",
                action: "WRAP_TOKENS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Unwrap 200 of my tokens.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "On which network?",
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: "Unwrap 200 of my CFLR tokens on coston network.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will unwrap the requested tokens.",
                action: "WRAP_TOKENS",
            },
        },
    ]
]

export const getDelegateTokensExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "Delegate 10 bips to 0x0123456789012345678901234567890123456789 on Flare.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sending your tokens.",
                action: "DELEGATE_TOKENS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I want to delegate my wrapped tokens to the address
                0x0123456789012345678901234567890123456789, 2500 bips of value.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I can do that for you. Please provide the network you want
                to do the delegating on.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Do it on songbird.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will wrap the requested amount of tokens.",
                action: "DELEGATE_TOKENS",
            },
        },
    ]
]

export const getSignMessageExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Sign the message "This message.".`,
            },
        },
        // {
        //     user: "{{agent}}",
        //     content: {
        //         text: `Please confirm that you are requesting the signature 
        //         for the message of "This message.".`,
        //         action: "NONE",
        //     },
        // },
        // {
        //     user: "{{user1}}",
        //     content: {
        //         text: `That's correct.`,
        //     },
        // },
        {
            user: "{{agent}}",
            content: {
                text: "Giving you the signature for it.",
                action: "SIGN_MESSAGE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Give me the Ethereum signature of the message: I did this",
            },
        },
        // {
        //     user: "{{agent}}",
        //     content: {
        //         text: `You're requesting a signature of the message: "I did this".
        //         Please confirm this.`,
        //         action: "NONE",
        //     },
        // },
        // {
        //     user: "{{user1}}",
        //     content: {
        //         text: "I confirm the request is correct.",
        //     },
        // },
        {
            user: "{{agent}}",
            content: {
                text: "I will sign the given message.",
                action: "SIGN_MESSAGE",
            },
        },
    ]
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
                text: "I'll check the validity of the message for you now.",
                action: "CHECK_SIGNATURE",
            },
        },
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I received a message "free tokens" and its signature 0x0123... 
                Please verify the signature.".`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `Sure thing. I'm just going to need the address that claims
                to have signed the message.`,
                action: "NONE",
            }
        },
        {
            user: "{{user1}}",
            content: {
                text: `Of course, the sender's address is 
                "0x0123456789012345678901234567890123456789".`
            }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Great, I am checking the signature now.",
                action: "CHECK_SIGNATURE",
            },
        },
    ]
]

export const getSignAuthorizationExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like to authorize a token transfer with a signature. Let the
                transfer have the following properties: 
                recipient=0x0123456789012345678901234567890123456789, amount=15, nonce=1.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will do that now.",
                action: "SIGN_AUTHORIZATION",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `Please sign an authorization for a token transfer to the 
                address 0x0123456789012345678901234567890123456789 
                with the amount of 123.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: `I can do that, but you first need to tell me the nonce
                you want to use for the authorized transfer.`,
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
                text: "I'll sign the given transfer now.",
                action: "SIGN_AUTHORIZATION",
            },
        }
    ],
]

export const getSignIntermediaryExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like a signature for the following token transfer request for
                through an intermediary: 
                recipient=0x0123456789012345678901234567890123456789, amount=15, 
                fee=0.0000000015, duration=1 hour, nonce=1.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will do that now.",
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
                text: `To generate the signatures I still need the fee you'd like
                to pay to the intermediary and the duration of the signatures'
                validity.`,
                action: "NONE",
            },
        },
        {
            user: "{{user1}}",
            content: {
                text: `Yes of course, let the signatures be valid for 1 day. 
                The fee for the intermediary is 0.000000000001`,
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