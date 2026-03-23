import dayjs from 'dayjs';
import Handlebars from 'handlebars';

export function registerHandlebars() {
  Handlebars.registerHelper('date', function (date, format) {
    return dayjs(date).format(format);
  });
}
