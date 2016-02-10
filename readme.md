# Little Jekyll

A desktop app to manage Jekyll websites, overview and control your Jekyll processes.

Current status: Works 🎉 – in need of testing

## Setup

- `git clone`
- `npm install`

## Development

In two terminal sessions:

`npm run hot-server` for live-reloading
`npm run start-hot` for Electron to start in hot mode. The front-end components will auto-reload.

## Packaging
- For now, `npm run package` does a test packaging of the Darwin (OS X) distributable.
- Unused modules should be handpicked and removed from the package to help with its large size.

## License and acknowledgements

Jekyll: MIT
Electron: MIT
This app: MIT
