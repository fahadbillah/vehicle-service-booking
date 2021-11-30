export const errors = {
  WrongTimeSlot: {
    httpCode: 400,
    message: 'Wrong time slot!',
  },
  InvalidDate: {
    httpCode: 400,
    message: 'Invalid date!',
  },
  FullyBooked: {
    httpCode: 400,
    message: 'This slot is fully booked. Please choose another time.',
  },
  InvalidVIN: {
    httpCode: 400,
    message: 'The VIN provided is invalid! VIN need to be 17 character long.',
  },
};

export const bookingConfig = {
  startHour: 9,
  endHour: 17, // 24 hour format
  duration: 2,
  maxBookingCapacity: 2,
  vinLength: 17,
};
