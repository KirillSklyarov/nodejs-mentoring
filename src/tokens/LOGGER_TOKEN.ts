import { Token } from 'typedi';
import { Logger } from 'winston';

export const LOGGER_TOKEN = new Token<Logger>();
