import * as Sentry from "@sentry/browser";
const isDev = process.env.baseUrl != "https://tsundoku.site";
const isProd = !isDev;

class ExLogger {
  log(message?: string, ...params: any) {
    if (!params || params.length > 0) {
      if (isDev) console.info(message, params);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Log, message);
    } else {
      if (isDev) console.info(message);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Log, message);
    }
  }

  trace(message?: string, ...params: any) {
    if (!params || params.length > 0) {
      if (isDev) console.trace(message, params);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Log, message);
    } else {
      if (isDev) console.trace(message);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Log, message);
    }
  }

  debug(message?: string, ...params: any) {
    if (!params || params.length > 0) {
      if (isDev) console.debug(message, params);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Debug, message);
    } else {
      if (isDev) console.debug(message);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Debug, message);
    }
  }

  info(message?: string, ...params: any) {
    if (!params || params.length > 0) {
      if (isDev) console.info(message, params);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Info, message);
    } else {
      if (isDev) console.info(message);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Info, message);
    }
  }

  warn(message?: string, ...params: any) {
    if (!params || params.length > 0) {
      console.warn(message, params);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Warning, message);
    } else {
      console.warn(message);
      if (isProd) this.addBreadcrumb(Sentry.Severity.Warning, message);
    }
  }

  error(message?: string, ...params: any) {
    if (!params || params.length > 0) {
      console.error(message, params);
      if (isProd) this.capture(Sentry.Severity.Error, message, params);
    } else {
      console.error(message);
      if (isProd) this.capture(Sentry.Severity.Error, message);
    }
  }

  private capture(type: Sentry.Severity, message?: string, ...params: any) {
    const error = params[0];
    if (error instanceof Error) {
      this.addBreadcrumb(type, message);
      Sentry.captureException(error);
    } else {
      this.addBreadcrumb(type, message);
      const msg = !!message ? message : `${type.toUpperCase()} Occurred`;
      Sentry.captureMessage(msg);
    }
  }

  private addBreadcrumb(type: Sentry.Severity, message?: string) {
    Sentry.addBreadcrumb({
      category: `log.${type}`,
      message: !!message ? message : `${type.toUpperCase()} Occurred`,
      level: type
    });
  }
}

const exlogger = new ExLogger();
export default exlogger;
