# Pulling data from Google sheets

Short snippet which loads data from public Google Sheets using Google Sheets
API.

## Requirements

Enter your API KEY and google sheet id at the top of the `index.js`.

The sheet will has to have a `named range`. You can create a `named range` by
going to `Data` -> `Named ranges...`.

## Compatibility

Works both for Node and browser. However, uses async/await, so if you 
needed to support IE11, you should use a transpiler (babel).
