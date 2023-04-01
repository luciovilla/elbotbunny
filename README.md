# [El Bot Bunny](https://elbotbunny.com)

This project generates Bad Bunny lyrics using AI.

## How it works

This project uses the [ChatGPT API](https://openai.com/api/), lyrics from [Genius API](https://docs.genius.com) and [Vercel Edge functions](https://vercel.com/features/edge-functions) with streaming. It constructs a prompt based on the form and user input, sends it to the chatGPT API via a Vercel Edge function, then streams the response back to the application.

## Running Locally

After cloning the repo, go to [OpenAI](https://beta.openai.com/account/api-keys) to make an account and put your API key in a file called `.env.local`: (copy the example one `.env.example` and rename it to `.env.local`.

Install dependencies:

```bash
yarn
```

Then run the application:

```bash
yarn dev
```

And it will be available at `http://localhost:3000`.
