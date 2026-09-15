import {format} from 'date-fns';

export function date() {
    return format(new Date(), 'dd.MM.yyyy')
}