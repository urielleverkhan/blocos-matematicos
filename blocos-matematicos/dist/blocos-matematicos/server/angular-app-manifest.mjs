
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 13515, hash: 'b9458d6078277b36ba25f62e81be196cd961a6258439f764bb33233d6ca235d8', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 13169, hash: '6d805b03f9d8601f1c3fedce09314cdc3efb704c6bcf93efa0c4f8c6eec2a257', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 34272, hash: 'f92a52c09401052c24cc7ef279ac7104ffb944a9bb49f1cdaa35cdd06ffaa893', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-W4A2CTNB.css': {size: 783, hash: 'n9hFwVQx8x0', text: () => import('./assets-chunks/styles-W4A2CTNB_css.mjs').then(m => m.default)}
  },
};
