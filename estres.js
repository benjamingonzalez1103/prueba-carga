import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 20 },
    { duration: '2m', target: 50 },
    { duration: '2m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

const body = JSON.stringify({
  maxCaloriesPerSlice: 500,
  mustBeVegetarian: false,
  excludedIngredients: ['pepperoni'],
  excludedTools: ['knife'],
  maxNumberOfToppings: 6,
  minNumberOfToppings: 2,
});

const params = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'token abcdef0123456789',
  },
};

export default function () {
  const res = http.post('http://localhost:3333/api/pizza', body, params);
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}
