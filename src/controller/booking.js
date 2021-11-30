import { v4 as uuid } from 'uuid';

import { bookingConfig } from '../constant';
import { CustomApolloError, isValidDate, formatDateTime } from '../utils';

import BookingModel from '../models/booking';

export default class Booking {
  constructor() {
    this.bookingModel = new BookingModel();

    const {
      startHour,
      endHour,
      duration,
      maxBookingCapacity,
    } = bookingConfig;

    this.maxBookingCapacity = maxBookingCapacity;

    this.bookingSlots = Booking.createBookingSlots(startHour, endHour, duration);
  }

  static createBookingSlots(startHour, endHour, duration) {
    const totalBookingSlotPerDay = Math.floor((endHour - startHour) / duration);

    return Array.from({
      length: totalBookingSlotPerDay,
    }, (e, i) => {
      if (i === 0) {
        return startHour;
      }
      // eslint-disable-next-line no-param-reassign
      startHour += duration;
      return startHour;
    });
  }

  checkBookingAvailability(dateTime) {
    const result = this.bookingModel.getBookingByDateTime(dateTime);
    if (result.length >= this.maxBookingCapacity) return false;
    return true;
  }

  create(input) {
    const nInput = { ...input };
    const { booking: { date, time }, vehicle, customer } = nInput;
    delete nInput.booking;

    if (!this.bookingSlots.includes(time)) {
      throw new CustomApolloError('WrongTimeSlot', `Select from these time slots ${this.bookingSlots.join(',')}.`);
    }

    const dateTime = formatDateTime(date, time);

    if (!isValidDate(dateTime)) {
      throw new CustomApolloError('InvalidDate', 'Date format should be `YYYY-MM-DD`');
    }

    const bookingDetails = {
      id: uuid(),
      dateTime,
      vehicle,
      customer,
      testId: 'testing',
    };

    if (!this.checkBookingAvailability(dateTime)) {
      throw new CustomApolloError('FullyBooked');
    }

    const result = this.bookingModel.create(bookingDetails);
    return result;
  }

  updateCapacity(capacity) {
    this.maxBookingCapacity = capacity;
    return this.maxBookingCapacity;
  }

  searchByDate(date) {
    const formattedDate = new Date(date);
    if (!isValidDate(formattedDate)) {
      throw new CustomApolloError('InvalidDate', 'Date format should be `YYYY-MM-DD`');
    }
    return this.bookingModel.getBookingByDate(formattedDate);
  }

  searchByVin(vin) {
    return this.bookingModel.getBookingByVin(vin);
  }
}
