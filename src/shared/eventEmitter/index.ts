import { EventEmitter } from 'eventemitter3';

type Events = {
  'router:goToPage': (pageId: string) => void;
};

export const appEventEmitter = new EventEmitter<Events>();
