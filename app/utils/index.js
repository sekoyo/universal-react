/**
 * Gets the first occuring prop(s) from the deepest route.
 * @param  {Array} componentProps Array of props to get.
 * @return {Object} Object with first occuring prop value for each given prop name.
 */
export function getPropsFromRoute({ routes }, componentProps) {
	let props = {};
	const lastRoute = routes[routes.length - 1];

	routes.reduceRight((prevRoute, currRoute) => {
	   
		componentProps.forEach(componentProp => {
			if (!props[componentProp] && currRoute.component[componentProp]) {
				props[componentProp] = currRoute.component[componentProp];
			}
		});
		
	}, lastRoute);

	return props;
}

/**
 * Gets all occurences of a prop in a route from each component.
 * @param  {String} componentProp Prop name.
 * @return {Array} Array of prop values.
 */
export function getPropFromRoute({ routes }, componentProp) {
	return routes.reduceRight((propArray, currRoute) => {
		const prop = currRoute.component[componentProp];
		return prop ? propArray.concat(prop) : propArray;
	}, []);
}

export const isClient = (typeof document !== 'undefined');