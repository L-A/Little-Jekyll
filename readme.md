# Little Jekyll

## **Development paused** (11/11/2016)

Since Jekyll has recently moved to [gem-based themes](http://jekyllrb.com/news/2016/07/26/jekyll-3-2-0-released/), my method for including an install-less Jekyll conflicts with the direction they are taking.

It also (in my opinion) adds more obstacles to the learning steps that a beginner might take in learning to build for the web, which goes against the general mission I gave myself with Little Jekyll.

<3

---

### To use gem-based themes with Little-Jekyll

Any gem-based theme can be converted to the "old" way of including theme files in your repo: [Converting gem-based themes to regular themes](https://jekyllrb.com/docs/themes/#converting-gem-based-themes-to-regular-themes)

---

A desktop app to manage Jekyll websites, overview and control your Jekyll processes.

## Setup

- `git clone`
- `npm install`

## Development

In two terminal sessions:

- `npm run hot-server` for live-reloading
- `npm run start-hot` for Electron to start in hot mode. The front-end components will auto-reload.

## Packaging
- `npm run package` does a test packaging of the Darwin (OS X) distributable.
- `npm run package-all` does Windows, Linux (x86, x64), and Darwin.

## License and acknowledgements

License: [MIT](../blob/master/LICENSE)
