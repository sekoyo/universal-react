// From http://underscorejs.org/
export default function result(object, property, fallback) {
	var value = object == null ? void 0 : object[property];
	if (value === void 0) {
		value = fallback;
	}
	return typeof value === 'function' ? value.call(object) : value;
}