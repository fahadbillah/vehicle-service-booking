import Booking from '../controller/booking';
import vinScalar from './scalar';

const booking = new Booking();

const resolvers = {
  Vin: vinScalar,
  Booking: {
    dateTime: ({ dateTime }) => dateTime.toISOString(),
  },
  Query: {
    getBookingByDate: (root, { date }) => booking.searchByDate(date),
    getBookingByVin: (root, { vin }) => booking.searchByVin(vin),
  },
  Mutation: {
    updateCapacity: async (root, { capacity }) => booking.updateCapacity(capacity),
    createBooking: async (root, { input }) => booking.create(input),
  },
};

export default resolvers;
