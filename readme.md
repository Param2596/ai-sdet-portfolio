# Getting started with playwright

1. First, create an empty directory where you'lll be saving tests

2. After creating directory, run `npm init playwright@latest` to install playwright (run `git init` if you haven't yet)

3. Choose: TypeScript, tests in tests, GitHub Actions Yes, install browsers Yes as setup (This is the setup I've done acc to my requirements, you can choose any language you're comfortable with)

4. This will setup basic playwright directories on your folder and after its complete, you'll be able to run tests in playwright

5. To run the basic pre-installed tests, run the following command:

```bash
npx playwright test
```

Note: this command will run the tests available in tests folder, which are denoted by ts files with ".spec.ts" extension. so for ex if you write a new test in tests folder, name it as "abc.spec.ts" and it'll run with this command

6. to see the report of tests run, execute this command:

```bash
npx playwright show-report
```

7. In this commit, I've done a basic test on saucedemo website ([https://www.saucedemo.com/](https://www.saucedemo.com/)), tested basic user/password login with valid cridentials and checking if the correct validation appears at bad login.

8. As i didnt hv much knowledge on how to select elements and do actions, I basically just ran `npx playwright codegen https://www.saucedemo.com/`, this way the actions i performed were converted into code, which i then used to write my tests.

9. And ts is all, thanks for looking into my repo :)
