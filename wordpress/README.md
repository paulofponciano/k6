# k6

We use these scripts to benchmark Object Cache Pro and Relay with various hosting partners.

## Setup

Make sure [k6 is installed](https://k6.io/docs/getting-started/installation/).

All tests can be run locally using `k6 run` or in the cloud using `k6 cloud`. 

When Object Cache Pro is installed, custom metrics for [WordPress, Redis and Relay](lib/metrics.js) are automatically collected. 

## Tests

### `wp.js`

Fetches all WordPress sitemaps and requests random URLs.

```
k6 run wp.js --env SITE_URL=https://example.com
k6 run wp.js --vus=100 --duration=10m --env SITE_URL=https://example.com
```

## Environment variables

### Site URL

You can pass in the `SITE_URL` to point the traffic at at specific URL.

```
k6 run wp.js --env SITE_URL=https://example.com
```

### Project ID

You can set the k6 Cloud "Project ID" using the `PROJECT_ID` environment variable.

```
k6 cloud wp.js --env PROJECT_ID=123456 --env SITE_URL=https://example.com
```

### Bypass page caches

To attempt bypassing page caches without logging in, pass in `BYPASS_CACHE`:

```
k6 run wp.js --env BYPASS_CACHE=1
```

## Seeding users

Load tests that run with logged in users, use this seed command to create 100 users:

```
for USR_NO in {1..100}; do wp user create "test${USR_NO}" "test${USR_NO}@example.com" --role=subscriber --user_pass=3405691582; done;
```
