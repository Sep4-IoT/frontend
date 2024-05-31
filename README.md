This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) using npx create-react-app.

# React

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm test --coverage`

To generate the coverage report

# Docker
cd to the frontend folder

## Available Scripts

### `docker run -p 8080:3000 -d greenhouse`
to run the app in a new container
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `docker start`
to run the app in a already made container
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

### `docker images`

to see all images

### `docker stop ccfac1f88d1b` or `docker stop greenhouse`
to stop the docker container from running use

### `docker kill <container_id_or_name>`
to force stop the container from running

### `docker rm <container_id_or_name>`
to remove the container

## Build by 

### `docker build -t greenhouse .`

# Deployment to Github Pages

make sure you are on gh-pages branch

## Available Scripts

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy` 

This command uses the gh-pages npm package to publish your build directory to the gh-pages branch of your repository. 
Make sure to bring changes to Main before running this command because it changes the structure. 

### `npm cache clean --force` 

In some cases, clearing the npm cache can resolve issues related to package installations.

### `rm -rf node_modules package-lock.json` then `npm install`

If you have serious issues, try deleting the node_modules directory and the package-lock.json file, then reinstalling the dependencies: