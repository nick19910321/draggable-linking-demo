import api from "@/api";

class SiteService {
  constructor() {}

  async getSiteInfo() {
    const result = await api.site.getSiteInfo().then(data => {
      return data;
    });
    return result;
  }
}

export default SiteService;
