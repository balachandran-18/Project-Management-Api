const crypto = require("crypto");

const Moment = require("moment");
const MomentRange = require("moment-range");
const moment = MomentRange.extendMoment(Moment);
const config = require("./config");

/**
 * Two Digits
 *
 * @param d
 * @returns {*}
 */
function twoDigits(d) {
	if (d >= 0 && d < 10) {
		return `0${d.toString()}`;
	}

	if (d > -10 && d < 0) {
		return `-0${(-1 * d).toString()}`;
	}

	return d.toString();
}

const utils = module.exports = {
	/**
	 * Default Date Format
	 */
	dateFormat: "DD-MM-YYYY",

	/**
	 * MySQL Date Format
	 */
	mySQLDateFormat: "YYYY-MM-DD",

	/**
	 * MySQL Date Time Format
	 */
	mySQLDateTimeFormat: "YYYY-MM-DD HH:mm:ss",

	/**
	 * Is Undefined
	 *
	 * @param key
	 * @returns {boolean}
	 */
	isUndefined: (key) => {
		if (typeof key === "undefined") {
			return true;
		}
		return false;
	},

	/**
	 * Get Value
	 *
	 * @param key
	 * @param defaultValue
	 * @returns {*}
	 */
	getValue: (key, defaultValue) => {
		if (utils.isUndefined(key) || key) {
			return key;
		}

		return defaultValue;
	},

	/**
	 * Remove Undefined Keys
	 *
	 * @param key
	 * @param defaultValue
	 * @returns {*}
	 */
	removeUndefinedKeys: (object) => {
		const returnObject = {};

		Object.keys(object).forEach((key) => {
			if (!utils.isUndefined(object[key])) {
				returnObject[key] = object[key];
			}
		});

		return returnObject;
	},

	/**
	 * Is Empty
	 *
	 * @param value
	 */
	isEmpty: (value) => {
		if (!utils.isUndefined(value) && value !== null && value !== "") {
			return false;
		}
		return true;
	},

	/**
	 * Is Integer
	 *
	 * @param value
	 */
	isInteger: (value) => {
		if (!utils.isUndefined(value) && !isNaN(value)) {
			return true;
		}
		return false;
	},

	/**
	 * Is Length
	 *
	 * @param value
	 * @param length
	 * @returns {boolean}
	 */
	isLength: (value, length) => {
		if (!utils.isUndefined(value) && value.length < length) {
			return false;
		}
		return true;
	},

	/**
	 * Random String
	 *
	 * @param length
	 * @returns {string}
	 */
	randomString: (length) => {
		if (!length) {
			length = 16;
		}
		const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		let text = "";
		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}

		return text;
	},

	/**
	 * SHA256 Encryption
	 *
	 * @param password
	 * @param saltKey
	 * @returns {string}
	 */
	sha256Password: (password, saltKey) => {
		if (!password) {
			return;
		}

		if (!saltKey) {
			saltKey = utils.randomString(32);
		}
		return `${crypto.createHash("sha256").update(saltKey + password).digest("hex")}:${saltKey}`;
	},

	/**
	 * md5 Encryption
	 *
	 * @param password
	 * @returns {string}
	 */
	md5Password: (password) => {
		if (!password) {
			return;
		}

		return `${crypto.createHash("md5").update(password).digest("hex")}`;
	},

	/**
	 * Get Page
	 *
	 * @param req
	 * @returns {number}
	 */
	getPage: (req) => {
		const limit = utils.getLimit(req);
		const page = req.query.page;

		if (!page) {
			return 0;
		}

		return (page - 1) * limit;
	},

	/**
	 * Get Last Page
	 *
	 * @param count
	 * @param pageSize
	 * @returns {Number}
	 */
	getLastPage: (count, pageSize) => {
		let lastPage = parseInt(count / pageSize, 10);
		lastPage += count % pageSize === 0 ? 0 : 1;

		return lastPage;
	},

	/***
	 * Get Page Details
	 *
	 * @param count
	 * @param currentPage
	 * @param pageSize
	 * @param currentPageLength
	 * @returns {{count: *, currentPage: *, lastPage: Number, pageStart: number, pageEnd: *}}
	 */
	getPageDetails: (count, currentPage, pageSize, currentPageLength) => {
		if (typeof count === "object") {
			count = count.length;
		}
		const pageStart = count > 0 ? pageSize * (currentPage - 1) + 1 : 0;
		const pageEnd = count > 0 ? pageStart - 1 + currentPageLength : 0;

		let lastPage = parseInt(count / pageSize, 10);
		lastPage += count % pageSize === 0 ? 0 : 1;

		lastPage = lastPage > 0 ? lastPage : 1;

		return { count, currentPage, lastPage, pageStart, pageEnd };
	},

	/**
	 * Get Page Limit
	 *
	 * @param req
	 * @returns {*}
	 */
	getLimit: (req) => {
		const limit = req.query.pageSize;

		if (!limit) {
			return 10;
		}

		return parseInt(limit, 10);
	},

	/**
	 * MySQL Format Date
	 */
	mySQLFormatDate: () => {
		const currentDate = new Date();

		const year = currentDate.getUTCFullYear();
		const month = twoDigits(1 + currentDate.getUTCMonth());
		const date = twoDigits(currentDate.getUTCDate());
		const hours = twoDigits(currentDate.getUTCHours());
		const minutes = twoDigits(currentDate.getUTCMinutes());
		const seconds = twoDigits(currentDate.getUTCSeconds());

		return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
	},

	/**
	 * Null Replacer
	 */
	nullReplacer: (object) => {
		const data = JSON.stringify(object).replace(/null/g, "\"\"");

		return JSON.parse(data);
	},

	/**
	 * Map Data
	 *
	 * @param data
	 * @param mappings
	 * @returns {{}}
	 */
	mapData: (data, mappings) => {
		const returnObject = {};

		if (!data) {
			return returnObject;
		}

		for (const key in mappings) {
			if (!utils.isUndefined(data[key])) {
				returnObject[mappings[key]] = data[key];
			}
		}

		return returnObject;
	},

	/**
	 * Sort Object
	 *
	 * @param object
	 * @param key
	 * @returns {*}
	 */
	sortObject: (object, key) => {
		if (object.length === 0) {
			return object;
		}

		return object.sort((a, b) => {
			const nameA = a[key].toLowerCase();
			const nameB = b[key].toLowerCase();

			if (nameA < nameB) {
				return -1;
			}

			if (nameA > nameB) {
				return 1;
			}

			return 0;
		});
	},

	/**
	 * Get Date
	 *
	 * @param format
	 */
	getDate: (format = utils.dateFormat) => moment().format(format),

	/**
	 * Format Date
	 *
	 * @param date
	 * @param format
	 */
	formatDate: (date, format = utils.dateFormat) => {
		if (!date) {
			return null;
		}

		return moment(date).format(format);
	},

	/**
	 * Subtract Days
	 *
	 * @param days
	 * @param date
	 * @param format
	 * @returns {*}
	 */
	subtractDays: (days, date = "", format = utils.mySQLDateFormat) => {
		if (!days) {
			return null;
		}

		date = date ? moment(date) : moment();

		return date.subtract(days, "days").format(format);
	},

	/**
	 * Custom Date
	 *
	 * @param date
	 * @param format
	 */
	customDate: (date, fromFormat, format = utils.dateFormat) => {
		if (!date) {
			return null;
		}

		return moment(date, fromFormat).format(format);
	},

	/**
	 * Get SQl Current Date Time
	 *
	 * @param date
	 * @param format
	 */
	getSQlCurrentDateTime: () => moment.utc().format(),

	/**
	 * Get SQl Formatted Date
	 *
	 * @param date
	 * @param format
	 */
	getSQlFormattedDate: (date = "", format = utils.mySQLDateFormat) => {
		if (date) {
			return moment(date).format(format);
		}

		return moment().format(format);
	},

	/**
	 * Get Start Date and End Date
	 *
	 * @param date
	 * @param includeSaturday
	 * @param format
	 * @returns {{startDate: *, endDate: *}}
	 */
	getStartAndEndDateOfWeek: (date, includeSaturday = false, format = utils.mySQLDateFormat) => {
		date = moment(date).startOf("isoweek");

		return {
			startDate: date.format(format),
			endDate: date.add(includeSaturday ? 5 : 4, "days").format(format)
		};
	},

	/**
	 * Get Yesterday Date
	 *
	 * @param format
	 */
	getYesterdayDate: (format = utils.dateFormat) => moment().subtract(1, "day").format(format),

	/**
	 * Get Future Date
	 *
	 * @param format
	 */
	getFutureDate: (format = utils.dateFormat) => moment().add(1, "day").format(format),

	/**
	 * Get Ago
	 *
	 * @param date
	 * @param format
	 */
	ago: (date) => moment(date).fromNow(),

	/**
	 * Hours Diff
	 *
	 * @param date
	 */
	hoursDiff: (date) => Math.abs(new Date() - new Date(date)) / 36e5,

	/**
	 * Raw URL Decode
	 *
	 * @param str
	 * @returns {*}
	 */
	rawURLDecode: (str) => {
		if (!str) {
			return null;
		}

		try {
			return decodeURIComponent(str.replace(/%(?![\da-f]{2})/gi, () => "%25"));
		} catch (e) {
			return null;
		}
	},

	rawURLEncode: (str) => {
		if (!str) {
			return null;
		}

		try {
			return encodeURIComponent(str)
				.replace(/!/g, "%21")
				.replace(/'/g, "%27")
				.replace(/\(/g, "%28")
				.replace(/\)/g, "%29")
				.replace(/\*/g, "%2A");
		} catch (e) {
			return null;
		}
	},

	/**
	 * Get Date Filter
	 *
	 * @param date
	 * @param dateStart
	 * @param dateTo
	 * @param dateOnly
	 * @returns {*}
	 */
	getDateFilter: (date, dateStart, dateTo, dateOnly = false) => {
		if (!date && !dateStart && !dateTo) {
			return;
		}

		if (date) {
			dateStart = date;
			dateTo = date;
		}

		if (dateStart && !dateOnly) {
			dateStart = `${dateStart}T00:00:00.000Z`;
		}

		if (dateTo && !dateOnly) {
			dateTo = `${dateTo}T23:59:59.000Z`;
		}

		if (dateStart && dateTo) {
			return { $gte: dateStart, $lte: dateTo };
		}

		if (dateStart) {
			return { $gte: dateStart };
		}

		if (dateTo) {
			return { $lte: dateTo };
		}
	},

	/**
	 * Get Group Filter
	 *
	 * @param groupIds
	 * @returns {*}
	 */
	getGroupFilter: (groupIds) => {
		if (!groupIds) {
			return "";
		}

		if (typeof groupIds === "number") {
			groupIds = [groupIds];
		}

		if (typeof groupIds === "string") {
			groupIds = groupIds.split(",");
		}

		const groupSql = [];
		groupIds.forEach((groupId) => {
			groupSql.push(`FIND_IN_SET(${groupId}, group_id)`);
		});

		if (groupSql.length === 0) {
			return "";
		}

		return groupSql.join(" OR ");
	},

	/**
	 * Get Day
	 *
	 * @param date
	 */
	getDay: (date) => {
		if (!date) {
			return null;
		}

		return moment(date).format("dddd");
	},

	/**
	 * Get Between Days
	 *
	 * @param startDate
	 * @param endDate
	 * @returns {Array}
	 */
	getBetweenDays: (startDate, endDate) => {
		const range = moment.range(moment(startDate), moment(endDate));

		return Array.from(range.by("day", { exclusive: true }));
	},

	/**
	 * Get Time Diff
	 *
	 * @param startDate
	 * @param endDate
	 */
	getTimeDiff: (startDate, endDate) => moment(startDate).diff(moment(endDate)) / 1000,

	/**
	 * Get Time Stamp
	 */
	getTimeStamp: () => moment().format("X"),

	/**
	 * Convert to hours only
	 *
	 * @param seconds
	 * @returns {*}
	 */
	convertToHoursOnly: (seconds) => {
		if (!seconds) {
			return "";
		}

		const hours = seconds / 60 / 60;

		return `${Math.round(hours) !== hours ? hours.toFixed(2) : hours}`;
	},

	/**
	 * Convert to hours
	 *
	 * @param seconds
	 * @param showDate
	 * @returns {*}
	 */
	convertToHours: (seconds, showDate = false) => {
		if (!seconds) {
			return "";
		}

		const hours = seconds / 60 / 60;
		const days = hours / 10;

		let text = `${Math.round(hours) !== hours ? hours.toFixed(2) : hours} hr${hours > 1 ? "s" : ""}`;
		if (showDate && days > 0) {
			text += ` (${Math.round(days) !== days ? days.toFixed(2) : days} day${days > 1 ? "s" : ""})`;
		}

		return text;
	},

	/**
	 * Convert Hours to days
	 *
	 * @param hours
	 * @param showDay
	 * @returns {*}
	 */
	convertHoursToDays: (hours, showDay = true) => {
		if (!hours) {
			return "";
		}

		hours = parseFloat(hours);
		const days = hours / 10;

		let text = `${Math.round(hours) !== hours ? hours.toFixed(2) : hours} hr${hours > 1 ? "s" : ""}`;
		if (showDay && days > 0) {
			text += ` (${Math.round(days) !== days ? days.toFixed(2) : days} day${days > 1 ? "s" : ""})`;
		}

		return text;
	},

	/**
	 * Get IP Address
	 *
	 * @param req
	 */
	getIPAddress: (req) => req.connection.remoteAddress.replace(/^.*:/, ""),

	/**
	 * Get User Profile Url
	 *
	 * @param slug
	 * @returns {*}
	 */
	getUserMediaUrl: (slug) => {
		if (!slug) {
			return null;
		}
		const parts = slug.split("/");
		const image = parts[parts.length - 1];

		return `${config.baseUrl}/user/image/${image}`;
	},

	/**
	 * Get file path
	 *
	 * @param slug
	 * @returns {*}
	 */
	getFileUrl: (slug) => {
		if (!slug) {
			return null;
		}
		const parts = slug.split("/");
		const file = parts[parts.length - 1];

		return `${config.baseUrl}/candidateProfile/v1/getFile/${file}`;
	},

	/**
	 * Get Last Date of Month
	 *
	 * @param date
	 * @param format
	 */
	getLastDayOfMonth: (date, format = utils.dateFormat) => moment(date).endOf("month").format(format),

	/**
	 * Get Extension By Type
	 *
	 * @param fileType
	 * @returns {*}
	 */
	getExtensionByType: (fileType) => {
		switch (fileType) {
			case "image/png":
				return "png";
			case "image/jpeg":
			case "image/jpg":
				return "jpg";
			case "image/gif":
				return "gif";
			case "image/bmp":
				return "bmp";
			default:
				return "";
		}
	},

	/**
	 * Uppercase First Letter
	 *
	 * @param string
	 */
	ucFirst: (string) => string.charAt(0).toUpperCase() + string.slice(1),

	/**
	 * Remove Key in Object
	 *
	 * @param array
	 * @param key
	 * @returns {*}
	 */
	removeKeyInObjectArray: (array, key) => {
		array.forEach((detail, index) => {
			array[index][key] = undefined;
		});

		return array;
	},

	/**
	 * Replace All
	 *
	 * @param string
	 * @param search
	 * @param replacement
	 */
	replaceAll: (string, search, replacement) => string.split(search).join(replacement),

	/**
	 * Get Jira Host Url
	 *
	 * @param jiraHost
	 * @param ticketId
	 * @returns {*}
	 */
	getJiraHostUrl: (jiraHost, jiraSlug, ticketId = "") => {
		if (!jiraHost) {
			return null;
		}

		return `https://${jiraHost}/${jiraSlug}/${ticketId}`;
	},

	/**
	 * Get Month Name
	 *
	 * @param month
	 * @param format
	 */
	getMonthName: (month, format = "MMM") => moment().month(month - 1).format(format),


	/**
	 * Get Candidate Age
	 *
	 * @param from
	 * @param to
	 * @returns {*}
	 */
	getAge: (from, to) => {
		if (!from) {
			return null;
		}
		return moment(to).diff(moment(from), "years");
	},

	/**
	 * Get Documents file path
	 *
	 * @param slug
	 * @returns {*}
	 */
	getDocumentUrl: (slug) => {
		if (!slug) {
			return null;
		}
		const parts = slug.split("/");
		const file = parts[parts.length - 1];

		return `${config.baseUrl}/documents/v1/getFile/${file}`;
	},

	/**
	 * Is Date
	 *
	 * @param value
	 * @returns {*}
	 */
	isDateTime: (value) => {
		const dateRegex = /^(\d{4})-(\d{2})-(\d{2})/;
		const dateTimeRegex = /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})$/;

		if (!dateRegex.test(value) && !dateTimeRegex.test(value)) {
			return true;
		}

		return;
	},

	/**
	 * Is Price
	 *
	 * @param price
	 * @returns {boolean}
	 */
	isPrice: (price) => {
		const priceRegEx = /^[1-9]\d{0,7}(?:\.\d{1,4})?|\.\d{1,4}$/; // must be a positive number not starting with a zero and can have decimal point values
		if (!priceRegEx.test(price)) {
			return false;
		}

		return true;
	}
};
