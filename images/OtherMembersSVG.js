import * as React from "react"
import Svg, {Path} from "react-native-svg"

function SvgComponent(props) {
	return (
		<Svg viewBox="10 10 80 80" {...props}>
			<Path d="M85.4 63.1c0 2.6-1.1 4.8-2.8 6.6 0 0 0 .1-.1.1-.3 8.6-7.3 15.5-16 15.5-4.8 0-9.1-2.1-12-5.4-7.9.7-16.8-.7-20.8-4.7-.4-.4-.7-.8-1.1-1.2-5.2-.3-10.1-1.7-12.7-4.3-1.8-1.8-2.8-4-2.8-6.6 0-5.4 1.8-11.4 4.8-16 1.5-2.3 3.2-4.1 5.1-5.5.3-.3.4-.7.5-1.1.1-.6-.1-1.3-.5-1.8-1.8-2-3-4.7-3-7.7 0-6.3 5.1-11.4 11.4-11.4 2.9 0 5.5 1.1 7.5 2.9 2.2-1.8 4.9-2.8 7.9-2.8 3.2 0 6.1 1.2 8.3 3.1 2-2 4.8-3.2 7.9-3.2 6.3 0 11.4 5.1 11.4 11.4 0 2.9-1.1 5.6-3 7.7-.4.6-.5 1.2-.5 1.8.1.4.2.8.5 1.1 1.9 1.4 3.6 3.2 5.1 5.5 3.1 4.6 4.9 10.6 4.9 16zm-3.7 1.1c.1-.3.1-.7.1-1.1 0-12.8-8.6-20.7-14.7-20.7-1.9 0-4.1.8-6.2 2.2 1.8 1.4 3.4 3.3 4.9 5.5.7 1 1.3 2 1.8 3.2 6.6.4 12.1 4.9 14.1 10.9zm-8.3-28.7c.9-1.3 1.4-2.8 1.4-4.5 0-4.3-3.5-7.8-7.8-7.8-2.2 0-4.1.9-5.5 2.3 1.2 2 1.9 4.3 1.9 6.7 0 1.8-.4 3.4-1 5 1.3 1 2.9 1.5 4.6 1.5 2.2 0 4.2-.9 5.6-2.4.3-.2.6-.5.8-.8zm-2.6 37.3c1.6-1.6 3.6-3.9 2.2-6.2-1.3-2.2-4.7-2.2-6.1-.2-1.4-2-4.8-2-6.1.2-1.4 2.4.6 4.6 2.2 6.2.9.9 3.3 3 3.9 3.4.5-.5 3-2.6 3.9-3.4zm-8.7-18.9c.4-.1.9-.2 1.3-.3-1.6-2.6-3.5-4.7-5.6-6.1-1-.8-2.1-1.4-3.2-1.8-1.3-.5-2.5-.8-3.7-.8-1 0-2.1.2-3.2.6-1.1.4-2.2.9-3.3 1.7-5.1 3.4-9.8 10.7-9.8 20.7 0 .9.2 1.7.5 2.4.3.8.8 1.4 1.4 2 .7.6 1.6 1.2 2.7 1.6 3.2 1.4 8.1 2 12.8 1.9-.9-2-1.4-4.2-1.4-6.5-.1-7.3 4.8-13.5 11.5-15.4zM59.3 32c0-4.7-3.8-8.5-8.5-8.5s-8.5 3.8-8.5 8.5 3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5zm-21 .3c0-2.7.8-5.1 2.2-7.1-1.4-1.2-3.1-1.9-5.1-1.9-4.3 0-7.8 3.5-7.8 7.8 0 1.7.5 3.2 1.5 4.5.3.3.5.6.7.9 1.4 1.5 3.4 2.4 5.6 2.4 1.5 0 2.9-.4 4-1.2-.6-1.7-1.1-3.5-1.1-5.4zM36 50.1c1.5-2.4 3.3-4.3 5.3-5.8-1.9-1.3-4-2-5.8-2-6.1 0-14.7 7.9-14.7 20.7 0 1.6.5 2.9 1.7 4 1.6 1.5 4.8 2.5 8.4 2.9-.2-.7-.2-1.4-.2-2.2-.1-5.9 1.9-12.5 5.3-17.6z"/>
		</Svg>
	)
}

export default SvgComponent