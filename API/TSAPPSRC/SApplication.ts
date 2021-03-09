import { ExpressServer } from './ExpressServer'
//import { CatEndpoints } from './cats/CatEndpoints'
//import { CatService } from './cats/CatService'
//import { CatRepository } from './cats/CatRepository'
//import { Environment } from './Environment'
import { rcReadConfigFile } from './ReadConfig.js'

/**
 * Wrapper around the Node process, ExpressServer abstraction and complex dependencies 
 * that require timing and execution completion funnies.
 * When not using Dependency Injection, can be used 
 * as place for wiring together services which are dependencies of ExpressServer.
 */
export class Application {
    public static async createApplication() {
       // const catService = new CatService(new CatRepository())
       // const requestServices = { catService }
      //  const expressServer = new ExpressServer(new CatEndpoints(), requestServices)

        await expressServer.setup(Environment.getPort())
        Application.handleExit(expressServer)

        return expressServer
    }

    /* handling */
    private static handleExit(express: ExpressServer) {
        process.on('uncaughtException', (err: Error) => {
            console.error('Uncaught exception', err)
            Application.shutdownProperly(1, express)
        })
        process.on('unhandledRejection', (reason: {} | null | undefined) => {
            console.error('Unhandled Rejection at promise', reason)
            Application.shutdownProperly(2, express)
        })
        process.on('SIGINT', () => {
            console.info('Caught SIGINT')
            Application.shutdownProperly(128 + 2, express)
        })
        process.on('SIGTERM', () => {
            console.info('Caught SIGTERM')
            Application.shutdownProperly(128 + 2, express)
        })
        process.on('exit', () => {
            console.info('Exiting')
        })
    }

    /* do good logging for profiling since we are now at wits end, or not */
    private static shutdownProperly(exitCode: number, express: ExpressServer) {
        Promise.resolve()
            .then(() => express.kill())
            .then(() => {
                console.info('Shutdown complete')
                process.exit(exitCode)
            })
            .catch(err => {
                console.error('Error during shutdown', err)
                process.exit(1)
            })
    }
}
