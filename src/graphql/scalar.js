import { GraphQLScalarType } from 'graphql';

import { bookingConfig } from '../constant';

import { CustomApolloError } from '../utils';

const vinScalar = new GraphQLScalarType({
  name: 'Vin',
  description: 'Custom scalar type for VIN',
  serialize(value) {
    return value;
  },
  parseValue(value) {
    // throw error if VIN input doesn't validate
    if (value.length !== bookingConfig.vinLength) {
      throw new CustomApolloError('InvalidVIN');
    }
    return value;
  },
});

export default vinScalar;
