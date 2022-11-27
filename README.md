# Webpack - built by Dmytro Rylov \<yawuxi>

## Documentation navigation
1. [Lets begin](#Lets-begin)
2. [Installed packages](#Installed-packages)
3. [Project structure](#Project-structure)
4. [Distributable structure](#Distributable-structure)

## Lets-begin
For work with this build in new project, clone that repository `git clone <link to repository>`<br>
After, being in the project root, launch `npm i` - that command will install all dependencies which stored in package.json.<br>
Thereafter you can start build by type in terminal `npm start`. Done!<br>

## Installed-packages
###### Webpack
* webpack - webpack :D
* webpack-cli - work with webpack from CLI
* webpack-dev-server - development server

###### Loaders
* babel-loader - loader for JavaScript
* sass-loader - loader for SCSS/SASS
* style-loader - loader for JS styles
* ts-loader - loader for TypeScript

###### Plugins
* eslint-webpack-plugin - eslint plugin for webpack
* html-minimizer-webpack-plugin - plugin for minimizing html
* html-webpack-plugin - plugin for integrating script into html file
* clean-webpack-plugin - removing dist directory every changing
* copy-webpack-plugin - copying files "from" "to"
* css-minimizer-webpack-plugin - plugin for minimizing css

###### Babel and polyfills
* @babel/cli - work with babel from CLI
* @babel/core - transpiling JSX/TSX to JavaScript
* @babel/preset-env - allows use the latest JavaScript without polyfills, etc
* @babel/preset-react - allows use to work with React
* @babel/preset-typescript - allows use to work with Typescript
* core-js - polyfills

###### Typescript
* @types/react - types for React
* @types/react-dom - types for ReactDOM

###### Eslint
* @typescript-eslint/eslint-plugin - plugin for analyze TypeScript
* @typescript-eslint/parser - eslint parses for TypeScript

###### Other
* react - React UI library
* react-dom - rendering page in browser
* @reduxjs/toolkit - state manager 
* react-redux - connecting redux with react
* eslint - linter
* sass - needs to working preprocessor
* terser-webpack-plugin - minimizing JavaScript
* typescript - needs to working TypeScript

__Installed packages - 32__

## Project-structure
```
project-name/
├── src/                           # Source folder
│   ├── app/                       # Redux folder
│   │
│   ├── assets/                    # Images, etc
│   │
│   ├── components/                # Common components, frequently used, example: Button
│   │
│   ├── data/                      # Dummy js files, const file, etc
│   │
│   ├── features/                  # Feature folder, example: authentication
│   │
│   ├── hooks/                     # Custom react hooks folder, example: http.hook.ts
│   │   
│   ├── layouts/                   # Layout components folder, example: Header, Footer
│   │
│   ├── pages/                     # Pages folder, example: MainPage, UserPage
│   │
│   ├── scss/                      # Styles folder, example: reset.scss, variables.scss, etc
│   │
│   ├── utils/                     # Utils folder, for small functions or something same
│   │
│   ├── App.scss                   # App styles
│   ├── App.tsx                    # App component
│   ├── index.html                 # main html file
│   ├── index.scss                 # main styles, here use imports from scss folder
│   └── index.tsx                  # index component, rendering App component
│
├── .babelrc                       # babel configuration
├── .eslintignore                  # eslint ignore configuration
├── .eslintrc                      # eslint configuration
├── .gitignore                     # git ignore configuration
├── package.json                   # dependencies config
├── package-lock.json              # dependencies versions, etc
├── README.md                      # That file
├── tsconfig.json                  # TypeScript configuration
└── webpack.config.js              # Webpack configuration

```

## Distributable-structure
```
├── dist/                         # Distributable folder
│   ├── assets                    # Assets folder
│   ├── index.html                # Final markup
└── └── bundle.<hash>.js          # Final JavaScript code
```

## Documentation navigation
1. [Lets begin](#Lets-begin)
2. [Installed packages](#Installed-packages)
3. [Project structure](#Project-structure)
4. [Distributable structure](#Distributable-structure)
