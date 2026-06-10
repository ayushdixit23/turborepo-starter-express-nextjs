import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import yaml from 'yaml';

import { logger } from '../utils/logger.js';
import { NODE_ENV } from './env.js';

const resolveOpenApiPath = (): string => {
  const moduleDir = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(moduleDir, '../docs/openapi.yaml'),
    path.resolve(process.cwd(), 'src/docs/openapi.yaml'),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error('OpenAPI spec not found');
};

const setupSwagger = (app: express.Application): void => {
  if (NODE_ENV === 'production') {
    return;
  }

  try {
    const openApiPath = resolveOpenApiPath();
    const fileContents = fs.readFileSync(openApiPath, 'utf8');
    const openApiDocument = yaml.parse(fileContents) as Record<string, unknown>;

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
  } catch (error) {
    logger.error({ err: error }, 'Failed to load OpenAPI spec');
  }
};

export default setupSwagger;
