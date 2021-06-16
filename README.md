
# Github Surfer

Search for repositories within a specific **topic** such as **react** to see their stars and forks quantity



## Run Locally

Clone the project

```bash
  git clone https://github.com/olavoparno/github-surfer.git
```

Go to the project directory

```bash
  cd github-surfer
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

  
## Considerations

- I would not maintain its TOKEN commited in the repository. I would rather have it managed by a BFF so that the TOKEN could be handled through secure environment variables.
- I also had to go through GraphQL documentation as I am not proficient with it.
- Unfortunately I was not able to test as I spent far more than 2 hours on this.
- I did not see the need of a global state solution for this project but it come in handy when fetching and refetching.
