import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s', // 100 iterations per second, i.e. 100 RPS
      duration: '120s',
      preAllocatedVUs: 100, // how large the initial pool of VUs would be
      maxVUs: 100, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export function test(params) {
  const res = http.get('https://demo-ingress.pauloponciano.digital');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}

export default function () {
  test();
}
