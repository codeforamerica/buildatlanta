# Build Atlanta

See and comment on infrastructure projects in Atlanta.

## Developing Locally

Start by installing [node.js](https://github.com/codeforamerica/howto/blob/master/Node.js.md).

Then:

```console
npm install
npm start
```

## Updating the included data

Replace `app/data/projects.csv` with the latest version of the data, making sure the column fields have the same name.

Then:

```console
npm run geocode
```

This will produce a new `app/data/projects-geocoded.csv` file, which is used by the app as a data source.

## Deploying to Github Pages

Pull up your socks, then:

```console
npm run release
```
