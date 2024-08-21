export class CertificadoDigital {
  alias: string;
  owner: string;
  issuer: string;
  createdAt: string;
  expiresAt: string;
  type: string;
  thumbprint: string;
  icpBrasil: ICPBrasil;
}

export class ICPBrasil {
  cpf: string;
  cnpj: string;
  birthDate: string;
  nis: string;
  rg: string;
  issuingAgencyRg: string;
  ufIssuingAgencyRg: string;
  email: string;
}
