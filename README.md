# Everscale (ex. Free TON) Contests Results Interface
## How To Run
If you don't want (or can not) to install the software mentioned below, you can access the pre-build interface by this link: https://freeton-stats.org/

### Pre-requirements  
To run the application locally, you need `node.js` and `yarn` or `npm` installed on your device.  
Clone the repository using git and navigate into it. Then, depending on which package manager you had installed, execute `yarn` or `npm install` and `yarn client:modules`.

### Run pre-build app
Depending on which package manager you had installed, execute `yarn server` or `npm run server`. This command will run a local server with your own DeBot Browser. 

### Build from source
Depending on which package manager you had installed, execute `yarn build` or `npm run build` and `yarn client:build` or `npm run client:build`. This command will create a new build (it will appear in the 'build' folder) that you can deploy to any hosting you wish. Also, you can deploy it locally using `yarn server` or `npm run server`.

### Run with docker
1. docker build -t contest .
2. yarn docker:run or npm run docker:run
### Run with docker-compose
1. docker-compose up

