import { SApplication } from './SApplication'

/**
 * A lot of my code is base don the bolier plate project of 
 * Jonas Verhoelen
 * jverhoelen/node-express-typescript-boilerplate
 * 
 * Base for Execution so it can keep have profiling and performance monitoring added
 */

SApplication.createApplication().then(() => {
    console.info('The application is flying! Shoot it down with Ctrl + C')
})