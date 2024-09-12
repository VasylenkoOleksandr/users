import basicAuth from 'basic-auth';
import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const user = basicAuth(req);

    if (!user || !checkCredentials(user.name, user.pass)) {
        res.setHeader('WWW-Authenticate', 'Basic realm="example"');
        res.sendStatus(401);
        return;
    }

    next();
}

function checkCredentials(username: string, password: string): boolean {
    return username === 'admin' && password === 'password';
}
