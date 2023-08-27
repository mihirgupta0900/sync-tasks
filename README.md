Sync the pull requests that you need to review to Todoist

## Usage

### 1. Create a Todoist App

Note: Ideally I would publish a Todoist app and use OAuth, but that is a future improvement that I will make.

1. Create a [Todoist](https://todoist.com/) account
2. Go to [Manage App](https://developer.todoist.com/appconsole.html)
3. Click on "Create a new app"
4. Fill in the App Name
5. Scroll down and click on "Create test token"
6. The above token is your `TODOIST_TOKEN`

To find the project id:

1. Go to the web version of [Todoist](https://todoist.com/)
2. Click on the project you want to use
3. The project id is the number in the url. Example: https://todoist.com/app/project/2313648356. The project id is `2313648356`

### 2. Deploy the API

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/dqd96n)

### 3. Create Github Webhook

1. Go to the repo you want to use
2. Click on "Settings"
3. Click on "Webhooks"
4. Click on "Add webhook"
5. Fill in the Payload URL with the url of the api. Example: https://sync-tasks.railway.app/github/webhook
6. Fill in the Content type with "application/json"
7. Select "Let me select individual events"
8. Select "Pull requests"
9. Click on "Add webhook"

## Env Variables

```txt
TODOIST_TOKEN=
TODOIST_PROJECT=
GITHUB_TARGET_REVIEWER=
```

## Packages and Apps

- `@sync-tasks/web`
- `@sync-tasks/api`
- `@sync-tasks/trpc`
