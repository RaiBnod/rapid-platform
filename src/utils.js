import { HOST, PORT, SCHEMA } from './constant';

export function generateUrl(schema, host, port, path = '') {
  return `${schema}://${host}${port ? `:${port}` : ''}${path ? `${path}` : ''}`;
}

export function getUrl(path = '') {
  return generateUrl(SCHEMA, HOST, PORT, path);
}

export function isHtmlFile(filename) {
  return (filename && filename.substr(-3) !== '.md') || false;
}

export function getFileExtension(isHtml) {
  return isHtml ? '.html' : '.md';
}

export function renameFileName(filename, isHtml) {
  const extension = getFileExtension(isHtml);
  const separatedNames = filename.split('.');
  separatedNames.splice(-1);
  separatedNames.push(extension);
  return separatedNames.join('.');
}

export function createFileName(filename, isHtml) {
  const extension = getFileExtension(isHtml);
  return filename + extension;
}
