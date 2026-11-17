// A minimal MCP server: one read-only tool. Install the SDK with `npm install @modelcontextprotocol/sdk zod`.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'

const server = new McpServer({ name: 'my-plugin', version: '0.1.0' })
server.registerTool(
  'status',
  { description: 'Read the status of the my-plugin account.', inputSchema: { verbose: z.boolean().optional() }, annotations: { readOnlyHint: true } },
  async () => {
    // The token arrives in the environment, never as an argument.
    const signedIn = Boolean(process.env.MY_PLUGIN_TOKEN)
    return { content: [{ type: 'text', text: JSON.stringify({ signedIn }) }] }
  },
)
await server.connect(new StdioServerTransport())
