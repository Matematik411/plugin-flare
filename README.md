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
CONTRACT_REGISTRY=0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019 # same on all networks
COSTON2_VERIFIER=0x64c68Fa45Ed8982FE44FaD6431e55bB575d54dB4 # coston 2
COSTON_VERIFIER=0x3bDe1A4e13023210981189bfBA84F33403Af5C6D # coston
```


## Features

- Make transactions
- Check balances
- Wrap, withdraw and delegate tokens 
- Read FTSO feeds
- Sign a string message and verify a signature of one
  
Examples can be seen in `examples.ts` and `templates.ts`.
