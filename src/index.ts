import * as Express from 'express';

const app = Express();

app.get(
    '/',
    (req: Express.Request, res: Express.Response) => {
        return res.send('Hello world.');
    });

app.listen(
    3001,
    () => {
        console.log('Example app listening on port 3001!');
    });

export default app;
