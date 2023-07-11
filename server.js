const express = require ('express')
const mongoose = require ('mongoose')
const cors = require ('cors')
const bodyParser = require ('body-parser')
const path = require('path')
const { error } = require('console')

//CONEXION A LA DB
mongoose
// .connect('mongodb://127.0.0.1:27017/empleadosds02sv22') //puerto de mongo al instalarlo de manera local
.connect('mongodb+srv://rubinjrti20:1234@ds02.go97gld.mongodb.net/DS02?retryWrites=true&w=majority')
    .then((x) =>{
        console.log(`Conectado exitosamente a la base de datos: "${x.connections[0].name}"`);
    })
    .catch((err) =>{
        console.log('ERROR AL CONECTARSE A MONGO',err.reason);
    });

    //CONFIGURACCION DEL SERVIDOR WEB
    const empleadoRuta = require ('./Routes/empleado.route');
    const { create } = require('domain')
    const app = express();

    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: false,
        })
    )

    app.use(cors());
    app.use(express.static(path.join(__dirname,'dist/empleados-mean')));
    app.use('/',express.static(path.join(__dirname,'dist/empleados-mean')));
    app.use('/api',empleadoRuta);

    //HABILITAR EL PUERTO
    const port = process.env.PORT || 4000;
    const server = app.listen(port, () =>{
        console.log('CONECTADO AL PUERTO '+port);
    });


    //MANEJADO DE ERROR 404
    app.use((req,res,next) => {
        next(createError(404));
    });

    //MANEJADOR DE  ERRORES GENERALES
    app.use(function(err,req,res,next){
        console.log(err.message);
        if(!err.statusCode) err.statusCode = 500;
        res.status(err.statusCode).send(err.message);
    })