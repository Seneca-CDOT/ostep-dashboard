### Dev Run

`npm run dev`

### Docker

`docker build -t slack-service .`

`docker run -p 8081:2001 -d slack-service`

## Instructions

### Create a secret_webhooks.json file local to service.js

Add this code: 

{
    "RA":"webhook_url"
}

Where RA is the name of the Research Assistant and webhook_url is the webhook url.

Note: These should be ignored in .gitignore and not be shared to the public.
