interface IMailingListOptions {
  html?: string;
  subject: string;
}

interface IMailOptions extends IMailingListOptions {
  to: string;
}

interface IEmailSenderService {
  sendMail(opts: IMailOptions): Promise<void>;
  sendMailingList(
    opts: IMailingListOptions,
    mailingList: Array<string>
  ): Promise<void>;
}

interface IEmailSenderServiceFactory {
  createEmailSenderService(): IEmailSenderService;
}

export {
  IEmailSenderService,
  IEmailSenderServiceFactory,
  IMailOptions,
  IMailingListOptions
};
