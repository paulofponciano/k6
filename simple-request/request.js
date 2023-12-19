import { check } from 'k6';
import http from 'k6/http';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s', // 100 iterations per second, i.e. 100 RPS
      duration: '30s',
      preAllocatedVUs: 50, // how large the initial pool of VUs would be
      maxVUs: 50, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export function test(params) {
  const res = http.get('http://pegasus-staging-nlb-ingress-5d608c806912d9f0.elb.us-east-2.amazonaws.com');
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
}

export default function () {
  test();
}