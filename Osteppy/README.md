### Dev Run

`npm run dev`

### Docker

`docker build -t slack-service .`

`docker run -p 8081:2001 -d slack-service`

## Instructions

## Set Osteppy environment token

Add this code local to the src folder: `ostep-dashboard/Osteppy/src`: 

SLACK_TOKEN="TOKEN_VALUE"

Note: This key is called from the backend, so it should not be available to the public.
