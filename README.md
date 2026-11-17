# Ramu plugin template

A working plugin for [Ramu](https://getramu.dev), Claude Code and Codex: a manifest, one skill, a small MCP server and a rule. Use it with **Use this template** on GitHub, or run `ramu plugin new <name>` (add `--mcp` for the server, `--cli` for a CLI-driven platform).

## Make it yours

1. Rename `my-plugin` in `.claude-plugin/plugin.json`, `skills/my-plugin/` and `.mcp.json`.
2. Describe the service in the manifest's `description`, and what an agent should do with it in `skills/<name>/SKILL.md`.
3. Fill in Ramu's fields under `extensions["dev.getramu"]` (other tools ignore them):
   - `credentials`: the token the person pastes once, the page where it is made and the scope to pick. Ramu keeps it in the host's credential store and gives it only to this plugin's MCP servers, CLI and data sources, in their environment.
   - `cli`: the CLI's name, an npm package to run through `npx` when it is not installed, and the argument prefixes that only read. Agents run it with `platform_cli`; every other command asks the person.
   - `abilities`: which MCP tool runs image generation, web search or another ability.
   - `dataSources`: tables a Ramu dashboard can read, declared without code.
   - `stacks`, `keywords` and `requires.ramu`.

   Each field is documented in [the plugins guide](https://github.com/akalstack/ramu/blob/main/docs/guide/plugins.md), and editors check the manifest against `https://getramu.dev/schema/plugin.json`.

## Try it

```sh
npm install                # the MCP server's dependencies
ramu plugin dev .          # install this folder on your host as a Development plugin
ramu plugin check .        # validate the manifest, skills, servers and ability mappings
```

A Development plugin reloads when a file changes, so a new thread picks up your edits.

## Get it listed

Sign the commit you want listed, then open a pull request adding it to [akalstack/ramu-plugins](https://github.com/akalstack/ramu-plugins):

```sh
git config gpg.format ssh
git config user.signingkey ~/.ssh/id_ed25519.pub
git commit -S -m "Release 0.1.0"
```

The index entry names your public signing key, and Ramu installs only commits signed by it. CI here runs `ramu plugin check` on every push.
