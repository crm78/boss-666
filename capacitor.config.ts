import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.boss.recruit',
  appName: 'BOSS直聘',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
