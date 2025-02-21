# @elizaos/plugin-flare

A plugin for ElizaOS that enables interaction the network Flare, its Canary network Songbird and their testnets.

## ElizaOS setup of the package

The following steps allow running an agent with plugin-flare.
- Clone [elizaOS project](https://github.com/elizaOS/eliza)
- Setup .env file (look below)
- Copy the plugin folder into [packages](https://github.com/elizaOS/eliza/tree/main/packages) of the project
- Add `"@elizaos/plugin-flare": "workspace:*"`, to [agent/package.json](https://github.com/elizaOS/eliza/blob/main/agent/package.json)
- Setup the character you will use by modifying its *.character.json file:
  - Add `"@elizaos/plugin-flare"` in plugins
  - Change model of the character (if needed)
- Change the node to version at of at least `23.3.0`
- Run `pnpm install && pnpm build && pnpm start --characters="../characters/YOURCHARACTER.character.json"`
- Run `pnpm install && pnpm build && pnpm start --characters="../characters/c3po.character.json" `
- For the web client run `pnpm start:client`

## Configuration

### Environment Variables

```env
# Flare wallet
FLARE_PRIVATE_KEY=<your-wallet-private-key>

# Flare contract addresses
FLARE_FTSO=0xB18d3A5e5A85C65cE47f977D7F486B79F99D3d32 # flare
FLARE_WNAT=0x1D80c49BbBCd1C0911346656B529DF9E5c2F783d # flare
COSTON2_FTSO=0x3d893C53D9e8056135C26C8c638B76C8b60Df726 # coston 2
COSTON2_WNAT=0xC67DCE33D7A8efA5FfEB961899C73fe01bCe9273 # coston 2
COSTON2_VERIFIER=0x64c68Fa45Ed8982FE44FaD6431e55bB575d54dB4 # coston 2
SONGBIRD_FTSO=0x988C99423360C93F334f6F331Aa8A55cfFEd34B5 # songbird
SONGBIRD_WNAT=0x02f0826ef6aD107Cfc861152B32B52fD11BaB9ED # songbird
COSTON_FTSO=0x5BBCc7810D72Cc1720cC97aD144926E556bE1E93 # coston 
COSTON_WNAT=0x767b25A658E8FC8ab6eBbd52043495dB61b4ea91 # coston
COSTON_VERIFIER=0x3bDe1A4e13023210981189bfBA84F33403Af5C6D # coston
```


## Features

- Make transactions
- Check balances
- Wrap, withdraw and delegate tokens 
- Read FTSO feeds (currently only on coston2's FTSO)
- Sign a string message and verify a signature of one
  
Examples can be seen in `examples.ts` and `templates.ts`.
