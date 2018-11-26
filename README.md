
```bash
git clone -b master https://github.com/jiniengineer/jvakharia20181126.git
cd jvakharia20181126
yarn
yarn install
yarn run build:dll
yarn start
```
## Basic scripts

Use `yarn run build:dll` for dll builds.

Use `yarn run build:dev` for dev builds.

Use `yarn start` for dev server. Default dev port is `3000`.

Use `yarn run start:hmr` to run dev server in HMR mode.

Use `yarn run build` for production build.

Use `yarn run server:prod` for production server and production watch. Default production port is `8088`.

Default ports and option to use proxy backend for dev server can be changed in `constants.js` file.

To create AOT version, run `yarn run build:aot`. This will compile and build script.
Then you can use `yarn run prodserver` to see to serve files.

### Store Logger

Store-logger outputs ngrx actions to the console.
To set your development mode store logging preference, go to the constant.js file and edit the `STORE_DEV_TOOLS` constant.
Available options are `logger | none`


### Testing

For unit tests, use `yarn run test` for continuous testing in watch mode and use
`yarn run test:once` for single test. To view code coverage after running test, open `coverage/html/index.html` in your browser.

For e2e tests, use `yarn run e2e`. To run unit test and e2e test at the same time, use `yarn run ci`.
