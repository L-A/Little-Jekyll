# Little Jekyll

A desktop app to manage Jekyll websites, overview and control your Jekyll processes.

Current status: Pretty functional if Jekyll is installed.

## Todos
- [X] Basic application framework
- [X] Jekyll server thread manager & UI
- [X] Allow creation of a new Jekyll site straight from Little Jekyll 🎉
- [X] Switch over to the updated IPC scheme
- [ ] Persist sites list & state → (missing check for `jekyll` threads that were shut down outside the app)
- [ ] Interactive installer for systems where Jekyll isn't available or found
- [ ] Jekyll version picker / detection (at least for the latest stable, and the current Github supported version)

## Setup

- `git clone`
- `npm install`

## Development

In two tabs:

`npm run hot-server` for live-reloading
`npm run start-hot` for Electron to start & listen

<kbd>Ctrl+H</kbd> toggles the Redux panel

## Packaging
- For now, `npm run package` does a test packaging of the Darwin (OS X) distributable.
- Unused Node modules have to be manually removed to help with the large size of the package.

## Known issues
At least on OS X El Cap, the distributable's Node threads are unable to access the proper `$PATH`, while the dev environment runs fine.

This means that on the same machine the app started with `npm start` works fine, while the OS X distributable hangs when trying to start a Jekyll process.

## License
Based on [C. T. Lin](https://github.com/chentsulin)'s Electron React Boilerplate:
