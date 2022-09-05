import EmailSenderService, {
  IMailOptions
} from "../../../src/services/emailSender.service";

describe("Testing emailSender.service.ts", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Will .sendMailingList() continue working if some of emails aren't sent", async () => {
    let counter = 0;
    const emails = [
      "Hello",
      "ERROR",
      "I",
      "am",
      "ERROR",
      "nice",
      "to",
      "meet",
      "you"
    ];
    const opts = { html: "<p>Hello There</p>", subject: "Subject" };
    jest
      .spyOn(EmailSenderService, "sendMail")
      .mockImplementation(async (opts: IMailOptions) => {
        if (opts.to === "ERROR") throw new Error("Email was not send!");
        else counter++;
      });

    await EmailSenderService.sendMailingList(opts, emails);

    expect(counter).toBe(emails.length - 2);
  });
});
