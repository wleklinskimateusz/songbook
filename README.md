# Songbook

This app lets users save their favourite songs to sing & play

## Technology

- React 18.2.0
- Typescript 4.7.4
- Node 16.16

## Setup

- clone repository
- go to the root directory
- run `npm install` to install all required dependecies
- run `npm run start` to run the app locally

## Tests

- Each functionality or component is tested in its own test file (with `.test.tsx` or `.test.ts` extension).
- to run tests run `npm run test`

## Storybooks

- To each component storybook should be created with the `*.stories.tsx` extension.

- run `npm run storybook` to run storybook

## Workflow

- the backlog is a list of tasks that need to be done and it is located in the issues section of the repository.
- You can assign yourself to a task by clicking on the assignee icon in the issue and move the task to the `in progress` section.
- Before starting a task, create a branch with the name of the task and a category. For example: `feature/add-song-to-playlist`. Available categories are:
  - `feature`
  - `bug`
  - `docs`
  - `refactor`
  - `layout`
- When you are done with a task, create a pull request, and check if all the checks are passed. If they are, request a Code Review from someone in the team.
- When a Code Review is approved and the checks are passed, merge the pull request.

## Live

- if you want to visit running website go: [https://wleklinskimateusz.github.io/songbook/](https://wleklinskimateusz.github.io/songbook/)
