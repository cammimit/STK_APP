//config class
//create one for each necessary data source connection
//most operation require two connecitons - one to read
//one to write - but it is perfectly permissable to 
//use the same connection
export class ConnectConfig {
    DataSourceMode: string
    DataSourceAuthType: string
    LocalDBPwd: string
    LocalDBHost: string
    LocalDBUser: string
    LocalDBPort: string
    LocalDBDB: string

    DevDBPwd: string
    DevDBHost: string
    DevDBUser: string
    DevDBPort: string
    DevDBDB: string

    ProdDBPwd: string
    ProdDBHost: string
    ProdDBUser: string
    ProdDBPort: string
    ProdDBDB: string

}