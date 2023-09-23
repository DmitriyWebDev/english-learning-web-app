import { v4 as getUuid } from 'uuid';

export const getUniqueId = (idGenerator: () => string = getUuid): string => idGenerator();
