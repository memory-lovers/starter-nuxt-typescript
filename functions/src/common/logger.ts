import * as Sentry from "@sentry/node";

class ExLogger {
  logFunction(data: object) {
    exlogger.info(`${process.env.FUNCTION_NAME}: ${JSON.stringify(data)}`);
  }

  log(message?: string, ...params: any) {
    console.info(message);
    this.addBreadcrumb(Sentry.Severity.Log, message);
  }

  trace(message?: string, ...params: any) {
    console.trace(message);
    this.addBreadcrumb(Sentry.Severity.Log, message);
  }

  debug(message?: string, ...params: any) {
    console.debug(message);
    this.addBreadcrumb(Sentry.Severity.Debug, message);
  }

  info(message?: string, ...params: any) {
    console.info(message);
    this.addBreadcrumb(Sentry.Severity.Info, message);
  }

  warn(message?: string, ...params: any) {
    console.warn(message);
    this.addBreadcrumb(Sentry.Severity.Warning, message);
  }

  error(message?: string, ...params: any) {
    console.error(message);
    if (!params || params.length > 0) {
      this.capture(Sentry.Severity.Error, message, params);
    } else {
      this.capture(Sentry.Severity.Error, message);
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
