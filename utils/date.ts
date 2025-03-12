import dayjs from "dayjs";

class DateUtils {
    formatISOString(str: string): string {
        const date = dayjs(str);
        return date.format("DD/MM/YY hh:mm a").toString()
    }
}

export default new DateUtils()