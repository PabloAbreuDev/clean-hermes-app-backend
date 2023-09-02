export interface EmailOptions {
  readonly to: string;
  readonly subject: string;
  readonly text: string;
  readonly html: string;
  readonly attachments: Object[];
}

export interface IEmailService {
  send: (options: EmailOptions) => Promise<void>;
}
