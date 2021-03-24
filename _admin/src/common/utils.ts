import dayjs from "dayjs";
import fs from "fs";

export function convetTsJson(serviceAccount: any) {
  return {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.auth_uri,
    tokenUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
  };
}

export function writeLogFile(basename: string, body: any, pp: boolean = false) {
  const timestamp = dayjs().format("YYYYMMDD_HHmmss");
  const filePath = `_output/${basename}_${timestamp}.json`;
  fs.writeFileSync(
    filePath,
    !!pp ? JSON.stringify(body, null, 2) : JSON.stringify(body)
  );
  console.log(`** WRITE: ${filePath}`);
}

export function readLogFile(filepath: string) {
  return JSON.parse(fs.readFileSync(filepath, { encoding: "utf-8" }));
}

export function zeroPadding(num: number, length: number = 3) {
  return ("0000000000" + num).slice(-length);
}

export const sleep = (waitSeconds: number) => {
  return new Promise<void>(resolve => {
    setTimeout(() => resolve(), waitSeconds * 1000);
  });
};
