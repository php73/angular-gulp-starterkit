import { Environment } from './environment';

export class ProductionEnvironment extends Environment {
  production = true;
  api = 'my.com';
}
