const envSettings = window as any;
export class Config {
  static REACT_APP_Backend_URL = envSettings.REACT_APP_Backend_URL;
}