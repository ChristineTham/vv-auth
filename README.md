# Visual Voyager Experimental Site with Authentication
[![Netlify Status](https://api.netlify.com/api/v1/badges/b60a1d1f-7dfe-468b-984e-ca8affbbbc85/deploy-status)](https://app.netlify.com/sites/vv-auth/deploys)

Playground for experimenting on an Astro version of Visual Voyager based on the following:

- impulse template, converted to Astro
- unocss

[![Deploy to Netlify Button](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/ChristineTham/vv-auth?utm_campaign=template-team&utm_source=dtn-button&utm_medium=dtn-button&utm_term=astro-tt-dtn-button&utm_content=astro-tt-dtn-button)


## Table of Contents:

- [Visual Voyager Experimental Site with Authentication](#visual-voyager-experimental-site-with-authentication)
  - [Table of Contents:](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Running locally with the Netlify CLI](#running-locally-with-the-netlify-cli)
  - [Deploy to Netlify](#deploy-to-netlify)
    - [Deploying using the Netlify CLI](#deploying-using-the-netlify-cli)
      - [1. Cloning + Install Packages](#1-cloning--install-packages)
      - [2. Deploying](#2-deploying)
  - [Forms](#forms)
    - [Adding a custom submission page](#adding-a-custom-submission-page)
    - [Blocking bot spam with a honeypot field](#blocking-bot-spam-with-a-honeypot-field)
    - [Forms Resources](#forms-resources)
  - [Netlify Functions](#netlify-functions)
    - [Netlify Functions Resources](#netlify-functions-resources)
  - [Redirects](#redirects)
    - [Example](#example)
    - [Redirect Resources](#redirect-resources)
  - [Astro + Netlify Resources](#astro--netlify-resources)
  - [Project Structure](#project-structure)
  - [Commands](#commands)

## Getting Started

If you want to get started locally, you can clone the project, install the dependencies and run the dev command!

```
git clone https://github.com/ChristineTham/vv-auth/
cd vv-auth
pnpm install
pnpm run dev
```

You can then open up <http://localhost:3000> with your browser to see the result! Open up `pages/index.astro` and modify the code to see the changes auto update as you save.

> 🧠 Just a heads up, you will not be able to see the function data or redirect output until you run locally with `netlify dev` (info below in [Netlify CLI section](#running-locally-with-the-netlify-cli))

### Running locally with the Netlify CLI

When using this template, you might want to see Netlify features such as redirects, functions, or preview the deploy locally first. To do, this you can install and use the Netlify CLI!

```
pnpm install -g netlify-cli # to install the Netlify CLI tool globally
netlify dev
```

And now your project should be running on <http://localhost:8888>.

## Deploy to Netlify

### Deploying using the Netlify CLI

#### 1. Cloning + Install Packages

- Clone this repo with one of these options:

  - Click the 'Use this template' button at the top of the page
  - Or via the command line `git clone https://github.com/ChristineTham/vv-auth`

- Then install the necessary packages and run the project locally to make sure everything works.

  ```bash
  pnpm install
  pnpm run dev
  ```

> Alternatively, you can run this locally with [the Netlify CLI](https://docs.netlify.com/cli/get-started/)'s by running the `netlify dev` command for more options like receiving a live preview to share (`netlify dev --live`) and the ability to test [Netlify Functions](https://www.netlify.com/products/functions) and [redirects](https://docs.netlify.com/routing/redirects/).

#### 2. Deploying

- Install the Netlify CLI globally `pnpm install netlify-cli -g`
- Run `pnpm run build`

- Then use the `netlify deploy` for a deploy preview link or `netlify deploy --prod` to deploy to production

Here are a few other ways you can deploy this template:

- Use the Netlify CLI's create from template command `netlify sites:create-template vv-auth` which will create a repo, Netlify project, and deploy it
- If you want to utilize continuous deployment through GitHub webhooks, run the Netlify command `netlify init` to create a new project based on your repo or `netlify link` to connect your repo to an existing project

## Forms

Netlify Forms are a way to wire up your native HTML into being able to seamlessly handle submissions. To get a form working, we need to add two extra things:

1. An extra attribute on the `form` tag, `netlify`

Adding this attribute to our `form` tag will let Netlify know when it loads the page, that it needs to be aware of submissions made through it.

2. A hidden input in the form, `<input type="hidden" name="form-name" value="feedback" />`

Adding this extra input allows our form to be given a name that Netlify can store submissions to. It is a hidden input so your users won't see it but it will pass along the name of our form to Netlify when we submit. In our Netlify Admins site under Forms, we will see our Active Form named `feedback` and all submissions will go there.

With both of those we're ready for folks to give us feedback!

### Adding a custom submission page

While Netlify provides a default submission page for folks, we can customize it as well! With the `action` attribute on the `form` tag we will be able to direct our users to our own page.

In [`components/FeedbackForm.js`](https://github.com/netlify-templates/astro-toolbox/blob/main/src/components/FeedbackForm.astro) you'll see the form has the attribute `action="/success"` this will take our user to the custom route `/success` which we created under [`pages/success.js`](https://github.com/netlify-templates/astro-toolbox/blob/main/src/pages/success.astro). As long as the page exists, you can direct folks to it!

### Blocking bot spam with a honeypot field

Many bots scan through webpages and try to see what pages and forms they can get access to. Instead of letting our website receive spam submissions, we can filter out unrelated submissions with a visually-hidden input field.

```html
<p class="hidden">
  <label>
    Don’t fill this out if you’re human: <input name="bot-field" />
  </label>
</p>
```

Since screenreader users will still have this announced, it is important for us to
communicate that this is a field not meant to be filled in.

For this to work we also need to add a `netlify-honeypot` attribute to the form element.

```html
<form netlify data-netlify-honeypot="bot-field" name="feedback method="POST" action="/success"></form>
```

[See it here in the template code.](https://github.com/netlify-templates/next-toolbox/blob/main/components/FeedbackForm.js#L8)

### Forms Resources

- [Netlify Forms Setup](https://docs.netlify.com/forms/setup/)
- [Netlify Forms](https://www.netlify.com/products/forms/#main)
- [Netlify Forms - Form Triggered Functions](https://docs.netlify.com/functions/trigger-on-events/)
- [Netlify Forms - Using reCAPTCHA 2](https://docs.netlify.com/forms/spam-filters/#recaptcha-2-challenge)

## Netlify Functions

With Netlify, you can build out server-side code without having to setup and maintain a dedicated server. Inside of our default folder path, [`netlify/functions`](./netlify/functions) you can see an example of the format for JavaScript functions with the [`joke.js`](./netlify/functions/joke.js) file.

The function format expects an `async` function named `handler` to be exported.\*

```js
export const handler = async () => {
  // Your code goes in here!
}
```

- _Note: ESLint may report that the async is unnecessary if there is no `await` code within the function, but the `async` is required. Do not delete it._

This will be the function that will be invoked whenever a client makes a request to the generated endpoints. The endpoint's format is followed as `/.netlify/functions/joke`. So whenever the site is deployed, if you go to `https://<site base url>/.netlify/functions/joke` you will see a random joke!

> Side note: In our example, we're using `import` to include data from another location and `export const const handler` to let our function be consumed by Netlify. We're able to do this because of [esbuild](https://esbuild.github.io). This is a bundler configuration we set in our `netlify.toml` under `[functions]`.

### Netlify Functions Resources

There is quite a bit you can do with these functions, so here are some additional resources to learn more!

- [Netlify Function Format](https://docs.netlify.com/functions/build-with-javascript/#synchronous-function-format)
- [Build Netlify Functions with TypeScript](https://docs.netlify.com/functions/build-with-typescript/)
- [Event-triggered Functions](https://docs.netlify.com/functions/trigger-on-events/)
- [What are Background Functions](https://www.netlify.com/blog/2021/01/07/what-are-background-functions/)
- [Netlify Functions - Examples](https://functions.netlify.com/examples/)
- [Using esbuild as your bundler for new ECMAScript Features](https://www.netlify.com/blog/2021/04/02/modern-faster-netlify-functions/)

## Redirects

In the [`netlify.toml`](./netlify.toml) configuration file there is an example of how to implement redirects. Redirects can be used to do many things from redirecting Single Page Apps more predictably, redirecting based on country/language to leveraging On-Demand Builders for [Distributed Persistant Rendering](https://www.netlify.com/blog/2021/04/14/distributed-persistent-rendering-a-new-jamstack-approach-for-faster-builds/).

In the example we'll be using redirects to have a shorter endpoint to Netlify functions. By default, you call a Netlify function when requesting a path like `https://yoursite.netlify.com/.netlify/functions/functionName`. Instead, we'll redirect all calls from a path including `/api` to call on the Netlify functions. So the path will be `https://yoursite.netlify.com/api/functionName`, a lot easier to remember too.

### Example

```toml
[[redirects]]
from = "/api/*"
to = "/.netlify/functions/:splat"
status = 200
force = true
```

First, we create a section in the `.toml` for the redirect using `[[redirects]]`. Each redirect should have this line to start the redirect code, and the redirects will be executed in the order they appear in the `.toml` from top to bottom.

The bare minimum needed is the `from` and `to`, letting the [CDN](https://www.netlify.com/blog/edge-cdn-serverless-cloud-meaaning) know when a route is requested, the `from`, forward it on to another path, the `to`. In the example, we also added an 'Ok' status code, 200, and set the `force` to true to make sure it _always_ redirects from the `from` path.

There are many ways to use redirects. Check out the resouces below to learn more.

### Redirect Resources

- [Redirect syntax and configuration](https://docs.netlify.com/routing/redirects/#syntax-for-the-netlify-configuration-file)
- [Redirect options](https://docs.netlify.com/routing/redirects/redirect-options/)
- [Creating better, more predicatable redirect rules for SPAs](https://www.netlify.com/blog/2020/04/07/creating-better-more-predictable-redirect-rules-for-spas/)
- [Redirect by country or language](https://docs.netlify.com/routing/redirects/redirect-options/#redirect-by-country-or-language)
- [On-Demand Builders](https://docs.netlify.com/configure-builds/on-demand-builders/)

## Astro + Netlify Resources

Here are some resources to help you on your Astro + Netlify coding fun!

- [Astro on Netlify Integration Page](https://docs.netlify.com/integrations/frameworks/astro)

- [Build wicked fast sites with Astro: An Introduction](https://www.netlify.com/blog/2021/07/08/build-wicked-fast-sites-with-astro-an-introduction/#main)

- [A Template for Building Shopify Stores with Astro and the Storefront API](https://www.netlify.com/blog/2021/07/23/build-a-modern-shopping-site-with-astro-and-serverless-functions)

Hope this template helps :) Happy coding 👩🏻‍💻!

---

## Project Structure

Inside the project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.ico
├── src/
|   ├── config.ts
│   ├── assets/
│   │   └── image.jpg
│   ├── components/
│   │   └── navbar.astro
│   ├── content/
│   │   ├── config.ts
|   │   ├── blog/
|   │   |   └── post.md
|   │   └── category/
|   │       └── category.md
│   ├── layouts/
│   │   └── default.astro
│   └── pages/
│       ├── about.md
│       └── index.astro
├── astro.config.cjs
├── package.json
└── uno.config.ts
```

## Commands

All commands are run from the root of the project, from a terminal:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `pnpm install`     | Installs dependencies                        |
| `pnpm run dev`     | Starts local dev server at `localhost:3000`  |
| `pnpm run build`   | Build your production site to `./dist/`      |
| `pnpm run preview` | Preview your build locally, before deploying |
