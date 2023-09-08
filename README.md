# redirect-to-amazon
 Cloudflare Worker for redirecting to Amazon pages based on location

Primarily created for authors who need to redirect their Amazon links to the correct country, but can be adapted for any Amazon seller type.

## Usage
- Configure environment variables in `wrangler.example.toml`
- Rename `wrangler.example.toml` to `wrangler.toml`
- Deploy to Cloudflare Workers
- Configure your domain to be the Worker's route