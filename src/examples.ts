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
                text: "Can you tell me the stats of the coston network?",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Yes, these are the stats.",
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
                text: "Send 10 CFLR2 to the address 0x0123456789012345678901234567890123456789",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Sending the C2FLR.",
                action: "TOKEN_TRANSFER",
            },
        }
    ],
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
                text: "I am now sending the coston2.",
                action: "TOKEN_TRANSFER",
            },
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
                text: "Please confirm that you are requesting a transfer of 10 FLR to the address of 0x0123456789012345678901234567890123456789.",
                action: "NONE"
            }
        },
        {
            user: "{{user1}}",
            content: { text: "Yes, that is correct." }
        },
        {
            user: "{{agent}}",
            content: {
                text: "Making the transaction.",
                action: "TOKEN_TRANSFER"
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
                text: "Tell me the FLR feed value on Songbird FTSO.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "The value of the FLR feed is the following.",
                action: "READ_FEED",
            },
        }
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
                text: "Wrap 0.123 of my songbird tokens.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will wrap the requested amount of tokens.",
                action: "WRAP_TOKENS",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "Withdraw 1000 of my Songbird tokens.",
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
                text: "Unwrap 200 CFLR on the coston network.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will unwrap the requested tokens.",
                action: "WRAP_TOKENS",
            },
        }
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
                text: "On songbird, I want to delegate to 0x0123456789012345678901234567890123456789, 2500 bips of value.",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will wrap the requested amount of tokens.",
                action: "DELEGATE_TOKENS",
            },
        }
    ]
]

export const getSignMessageExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Sign the message "This message." on Flare.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "Giving you the signature for that message.",
                action: "SIGN_MESSAGE",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: "On songbird, sign the message: I did this",
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will sign the given message.",
                action: "SIGN_MESSAGE",
            },
        }
    ]
]

export const getCheckSignatureExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Check the signature 0x0123... for the message "Wow!" from 0x9876... on Flare.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll check the validity of the message for you.",
                action: "CHECK_SIGNATURE",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `On songbird I received a message "free tokens" from address 0x9876..., verify its signature 0x0123... please.".`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I am checking the signature now.",
                action: "CHECK_SIGNATURE",
            },
        }
    ]
]

export const getSignAuthorizationExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Please sign an authorization for a token transfer to the address 0x1234... 
                with amount of 123 and nonce 22.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll sign the given transfer.",
                action: "SIGN_AUTHORIZATION",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like to authorize a token transfer with a signature. Let the
                transfer have the following properties: 
                recipient=0x1234..., amount=15, nonce=1.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will do that now.",
                action: "SIGN_AUTHORIZATION",
            },
        }
    ]
]
export const getSignIntermediaryExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: `Give me a signature for a token transfer to the address 0x1234... 
                with amount of 123 and nonce 22. 
                Let the signature be valid for 30 minutes and I'm paying 0.000001 of fee.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I'll sign the given transfer.",
                action: "SIGN_INTERMEDIARY",
            },
        }
    ],
    [
        {
            user: "{{user1}}",
            content: {
                text: `I would like a signature for the following token transfer request for
                through an intermediary: 
                recipient=0x1234..., amount=15, fee=0.0000000015, duration=1 hour, nonce=1.`,
            },
        },
        {
            user: "{{agent}}",
            content: {
                text: "I will do that now.",
                action: "SIGN_INTERMEDIARY",
            },
        }
    ]
]