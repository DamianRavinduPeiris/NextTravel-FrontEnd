const stripe = Stripe('pk_test_51O5tstEATYZ10rGuNa5iYJep83PANHfVD4tKhbUKyi3dE7MZX4a6yVGvXG1ATSG0DymwMSQJRA6Ty0gHN79AohmS00HEUtTtaV');

const appearance = { /* appearance */ };
const options = { /* options */ };
const elements = stripe.elements({ sk_test_51O5tstEATYZ10rGusPexqTf3q72bDCxCuez6p3MY4biluHPkTAQ8dw1ZwrnnyZ9liEHGBas68tUQHmwoH5lLNnAc00AvzebBuf, appearance });
const paymentElement = elements.create('payment', options);
paymentElement.mount('#payment-element');
