import { EventEmitter } from 'eventemitter3';
import { AppRoute } from '../router';

type Events = {
  'router:goToPage': (route: AppRoute) => void;
};

export const appEventEmitter = new EventEmitter<Events>();
