import { NextFunction,Request, Response } from 'express';

import { logger } from '../utils/logger.js';

interface SuspiciousActivity {
  type: string;
  severity: 'low' | 'medium' | 'high';
  message: string;
}

const checkSuspiciousActivity = (req: Request): SuspiciousActivity[] => {
  const activities: SuspiciousActivity[] = [];
  const userAgent = req.get('user-agent') || '';

  if (userAgent.includes('sqlmap') || userAgent.includes('nikto') || userAgent.includes('nmap')) {
    activities.push({
      type: 'SCANNER_DETECTED',
      severity: 'high',
      message: `Suspicious scanner user-agent: ${userAgent}`,
    });
  }

  if (req.body && typeof req.body === 'object') {
    const bodyStr = JSON.stringify(req.body).toLowerCase();
    if (
      bodyStr.includes('drop table') ||
      bodyStr.includes('drop table') ||
      bodyStr.includes('union select')
    ) {
      activities.push({
        type: 'SQL_INJECTION_ATTEMPT',
        severity: 'high',
        message: 'Potential SQL injection detected',
      });
    }
  }

  const contentLength = parseInt(req.get('content-length') || '0', 10);
  if (contentLength > 5 * 1024 * 1024) {
    activities.push({
      type: 'LARGE_PAYLOAD',
      severity: 'medium',
      message: `Unusually large payload: ${String(contentLength)} bytes`,
    });
  }

  const missingHeaders = !req.get('user-agent') && !req.get('accept');
  if (missingHeaders) {
    activities.push({
      type: 'MISSING_HEADERS',
      severity: 'low',
      message: 'Request missing common headers',
    });
  }

  return activities;
};

export const securityMonitor = (req: Request, _res: Response, next: NextFunction): void => {
  const suspiciousActivities = checkSuspiciousActivity(req);

  for (const activity of suspiciousActivities) {
    const logLevel = activity.severity === 'high' ? 'warn' : 'info';
    logger[logLevel](
      {
        type: activity.type,
        severity: activity.severity,
        message: activity.message,
        ip: req.ip,
        method: req.method,
        url: req.originalUrl,
        traceId: req.traceId,
      },
      'Suspicious activity detected',
    );
  }

  next();
};
