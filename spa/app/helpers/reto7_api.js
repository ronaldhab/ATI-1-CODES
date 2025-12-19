const NAME = 'localhost',
  PORT = 8080,
  DOMAIN = `http://${NAME}:${PORT}/ATI`,
  STUDENTS = `${DOMAIN}/api/students`,
  PROFILE = `${DOMAIN}/api/search/`,
  CONFIG = `${DOMAIN}/api/config/`;

export default {
  NAME,
  PORT,
  DOMAIN,
  STUDENTS,
  PROFILE,
  CONFIG
};
