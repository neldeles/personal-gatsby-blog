---
date: '2021-10-18T21:44:18'
tags: ['storybook', 'chromatic']
title: Deploying Storybook 
published: true
description:
aliases:
references: ['https://storybook.js.org/tutorials/intro-to-storybook/react/en/deploy/']
---

# Deploying Storybook 

## Install Chromatic

Preferred platform of choice is Chromatic. So first install it as a dev dependency:
```bash
npm install -D chromatic
```

Once the package is installed, [login to Chromatic](https://www.chromatic.com/start) and create a project. Click `Choose GitHub repo` under collaborators and select your repo.

## Setup CI/CD

Setup CI/CD so that we publish the latest version of components whenever we push code. We will be using [GitHub Actions](https://github.com/features/actions). 

### Add a GitHub Action to deploy Storybook

In the root folder of our project, create a new directory called `.github` then create another `workflows` directory inside of it.

Create a new file called `chromatic.yml` like the one below. Make sure to replace `CHROMATIC_PROJECT_TOKEN`with your project token if you are not using environment variables.
```yaml
# Workflow name
name: 'Chromatic Deployment'

# Event for the workflow
on: push

# List of jobs
jobs:
  test:
    # Operating System
    runs-on: ubuntu-latest
    # Job steps
    steps:
      - uses: actions/checkout@v1
      - run: yarn
        #👇 Adds Chromatic as a step in the workflow
      - uses: chromaui/action@v1
        # Options required for Chromatic's GitHub Action
        with:
          #👇 Chromatic projectToken, see https://storybook.js.org/tutorials/intro-to-storybook/react/en/deploy/ to obtain it
          projectToken: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
          token: ${{ secrets.GITHUB_TOKEN }}
```

#### PostCSS 8 issue

Was encountering the error: `twin.macro: PostCSS plugin postcss-nested requires PostCSS 8.` during build of the Github Action CI/CD. Problem is caused by [`create-react-app` and lack of PostCSS 8 support](https://github.com/facebook/create-react-app/pull/9716). This is actually mentioned in [Tailwind's installtion guide](https://tailwindcss.com/docs/guides/create-react-app) for CRA, but is not mentioned in Twin's installation guide for CRA.

Solution is to use Tailwind's compatibility mode: [Installation - Tailwind CSS](https://tailwindcss.com/docs/installation#post-css-7-compatibility-build)





# Footer

---
## Related

---

## References
- https://storybook.js.org/tutorials/intro-to-storybook/react/en/deploy/