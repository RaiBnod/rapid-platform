import { HOST, PORT, SCHEMA } from './constant';

export function generateUrl(schema, host, port, path = '') {
  return `${schema}://${host}${port ? `:${port}` : ''}${path ? `${path}` : ''}`;
}

export function getUrl(path = '') {
  return generateUrl(SCHEMA, HOST, PORT, path);
}
