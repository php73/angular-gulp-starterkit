import { Environment } from './environment';

export class DevelopmentEnvironment extends Environment {
  production =  false;
  api = 'dev.my.com';
}
