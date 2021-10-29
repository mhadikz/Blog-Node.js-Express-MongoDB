import { v4 as uuidv4 } from 'uuid';

export function generateUserId(): string{
    return uuidv4();
}