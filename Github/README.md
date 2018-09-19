### Dev Run

`npm start`

### Docker

`docker build -t github-api .`

`docker run --env-file=token.env -i -t -p 4141:4141 -d github-api`

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/Seneca-CDOT/ostep-dashboard/blob/dashboard/GITHUB_API/LICENSE) file for details.

## Open Source Software Used

Node.JS + npm packages

## Instructions

npm install

### Create a token.env file local to service.js

Add this code: 

GITHUB_TOKEN="PLACEHOLDER"

Note: This key is called from the backend, so it should not be available to the public.
