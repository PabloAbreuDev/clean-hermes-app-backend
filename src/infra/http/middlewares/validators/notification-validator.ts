import { body, ValidationChain } from 'express-validator';

export const sendNotificationValidation: ValidationChain[] = [
  body('notification.name', 'name is required').exists(),
  body('notification.description', 'description is required').exists(),
  body('userId', 'userId is required').exists(),
  body('receiverType', 'receiverType is required').exists().custom((value, { req }) => {
    if (value === 'EMAIL') {
      // Se o receiverType for "EMAIL", valide receiverEmailOptions
      body('receiverEmailOptions.address', 'receiverEmailOptions.address is required').exists().run(req);
      body('receiverEmailOptions.subject', 'receiverEmailOptions.subject is required').exists().run(req);
      body('receiverEmailOptions.text', 'receiverEmailOptions.text is required').exists().run(req);
    } else if (value === 'TELEGRAM') {
      // Se o receiverType for "TELEGRAM", valide receiverTelegramOptions
      body('receiverTelegramOptions.text', 'receiverTelegramOptions.text is required').exists().run(req);
    } else {
      throw new Error('Invalid receiverType');
    }

    return true;
  }),
];






