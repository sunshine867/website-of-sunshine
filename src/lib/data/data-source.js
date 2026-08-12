// apps/web/src/lib/data/data-source.js

const DATA_MODE = {
  PRODUCTION: 'production',
  DEMO: 'demo',
};

class DataSource {
  constructor() {
    this.mode = process.env.NEXT_PUBLIC_DATA_MODE || DATA_MODE.DEMO;
  }

  getMode() {
    return this.mode;
  }

  setMode(mode) {
    this.mode = mode;
    if (typeof window !== 'undefined') {
      localStorage.setItem('dataMode', mode);
    }
  }

  toggleMode() {
    this.mode = this.mode === DATA_MODE.PRODUCTION ? DATA_MODE.DEMO : DATA_MODE.PRODUCTION;
    this.setMode(this.mode);
    window.location.reload();
  }

  isDemo() {
    return this.mode === DATA_MODE.DEMO;
  }

  isProduction() {
    return this.mode === DATA_MODE.PRODUCTION;
  }
}

export const dataSource = new DataSource();
export { DATA_MODE };