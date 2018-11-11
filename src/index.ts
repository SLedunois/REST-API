import express, { Application } from "express";
import v1 from "./api/v1";

const port = process.env.port || 3000;

const App: Application = express();
App.use(express.json());

App.use("/v1", v1);

App.listen(port);
