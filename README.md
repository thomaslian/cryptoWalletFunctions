# Bitcoin Cash Functions
Firebase functions for creating a crypto wallet

## How to run
- Emulator - for testing purposes
```
firebase emulators:start
```

- Install dependencies from package.json
```
npm install
```

- Deploy functions only to firebase
```
firebase deploy --only functions
```

- Deploy only one function to firebase
```
firebase deploy --only functions:addMessage
```

## VSC Extensions
- toba.vsfire
- eg2.vscode-npm-script
- GitHub.copilot
- xabikos.JavaScriptSnippets