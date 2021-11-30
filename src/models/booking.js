export default class BookingModel {
  constructor() {
    this.db = [];
  }

  create(bookingDetails) {
    this.db.push(bookingDetails);
    return bookingDetails;
  }

  getBookingByDateTime(dateTime) {
    return this.db.filter((item) => {
      const dt = new Date(item.dateTime);
      return dt.getTime() === dateTime.getTime();
    });
  }

  getBookingByDate(date) {
    const datePart = date.toISOString().split('T')[0];
    return this.db.filter((item) => {
      const dt = new Date(item.dateTime);
      const itemDatePart = dt.toISOString().split('T')[0];
      return datePart === itemDatePart;
    });
  }

  getBookingByVin(vin) {
    return this.db.filter(({ vehicle }) => vehicle.vin === vin);
  }
}
