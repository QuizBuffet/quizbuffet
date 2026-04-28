// URL param helpers — reads from hash instead of location.search now that the app is a SPA
import { getHashParams } from './hashRouter.js';

export function getRouteParams() {
  const params = getHashParams();
  return {
    cert:   params.get('cert')   || '',
    domain: params.get('domain') || '',
    id:     params.get('id') ? parseInt(params.get('id')) : null,
  };
}
