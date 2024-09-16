import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

@Injectable()
export class RouteMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const targetUrl = this.routeToService(req);
      const response = await axios({
        method: req.method,
        url: targetUrl,
        data: req.body,
        headers: req.headers,
      });
      res.status(response.status).send(response.data);
    } catch (error) {
      res.status(500).send('Error while routing the request');
    }
  }

  routeToService(req: Request): string {
    if (req.originalUrl.startsWith('/auth')) {
      return `http://localhost:3001${req.originalUrl}`;
    }
    if (req.originalUrl.startsWith('/reviews') || req.originalUrl.startsWith('/prof')) {
      return `http://localhost:3005${req.originalUrl}`;
    }
    if (req.originalUrl.startsWith('/ai')) {
      return `http://localhost:3003${req.originalUrl}`;
    }
    return '';
  }
}
