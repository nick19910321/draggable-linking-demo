/**
 * Created by sn on 2019/3/20.
 */
import http from '@/api/common/http'
import config from '@/config'

const httpApi = {
  getSiteInfo: () => {
    const url = config.url.baseApi + config.api.site
    return http.get(url)
  }

}
export default httpApi
