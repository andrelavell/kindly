export class ChromeStorageAdapter {
  async getItem(key: string): Promise<string | null> {
    const result = await chrome.storage.local.get(key);
    return result[key] || null;
  }

  async setItem(key: string, value: string): Promise<void> {
    await chrome.storage.local.set({ [key]: value });
  }

  async removeItem(key: string): Promise<void> {
    await chrome.storage.local.remove(key);
  }
}
