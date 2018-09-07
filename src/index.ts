import * as Express from 'express';

import { initApi } from './api'

const app = Express();

initApi(app)

app.listen(
    3001,
    () => {
        console.log('Example app listening on port 3001!');
    });

export default app;
