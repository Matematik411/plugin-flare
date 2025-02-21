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
    ]
]

export const getReadFeedExamples: ActionExample[][] = [
    [
        {
            user: "{{user1}}",
            content: {
                text: "What is the value of BTC on the FTSO?",
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
                text: "Tell me the FLR feed value on the FTSO.",
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