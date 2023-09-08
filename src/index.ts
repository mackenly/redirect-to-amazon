interface Env {
  REDIRECTS: any;
  AMAZON_REDIRECTS: any;
  DEFAULT_REDIRECT: string;
}

export default {
  async fetch(request: Request, env: Env) {
    const redirects = env.REDIRECTS;
    let newUrl: string = env.DEFAULT_REDIRECT;
    const pathName: string = new URL(request.url).pathname;

    // If path is in redirects, redirect to new url rather than an Amazon link
    Object.keys(redirects).forEach((key) => {
      if (pathName === key) {
        newUrl = redirects[key];
        return Response.redirect(newUrl, 307);
      }
    });

    // Map for country codes to Amazon TLDs
    const localTlds = new Map([
      ["AE", "ae"], ["AU", "com.au"], ["BR", "com.br"],
      ["CA", "ca"], ["DE", "de"], ["EG", "eg"],
      ["ES", "es"], ["FR", "fr"], ["GB", "co.uk"],
      ["IN", "in"], ["IT", "it"], ["JP", "co.jp"],
      ["MX", "com.mx"], ["NL", "nl"], ["NZ", "au"],
      ["PL", "pl"], ["SA", "sa"], ["SE", "se"],
      ["SG", "sg"], ["US", "com"]
    ]);

    const geo: string = String(request.cf?.country)?.toUpperCase() || "US";
    const amazon_redirects = env.AMAZON_REDIRECTS;
    const localTld: string = localTlds.get(geo) || "com";

    // If path is in amazon_redirects, redirect to new url with local TLD
    Object.keys(amazon_redirects).forEach((key) => {
      if (pathName === key) {
        newUrl = "https://www.amazon." + localTld + amazon_redirects[key];
      }
    });

    // Redirect to new url or the default redirect from initialization
    return Response.redirect(newUrl, 307);
  },
};