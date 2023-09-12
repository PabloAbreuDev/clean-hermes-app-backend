import NodeCache from "node-cache";

class CacheService {
  private static instance: CacheService | null = null;
  private cache: NodeCache;

  private constructor() {
    this.cache = new NodeCache();
  }

  static getInstance(): CacheService {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }
    return CacheService.instance;
  }

  getCache(): NodeCache {
    return this.cache;
  }
}

export default CacheService;
