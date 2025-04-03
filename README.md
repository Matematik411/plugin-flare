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
- For the web client run `pnpm start:client`

## Configuration

### Environment Variables

```env
# Flare wallet
FLARE_PRIVATE_KEY=<your-wallet-private-key>
```

### Contract addresses

Setup the contract addresses and their ABIs for the contracts sed by the agent. Main contracts are saved on the FlareContractRegistry smart contract which has fixed address and is already filled.


## Features

- Make transactions
- Check balances
- Wrap, withdraw and delegate tokens
- Read FTSO feeds
- Sign a string message and verify a signature of one
- Authorize a token transfer and send the signature to the external executor
- Generate signatures of a token transfer for an intermediary

The agent is able to recognize between the requests and execute the tasks with the given parameters. If any of the details required for the action are missing, it asks the user for them. Before executing any action, it asks for verification about the accuracy of the details. Only after the user agrees with them, the action is executed.

Example conversations of all the actions can be seen in `examples.ts`.
