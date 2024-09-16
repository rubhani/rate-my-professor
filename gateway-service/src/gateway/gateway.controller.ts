//this does not work
//the default middleware approach would hang req after forwarding(services did not get the req).


// import { Controller, Post, Req, Res } from '@nestjs/common';
// import { createProxyMiddleware } from 'http-proxy-middleware';
// import { Request, Response } from 'express';

// @Controller()
// export class GatewayController {

//   @Post('auth/*')
//   handleAuth(@Req() req: Request, @Res() res: Response) {
//     console.log('Proxying to Auth Service:', req.originalUrl);

//     const proxy = createProxyMiddleware({
//       target: 'http://localhost:3001', // Auth service
//       changeOrigin: true,
//       // pathRewrite: { '^/auth': '' },  // Remove '/auth' prefix before forwarding if necessary
//     });
//     req.url = req.originalUrl;
//     proxy(req, res);
//   }

//   @Post('reviews/*')
//   handleReviews(@Req() req: Request, @Res() res: Response) {
//     const proxy = createProxyMiddleware({
//       target: 'http://localhost:3002', // Review service
//       changeOrigin: true,
//       pathRewrite: { '^/reviews': '' }, // Adjust path if necessary
//        //@ts-ignore
//       onProxyReq: (proxyReq, req, res) => {
//         proxyReq.path = req.originalUrl; // Use original URL
//       },
//       onError: (err, req, res) => {
//         console.error('Proxy error:', err.message);
//         res.writeHead(500, {
//           'Content-Type': 'text/plain',
//         });
//         res.end('Proxy error');
//       }
//     });

//     proxy(req, res);
//   }

//   @Post('ai/*')
//   handleAI(@Req() req: Request, @Res() res: Response) {
//     const proxy = createProxyMiddleware({
//       target: 'http://localhost:3003', // AI service
//       changeOrigin: true,
//       pathRewrite: { '^/ai': '' }, // Adjust path if necessary
//        //@ts-ignore
//       onProxyReq: (proxyReq, req, res) => {
//         proxyReq.path = req.originalUrl;  // Use original URL
//       },
//       onError: (err, req, res) => {
//         console.error('Proxy error:', err.message);
//         res.writeHead(500, {
//           'Content-Type': 'text/plain',
//         });
//         res.end('Proxy error');
//       }
//     });

//     proxy(req, res);
//   }
// }
